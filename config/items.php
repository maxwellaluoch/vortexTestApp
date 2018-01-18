<?php
$db = mysqli_connect('192.168.0.14','root','999poo666','rmsdatabase');
$sql = "SELECT Description, Cost, Quantity FROM item";
$results = $db->query($sql);
$data = array();
while($items = mysqli_fetch_assoc($results)) {
    $data[] = $items;
}
echo json_encode($data);
