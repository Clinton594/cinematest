<?php
// Converts any array to an object
function object(array $array = []): object
{
	if (empty($array)) $array = new stdClass;
	return json_decode(json_encode($array));
}
// Converts any array to an object
function arrray(object $array): array
{
	if (empty($array)) $array = new stdClass;
	return json_decode(json_encode($array), true);
}

function get_env($key)
{
	$data = _readFile(".env");
	$env = array_map(function ($x) {
		return explode("=", $x);
	}, explode("\n", $data));
	$f = array_filter($env, function ($x) use ($key) {
		return $x[0] === $key;
	});
	return count($f) ?  reset($f)[1] : null;
}
// Filters an array with one or multiple values
function filter_array(array $array, array $filter_values)
{
	$return = [];
	foreach ($array as $key => $value) {
		$validrow = 0;
		foreach ($filter_values as $filter_key => $filter_value) {
			if (isset($value->{$filter_key}) && $value->{$filter_key} == $filter_value) $validrow++;
		}
		if ($validrow == count($filter_values)) $return[$key] = $value;
	}
	return $return;
}

// Groups an array by value
function array_group($array = array(), $value = "")
{
	$response = [];
	foreach ($array as $k => $v) {
		$cat = !isset($v->{$value}) ? "" : strtolower($v->{$value});
		$response[$cat][] = $v;
	}
	return $response;
}

//Get a range of array indexes
function array_range($array = array(), $range = 1, $offset = 0)
{
	$result = array();
	$count = 1;
	$array = (array)$array;
	$range = $range === 1 ? count($array) : $range;
	foreach ($array as $key => $value) {
		if ($count >= $offset && $count <= $range) {
			$result[$key] = $value;
		}
		$count++;
	}
	return $result;
}

//Converts an array back to http GET (array_to_GET)
function array_serialize($array = array())
{
	$build = [];
	if (!empty($array)) {
		foreach ($array as $key => $val) {
			$key = trim($key);
			$val = trim(urlencode($val));
			$build[] = "$key=$val";
		}
	}
	return implode("&", $build);
}

//Converts GET-like string to an Array exploded by a given delimiter
function explodeToKey($delimiter, $array)
{
	$response = [];
	if (gettype($array) == 'array' && !empty($delimiter)) {
		foreach ($array as $key => $value) {
			$hold = explode($delimiter, $value);
			$hold = array_map("trim", $hold);
			if (isset($hold[1])) $response[$hold[0]] = $hold[1];
		}
	} else $response = "second argument not an array";
	return ($response);
}

//Extract values of specific keys from an array
function array_extract($main_array, $extr_keys, $associate_keys = false)
{
	$return = [];
	foreach ($main_array as $key => $value) {
		$search = array_search($key, $extr_keys);
		if ($search !== false) {
			if ($associate_keys)
				$return[$key] = $value;
			else $return[] = $value;
		}
	}
	return $return;
}

//Rename the keys in an array to the values in another array where both keys match
function array_remap($main_array, $match_keys)
{
	$return = [];
	$main_array = (array)$main_array;
	$match_cols = array_keys((array)$match_keys);
	$match_vals = array_values((array)$match_keys);
	foreach ($main_array as $key => $value) {
		$index  = array_search($key, $match_cols);
		if ($index !== false) {
			$newkey = $match_vals[$index];
			$return[$newkey] = $value;
		}
	}
	return $return;
}

//Checks if a sring is json
function isJson($string)
{
	$json_val = json_decode($string);
	$bool_val = (json_last_error() == JSON_ERROR_NONE);
	return $json_val;
}

function _readFile($file)
{
	$data = null;
	if (file_exists($file)) {
		$handle = fopen($file, 'r');
		$filesize = filesize($file);
		$data = ($filesize) ? fread($handle, filesize($file)) : json_encode([]);
		fclose($handle);
		if (!$filesize) unlink($file);
	}
	return ($data);
}
//Reads a directory
function _readDir($dir, $nested = false)
{
	if (!is_dir($dir)) {
		mkdir($dir, 0777, true);
	}
	$files = scandir($dir);
	$files = array_filter($files, function ($file) {
		return ($file == "." || $file == "..") ? false : true;
	});
	return ($files);
}

//Best function to handle utf8 encoding of multi-dimensional array data
function utf8ize($d)
{
	if (is_array($d)) {
		foreach ($d as $k => $v) {
			$d[$k] = utf8ize($v);
		}
	} else if (is_string($d)) {
		// Remove all non-printable charachters
		$d = preg_replace('/[^[:print:]]/', '', $d);
		return  trim(utf8_encode($d));
	} else if (is_object($d)) {
		foreach ($d as $k => $v) {
			$d->{$k} = utf8ize($v);
		}
	}
	return $d;
}

