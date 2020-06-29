<?php

function generateRandomString($length = 10) {
  return substr(str_shuffle(str_repeat($x='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil($length/strlen($x)) )),1,$length);
}

$random =  generateRandomString();  // OR: generateRandomString(24)


filter_input_array(INPUT_POST,FILTER_SANITIZE_STRING);
$handler = fopen("$random.svg",'w');
  fwrite($handler,$_POST['svg']); 

  echo "$random.svg";
?>