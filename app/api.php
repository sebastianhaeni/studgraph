<?php
require_once '../vendor/autoload.php';

$grapheneUrl = getenv('GRAPHENEDB_URL');
//$grapheneUrl = 'http://neo4j:1234@localhost:7474';

use GraphAware\Neo4j\Client\ClientBuilder;

$client = ClientBuilder::create()
->addConnection('default', $grapheneUrl)
->build();

if(!array_key_exists('statement', $_REQUEST)){
    die('specify a statement');
}

$statement = $_REQUEST['statement'];
$params = array_key_exists('params', $_REQUEST) ? json_decode($_REQUEST['params'], true) : [];

$result = $client->run($statement, $params);
$nodes = [];
foreach ($result->records() as $node) {
    $relation = [];
    foreach ($node->values() as $key => $value) {
        $relation[$node->keys()[$key]] = [
            'labels' => $value->labels(),
            'properties' => $value->values()
        ];
    }
    $nodes[] = $relation;
}

echo json_encode($nodes, JSON_PRETTY_PRINT);
