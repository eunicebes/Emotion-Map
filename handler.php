<?php
 	date_default_timezone_set('Asia/Taipei');

 	$response = file_get_contents('php://input');
 	$obj = json_decode($response);
 	$id = $obj->{'id'};
 	$content = $obj->{'content'}->{'posts'}->{'data'};

	$text = array();
	
	foreach($content as $val){
		array_push($text, $val->{'message'});
	}
	
 	$filename = $id.' '.date('Y-m-d H:i:s');
 	$myfile = fopen('json/'.$filename, "a") or die("Unable to open file!");

 	fwrite($myfile, $response."\n");
 	fclose($myfile);
 	echo json_encode($text);
?>