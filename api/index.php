<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

require_once("controllers/Database.php");
require_once("controllers/Auth.php");
require_once("controllers/Shows.php");
require_once("database/schema.php");


$Database = new Database;
$db = $Database->connect();
$api = $Database->getURIdata();

$post = isJson(file_get_contents('php://input')); //postman
if (empty($post)) {
  $post = object($_POST);
}

$response = new stdClass;

switch ($api->route) {
  case 'run-table':
    $response = $Database->run_table($tableSchema);
    break;
  case 'meta-data':
    $response = $Database->getMetadata();
    break;
  case 'login':
    $auth = new Auth($Database);
    $response = $auth->login($post);
    break;
  case 'movies':
    $movie = new Shows($Database);
    $response = $movie->fetchMovies();
    break;
  case 'create-movie':
    $movie = new Shows($Database);
    $response = $movie->createMovie($post);
    break;
  case 'bookings':
    $movie = new Shows($Database);
    $response = $movie->fetchBookings();
    break;
  case 'create-booking':
    $movie = new Shows($Database);
    $response = $movie->createBooking($post);
    break;
  case 'shows':
    $movie = new Shows($Database);
    $response = $movie->listShows($_GET);
    break;
  default:
    $response->status = false;
    $response->message = "INVALID_HTTP_REQUEST";
    break;
}

echo json_encode($response);
$db->close();
