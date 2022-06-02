<?php

class Server
{
  public $local_servers = ['localhost'];
  public $server = "localhost";

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

  public function getMetadata()
  {
    $data = _readFile("constants/movieMedata.json");
    return (["status" => true, "data" => isJson($data)]);
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
      "path" => "/" . explode("?", $page_source)[0],
      "route" => explode("?", $content_id)[0],
      "param" => $event,
      "domain" => $this->domain,
    ]);
  }
}
