<?php
	header('Content-Type:application/json;charset=UTF-8');
	$conn=mysqli_connect('127.0.0.1','root','','kaifanla');
	$sql="SET NAMES UTF8";
	mysqli_query($conn,$sql);
	$sql="SELECT * FROM kf_order";
	$result=mysqli_query($conn,$sql);
	$list=mysqli_fetch_all($result,MYSQLI_ASSOC);
    echo json_encode($list);

?>
