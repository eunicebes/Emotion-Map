<?php
 	date_default_timezone_set('Asia/Taipei');

 	$response = file_get_contents('php://input');
 	$obj = json_decode($response);
 	$id = $obj->{'id'};
	
 	$filename = $id.' '.date('Y-m-d H:i');
 	$myfile = fopen('json/'.$filename, "a") or die("Unable to open file!");

 	fwrite($myfile, $response."\n");
 	fclose($myfile);
?>