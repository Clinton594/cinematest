<?php
require_once 'functions.php';

class Database
{
  public $isConnected = false;
  public $server = "localhost";
  private static $mydb;
  private static $db_name;
  private static $db_password;
  private static $db_user;
  public $local_servers = ['localhost'];

  public function __construct()
  {
    global $_SERVER;
    $this::$db_name = get_env("database");
    $this::$db_user = get_env("dbuser");
    $this::$db_password = get_env("password");
    $this->server  =  $_SERVER['SERVER_NAME'];
  }

  //Connects to database if not connected
  public function connect()
  {
    if (!$this->isConnected) {
      try {
        $db_handle = new MySQLi("localhost", $this::$db_user, $this::$db_password, $this::$db_name);
        if (empty($db_handle->connect_error)) {
          $this->isConnected = true;
          $this::$mydb = $db_handle;
        }
      } catch (\Throwable $th) {
        die(json_encode(["status" => false, "message" => $th]));
      }
    }
    return ($this::$mydb);
  }
  public function getLocalServers()
  {
    return ($this->local_servers);
  }

  public function getServer()
  {
    return ($this->server);
  }
  public function isLocalhost()
  {
    return in_array($this->getServer(), $this->getLocalServers());
  }

  public function getURIdata($str = false)
  {
    global $_SERVER;
    $server = $this->getServer();
    if (gettype($str) === "string") $_SERVER['REQUEST_URI'] = $str;
    $request_uri = str_replace('https://', '', $_SERVER['REQUEST_URI']);
    $request_uri = explode('/', str_replace('http://', '', $request_uri));
    if ((array_search($this->getServer(), $this->getLocalServers()) !== false)) {
      $site_name = !empty($request_uri[1]) ? $request_uri[1] : 'admindb';
      $page_source = !empty($request_uri[2]) ? $request_uri[2] : '';
      $content_id = !empty($request_uri[3]) ? $request_uri[3] : null;
      $event = !empty($request_uri[4]) ? $request_uri[4] : null;
      $parent_page = !empty($request_uri[5]) ? $request_uri[5] : null;
      $other = !empty($request_uri[6]) ? $request_uri[6] : null;
      $this->domain = "http://{$server}/{$site_name}/";
    } else {
      $site = str_replace("www.", "", $server);
      $this->domain = "https://" . str_replace("https://", "", $server) . "/";
      $site_name = str_replace("https://", "", $server);
      $page_source = !empty($request_uri[1]) ? $request_uri[1] : '';
      $content_id = !empty($request_uri[2]) ? $request_uri[2] : null;
      $event = !empty($request_uri[3]) ? $request_uri[3] : null;
      $parent_page = !empty($request_uri[4]) ? $request_uri[4] : null;
      $other = !empty($request_uri[5]) ? $request_uri[5] : null;
    }

    return ((object)[
      "page_source" => explode("?", $page_source)[0],
      "content_id" => explode("?", $content_id)[0],
      "event" => $event,
      "other" => $other,
      "site" => $this->domain,
    ]);
  }
}
