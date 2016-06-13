<?php
require_once '../vendor/autoload.php';

$grapheneUrl = getenv('GRAPHENEDB_URL');
$grapheneUrl = empty($grapheneUrl) ? 'http://neo4j:1234@localhost:7474' : $grapheneUrl;

use GraphAware\Neo4j\Client\ClientBuilder;

$client = ClientBuilder::create()
->addConnection('default', $grapheneUrl)
->build();

$entityBody = json_decode(file_get_contents('php://input'), true);

if(!array_key_exists('statement', $entityBody)){
    die('specify a statement');
}

$statement = $entityBody['statement'];
$params = array_key_exists('params', $entityBody) ? $entityBody['params'] : [];

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
