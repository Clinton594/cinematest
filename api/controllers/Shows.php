<?php
require_once("Auth.php");

class Shows extends Auth
{
  private static $db;

  function __construct($db)
  {
    $this::$db = $db;
  }

  function authenticateUser()
  {
    // Implement User authentication here
    return true;
  }

  function fetchMovies()
  {
    $db = $this::$db;
    $response = object(["status" => false]);
    if ($this->authenticateUser()) {
      $response->status = true;
      $response->data =  $db->select("movie");
    } else $response->message = "UNAUTHORIZED_ACCESS";
    return $response;
  }

  function createMovie($movie_data)
  {
    $db = $this::$db;
    $response = object(["status" => false]);
    if ($this->authenticateUser()) {
      $data =  $db->select("movie", "title={$movie_data->title}");
      if (!count($data)) {
        $response =  $db->insert("movie", $movie_data);
      } else  $response->message = "DATA_EXISTS";
    } else $response->message = "UNAUTHORIZED_ACCESS";
    return $response;
  }
}
