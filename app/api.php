<?php
require_once '../vendor/autoload.php';
header('Access-Control-Allow-Origin: *');

$grapheneUrl = getenv('GRAPHENEDB_URL');
$grapheneUrl = empty($grapheneUrl) ? 'http://neo4j:1234@localhost:7474' : $grapheneUrl;

use GraphAware\Neo4j\Client\ClientBuilder;

$client = ClientBuilder::create()
  ->addConnection('default', $grapheneUrl)
  ->build();

$entityBody = json_decode(file_get_contents('php://input'), true);

if (!array_key_exists('statement', $entityBody)) {
  die('specify a statement');
}

$statement = $entityBody['statement'];
$params = array_key_exists('params', $entityBody) ? $entityBody['params'] : [];

$result = $client->run($statement, $params);
$nodes = [];
$relations = [];
//print_r($result->records());
foreach ($result->records() as $node) {
  $nodeRecords = [];
  $relationRecords = [];
  foreach ($node->values() as $key => $value) {
    if ($value instanceof \GraphAware\Neo4j\Client\Formatter\Type\Node) {
      $nodeRecords[$node->keys()[$key]] = [
        'id' => $value->identity(),
        'labels' => $value->labels(),
        'properties' => $value->values()
      ];
    } else if (is_array($value)) {
      foreach ($value as $relation) {
        if ($relation instanceof \GraphAware\Neo4j\Client\Formatter\Type\Relationship) {
          $relationRecords[] = [
            'type' => $relation->type(),
            'startNodeIdentity' => $relation->startNodeIdentity(),
            'endNodeIdentity' => $relation->endNodeIdentity(),
            'properties' => $relation->values()
          ];
        }
      }
    }
  }
  $nodes[] = $nodeRecords;
  $relations[] = $relationRecords;
}

echo json_encode(['nodes' => $nodes, 'relations' => $relations], JSON_PRETTY_PRINT);
