<?php

function __autoload($class_name) {
    include '../classes/'.$class_name . '.php';
}
$category = $_REQUEST['category'];
$title = $_REQUEST['title'];
$param = $_REQUEST['param'];

$titleAdjuster = new titleAdjuster();

echo $titleAdjuster->tAdjuster($category, $title, $param);

?>