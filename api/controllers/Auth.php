<?php


class Auth
{
  private static $db;
  private $user;

  function __construct($db)
  {
    $this::$db = $db;
  }

  public function login($cred)
  {
    $response = object(["status" => false]);
    if (!empty($cred->email) && !empty($cred->password)) {
      $user = $this->getUser($cred->email);
      if (empty($user)) $response->message = "INVALID_CREDENTIAL";
      else if (password_verify($cred->password, $user->password) === true) {
        $this->user = $user->id;
        if ($token = $this->setToken()) {
          $response->status = true;
          $response->data = ["token" => $token, "name" => ucwords($user->name), "email" => ucwords($user->email)];
          return ($response);
        } else $response->message = "SERVER_ERROR";
      } else $response->message = "INCORRECT_CREDENTIAL";
    } else $response->message = "INVALID_FORMAT";
    return $response;
  }

  private function hash($password)
  {
    return password_hash($password, PASSWORD_DEFAULT);
  }

  private function setToken()
  {
    $db = $this::$db->connect();
    $token = $this->hash(get_env("JWT_HASH"));
    $query = $db->query("UPDATE user SET token='{$token}' WHERE id='{$this->user}'") or die($db->error);
    return $query ? $token : false;
  }

  private function getUser($email)
  {
    $db = $this::$db->connect();
    $query = $db->query("SELECT * FROM user WHERE email='{$email}' LIMIT 1") or die($db->error);
    if ($query->num_rows) {
      return $query->fetch_object();
    } else return false;
  }
}
