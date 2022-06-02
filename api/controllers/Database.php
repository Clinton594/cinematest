<?php
require_once 'functions.php';
require_once 'Server.php';

class Database extends Server
{
  public $isConnected = false;
  private static $mydb;
  private static $db_name;
  private static $db_password;
  private static $db_user;


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

  public function run_table($schema)
  {
    $db = $this::$mydb;
    foreach ($schema as $key => $query) {
      $db->query($query) or die($db->error . "-- key($key)");
    }
    return (["status" => true, "message" => "Successfuly Created Tables"]);
  }
}
