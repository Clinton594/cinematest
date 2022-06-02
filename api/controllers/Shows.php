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


  function fetchBookings($filtered = "")
  {
    $db = $this::$db;
    $response = object(["status" => false]);
    if (!empty($filtered)) $filtered = "WHERE b.id={$filtered}";
    if ($this->authenticateUser()) {
      $sql = "SELECT m.title, b.id, b.location, b.theatre_name, b.show_date, b.show_time, b.movie_id, b.date
      FROM booking AS b
      INNER JOIN movie as m
      ON b.movie_id=m.id 
      {$filtered}
      ORDER BY b.id DESC
      ";
      $data = $db->query($sql);
      $data = array_map(function ($x) {
        $bdate = new DateTime($x->date);
        $sdate = new DateTime("{$x->show_date} {$x->show_time}");
        $x->date = $bdate->format("Y-m-d h:i:a");
        $x->formatted_show_time = $sdate->format("Y-m-d h:i a");
        return $x;
      }, $data);
      if (!empty($filtered)) $data = reset($data);
      $response = ["status" => true, "data" => $data];
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

  function createBooking($event)
  {
    $db = $this::$db;
    $response = object(["status" => false]);
    if ($this->authenticateUser()) {
      $data =  $db->select("booking", "location={$event->location}, theatre_name={$event->theatre_name}, show_time={$event->show_time},show_date={$event->show_date}");
      if (!count($data)) {
        $response =  $db->insert("booking", $event);
        if ($response->status) {
          $response = $this->fetchBookings($response->data->id);
        }
      } else  $response->message = "DATA_EXISTS";
    } else $response->message = "UNAUTHORIZED_ACCESS";
    return $response;
  }
}
