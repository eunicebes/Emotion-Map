<?php
    date_default_timezone_set('Asia/Taipei');

    $response = file_get_contents('php://input');
    $obj = json_decode($response);
    $id = $obj->{'id'};
    $posts = $obj->{'posts'};
    // echo json_encode($posts);
    // // $filename = $id.' '.date('Y-m-d H:i');
    // // $myfile = fopen('json/'.$filename, "a") or die("Unable to open file!");
    
    // // fwrite($myfile, $response."\n");
    // // fclose($myfile);
 
    $query_string = json_encode($posts);
    $ch = curl_init('http://140.114.77.18:5678/emomap/couple');                                                                      
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");                                                                     
    curl_setopt($ch, CURLOPT_POSTFIELDS, $query_string);                                                                  
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);                                                                      
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(                                                                          
        'Content-Type: application/json',                                                                                
        'Content-Length: ' . strlen($query_string))                                                                       
    );
    $result = curl_exec($ch);
    // $result = json_decode($result);
    
    echo $result;
?>