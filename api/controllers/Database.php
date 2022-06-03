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

  public function getTableFields($table)
  {
    $result = [];
    $db = $this->connect();

    if ($row = $db->query("DESCRIBE {$table}") or die($db->error)) {
      while ($r = $row->fetch_assoc()) {
        $name = strtoupper($r['Field']);
        $result[] = trim(strtolower($name));
      }
    }
    return ($result);
  }

  public function select($table, $filter = "")
  {
    $filter = implode(" AND ", array_map(function ($x) {
      $y = explode("=", $x);
      return "{$y[0]}='{$y[1]}'";
    }, array_filter(explode(",", $filter), function ($x) {
      return !empty($x);
    })));

    $filter = empty($filter) ? "" : "WHERE {$filter}";

    $sql = "SELECT * FROM $table  $filter ORDER BY id DESC";
    $db = $this->connect();
    $query = $db->query($sql) or die($db->error . "($sql)");
    $content = [];
    while ($row = $query->fetch_assoc()) {
      $row = array_change_key_case(utf8ize($row));
      if ($this->server !== "localhost" && array_search($this->server, $this::$local_servers) !== false) {
        $row = array_map(function ($value) {
          return str_replace("localhost", $this->server, $value);
        }, $row);
      }
      $row = (object) $row;
      $content[] = $row;
    }
    return ($content);
  }

  public function query($sql)
  {
    $db = $this->connect();
    $query = $db->query($sql) or die($db->error . "($sql)");
    $content = [];
    while ($row = $query->fetch_assoc()) {
      $row = array_change_key_case(utf8ize($row));
      if ($this->server !== "localhost" && array_search($this->server, $this::$local_servers) !== false) {
        $row = array_map(function ($value) {
          return str_replace("localhost", $this->server, $value);
        }, $row);
      }
      $row = (object) $row;
      $content[] = $row;
    }
    return ($content);
  }

  public function insert($table, $data)
  {
    $db = $this->connect();
    $response = new stdClass;
    $build    = array();
    $fields   = $this->getTableFields($table);
    $response->status = 0;
    foreach ($data as $key => $value) {
      if (array_search(strtolower($key), $fields) !== false) {
        if (gettype($value) == "object" || gettype($value) == "array") {
          $value = json_encode($value);
        } else {
          $v = $db->real_escape_string($value);
          $v = trim($v);
          $value = $v;
        }
        $build[] = "$key='{$value}'";
      }
    }
    $build = implode(", ", $build);
    if (!empty($data->id)) {
      $sql = "UPDATE $table SET $build WHERE id='{$data->id}'";
    } else $sql = "INSERT INTO $table SET $build";

    $query = $db->query($sql);
    if ($query) {
      $response->status = true;
      if (!empty($data->id)) {
        $response->edited = true;
      }
      $response->data = object(array_merge(arrray($data), ["id" => empty($db->insert_id) ? $data->id : $db->insert_id, "date" => date("Y-m-d H:i:s")]));
    } else $response->message = $db->error;

    return $response;
  }

  public function filterQuery($filter)
  {
    $search = "";
    $clause = $filter;

    $filter = str_replace("&", ",", $filter);
    $filter = str_replace(" AND ", " and ", $filter);
    $filter = str_replace(" and ", ",", $filter);

    if (!empty($filter)) {
      $_flt = $filters = [];
      $arr = explode(',', $filter);
      // Supported symbols for filtering
      $explosives = ["<>", "!=", "<", ">", "="];
      $position = 0;
      foreach ($arr as $fltr) {
        $explode_key = "=";
        foreach ($explosives as $xk => $xv) {
          if (gettype(stripos($fltr, $xv)) !== 'boolean') {
            $explode_key = $xv;
            break;
          }
        }
        if (gettype(stripos($fltr, $explode_key)) !== 'boolean') { //if contains an explosive
          $_a = explode($explode_key, str_replace("'", "", $fltr));
          $_a = array_map("trim", $_a);
          $_a[0] = cleanUp(trim($_a[0]));
          if (strtolower($_a[1]) == "null") {
            $_flt[$_a[0]][] = "{$_a[0]} IS NULL";
          } else {
            $_flt[$_a[0]][] = "{$_a[0]}$explode_key'{$_a[1]}'";
          }
        } else if (gettype(stripos($fltr, ' in ')) !== 'boolean') {
          // see(get_in_clause($clause, $position));
          $filters[] = get_in_clause($clause, $position);
          $position++;
        }
      }
      foreach ($_flt as $values) {
        $filters[] = count($values) > 1 ? "(" . implode(" OR ", $values) . ")" : $values[0];
      }
      $filters = implode(" AND ", $filters);
      $filter = !empty($filters) && !empty($search) ? "{$filters} AND {$search}" : $filters . $search;
    }

    return ($filter);
  }
}
