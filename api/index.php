<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

require_once("controllers/Database.php");
require_once("database/schema.php");


$Database = new Database;
$db = $Database->connect();
$uri = $Database->getURIdata();

$post = object(array_merge($_POST, $_GET));
$response = new stdClass;

switch ($post->case) {
  case 'run-table':
    foreach ($tableSchema as $key => $query) {
      $db->query($query) or die($db->error . "-- key($key)");
    }
    $response->status = true;
    $response->message = "Successfuly Created Tables";
    break;
  default:
    # code...
    break;
}

echo json_encode($response);
$db->close();
