<?php
 	date_default_timezone_set('Asia/Taipei');

 	//$json = json_decode(stripslashes($_POST['data']), true);
 	$response = file_get_contents('php://input');
 	$id = $response['id'];

 	$filename = $id;
 	$myfile = fopen('json/'.$filename, "a") or die("Unable to open file!");

 	fwrite($myfile, $response."\n");
 	fclose($myfile);
?>