//Removes all special characters from a sting excluding;
function cleanUp($string = "", $excludes = [])
{
	$excludes = empty($excludes) ? "" : implode(",", $excludes);
	if (!empty($string)) {
		$string = str_replace(' ', '-', $string); // Replaces all spaces with hyphens.
		$string = preg_replace('/[^A-Za-z0-9\-_' . $excludes . ']/', '', $string); // Removes special chars.
	}
	return $string;
}

//Advanced printer for all kinds of data
function see($arr, $stop = true)
{
	if (gettype($arr) == 'array' || gettype($arr) == 'object') {
		echo "<pre>";
		print_r($arr);
		if ($stop === true) {
			die();
		}
	} else {
		if ($stop !== true) {
			print("$arr");
		} else {
			die("$arr");
		}
	}
}


//Get the full file path of any path whether existing or not.
function absolute_filepath($file = "", $only_existing_files = true)
{
	$root = $_SERVER["DOCUMENT_ROOT"];
	$cleanedFile = str_replace("../", "", $file);
	$thisScriptDir = dirname($_SERVER["SCRIPT_FILENAME"]);
	$file_exists = file_exists($file);
	$file_exists = $only_existing_files === false ? true : $file_exists;
	if ($file_exists || is_dir(dirname($file))) {
		$dirs = explode("/", $file);
		foreach ($dirs as $key => $value) {
			if ($value == "..") {
				$xpld = explode("/", $thisScriptDir);
				array_pop($xpld);
				$thisScriptDir = implode("/", $xpld);
			}
		}
		$file = "$thisScriptDir/$cleanedFile";
	} else if (stripos($file, "http") !== false) {
		if (!empty(parse_url($file)["path"])) {
			$file = $root . parse_url($file)["path"];
		}
	}
	return ($file);
}


//Checks if a url or file_path contains http
function is_http_url($url = "")
{
	$response = false;
	if (!empty($url) && stripos($url, "http") === 0) $response = true;
	return $response;
}

//Checks if a filepath is absolute
function is_absolute_filepath($file = "")
{
	$response = false;
	$root = $_SERVER["DOCUMENT_ROOT"];
	if (!empty($file) && stripos($file, $root) === 0) $response = true;
	return $response;
}

//Used by controller's filterQuery to extract WHERE IN clause
function get_in_clause($string = '', $position = "")
{
	if (!empty($string)) {
		$string  = trim(explode("),", $string)[$position] . ")");
		preg_match('#\((.*?)\)#', $string, $bracket);
		$bracket = implode("','", explode(',', str_replace("'", "", $bracket[1])));
		$bracket = "('{$bracket}')";
		$firstwd = strtok($string, " ");
		$string	 = "{$firstwd} in {$bracket}";
	}
	return $string;
}

function filterQuery($filter, $fields)
{
	$_flt = [];
	$filter =  str_replace(" and ", ",", strtolower($filter));
	$arr = explode(',', $filter);
	$explosives = ["<>", "!=", "<", ">", "="];
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
			if (array_search($_a[0], $fields) !== false) { //multiple keys
				if (strtolower($_a[1]) == "null") {
					$_flt[] = "{$_a[0]} IS NULL";
				} else {
					$_flt[] = "{$_a[0]}$explode_key'{$_a[1]}'";
				}
			}
		} else if (gettype(stripos($fltr, ' in ')) !== 'boolean') {
			$_flt[] = get_in_clause($filter, $fltr);
		}
	}
	return implode(" and ", $_flt);
}

//Format number of view ranges
function number($int = 0)
{
	$int = intval($int);
	if ($int > 999) {
		$int = round($int / 1000, 1);
		$int = "{$int}k";
	}
	return $int;
}

function simple_encode($value)
{
	if (is_numeric($value)) {
		$value = "$value";
	}
	$value = str_replace(" ", "+", $value);
	// return substr(base64_encode(str_rot13($value)), 0, -1);
	return base64_encode(str_rot13($value));
}

function simple_decode($value)
{
	$value = str_rot13(base64_decode($value));
	return str_replace("+", " ", $value);
}

function mysubstr($string = '', $length = 0)
{
	$return = substr($string, 0, $length);
	if (strlen($string) > $length) $return .= "...";
	return $return;
}

function remove_tbn($string = '')
{
	return str_replace("tbn/", "", $string);
}
