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
      $sql = "SELECT m.title, b.id, b.location, b.price, b.theatre_name, b.show_date, b.show_time, b.movie_id, b.date
      FROM booking AS b
      INNER JOIN movie AS m
      ON b.movie_id=m.id 
      {$filtered}
      ORDER BY b.id DESC
      ";
      $data = $db->query($sql);
      $data = array_map(function ($x) {
        $bdate = new DateTime($x->date);
        $sdate = new DateTime("{$x->show_date} {$x->show_time}");
        $x->price = "$" . $x->price;
        $x->date = $bdate->format("Y-m-d h:i a");
        $x->formatted_show_time = $sdate->format("Y-m-d h:i a");
        return $x;
      }, $data);
      if (!empty($filtered)) $data = reset($data);
      $response = ["status" => true, "data" => $data];
    } else $response->message = "UNAUTHORIZED_ACCESS";
    return $response;
  }

  function listShows($_filters)
  {
    $filters = object(array_map("strtolower", $_filters));
    $db = $this::$db;
    $response = object(["status" => true]);

    $sort =  "ORDER BY m.id DESC";
    $filter = "";
    list("data" => $data) = $db->getMetadata();
    $locations = array_map(function ($x) {
      return strtolower($x->name);
    }, $data->locations);

    if (!empty($filters->sort)) $sort = "ORDER BY m.{$filters->sort} ASC";
    if (!empty($filters->filter)) {
      $filter = "WHERE " . $db->filterQuery(str_replace("~", "=", $filters->filter));
      // Extrac locations from filters
      $_loc = array_map(function ($x) {
        return $x[1];
      }, array_filter(array_map(function ($x) {
        return explode("~", $x);
      }, explode(",", $filters->filter)), function ($x) {
        return $x[0] === "location";
      }));
      if (count($_loc)) $locations = $_loc;
    }



    $bookin = $db->select("booking");

    $sql = "SELECT m.title, m.id, m.cast, m.genre, m.language
    FROM movie AS m
    INNER JOIN booking AS b
    ON m.id = b.movie_id
    {$filter}
    GROUP BY b.movie_id
    {$sort}
    ";
    $movies = $db->query($sql);

    $response->data = array_map(function ($movie) use ($bookin, $locations) {
      $movie->language = str_replace(",", ", ", $movie->language);

      $booked = array_map(function ($x) {
        $bdate = new DateTime("{$x->show_date} {$x->show_time}");
        $x->date = $bdate->format("Y-m-d h:ia");
        $x->price = "$" . $x->price;
        return $x;
      }, array_filter($bookin, function ($booked) use ($movie, $locations) {
        return $booked->movie_id === $movie->id && in_array(strtolower($booked->location), $locations);
      }));

      $movie->booked = array_group(array_values($booked), "location");
      $movie->num_location = count($movie->booked);
      return $movie;
    }, $movies);

    return $response;
  }

  function createMovie($movie_data)
  {
    $db = $this::$db;
    $response = object(["status" => false]);
    if ($this->authenticateUser()) {
      $data =  $db->select("movie", "title={$movie_data->title}");
      if (!count($data) || !empty($movie_data->id)) {
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
      if (!count($data) || !empty($event->id)) {
        $response =  $db->insert("booking", $event);
        if ($response->status) {

          $response = $this->fetchBookings($response->data->id);
          if (!empty($event->id)) {
            $response["edited"] = true;
          }
        }
      } else  $response->message = "DATA_EXISTS";
    } else $response->message = "UNAUTHORIZED_ACCESS";
    return $response;
  }
}
