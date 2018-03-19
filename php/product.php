<?php
	header('Content-Type:application/json;charset=UTF-8');
	$output=[];
	$pageNum=$_REQUEST['pageNum'];
	$count=5;
	if(empty($pageNum)){
		$pageNum=0;
	 }
	$conn=mysqli_connect('127.0.0.1','root','','kaifanla');
	$sql="SET NAMES UTF8";
	mysqli_query($conn,$sql);
	//获取总记录
	$sql="SELECT did,name,price,img_sm,material FROM kf_dish LIMIT $pageNum,$count";
	$result=mysqli_query($conn,$sql);
	while(true){
		$list=mysqli_fetch_assoc($result);
		if(!$list){break;}
		$output[]=$list;
	}
    echo json_encode($output);

?>
