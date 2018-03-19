<?php
	header('Content-Type:application/json;charset=UTF-8');
	$kw=$_REQUEST["kw"];
	if(!$kw){echo '[]';return};
	//$output=[];
	$conn=mysqli_connect('127.0.0.1','root','','kaifanla');
	$sql="SET NAMES UTF8";
	mysqli_query($conn,$sql);
	$sql="SELECT * FROM kf_dish WHERE name LIKE '%$kw%' OR material LIKE '%$kw%'";
	$result=mysqli_query($conn,$sql);
	$list=mysqli_fetch_all($result,MYSQLI_ASSOC);
    echo json_encode($list);

?>
