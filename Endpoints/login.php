<?php

	$inData = getRequestInfo();

	$servername = "localhost";
	$admin_user = "group1db";
	$admin_pass = "Group1_123!";
	$thedb = "group1db_project1";
	
	$id = 0;
	$firstName = "";
	$lastName = "";
	$lastLog = "";

	$conn = new mysqli($servername, $admin_user, $admin_pass, $thedb);
	
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$sql = "SELECT id,firstName,lastName,lastLogin FROM Login where username='" . $inData["Username"] . "' and password='" . $inData["Password"] . "'";
		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
			$row = $result->fetch_assoc();
			$firstName = $row["firstName"];
			$lastName = $row["lastName"];
			$id = $row["id"];
			
			$dateBefore = $row["lastLogin"];
			$dateNow = date_create();
			$date2 = date_format($dateNow, "Y-m-j");
			
			if ($dateBefore==NULL){
			    	$sql = "UPDATE Login SET lastLogin='" . $date2 . "' WHERE id=" . $id;
			        $result = $conn->query($sql);
	                	returnWithInfo($firstName, $lastName, $id, $lastLog );
			}
			else {
				$date1 = date_create_from_format("Y-m-j", $dateBefore);
				$diff = date_diff($date1, $date2);

				$lastLog = $diff->format("Days since last log in: %a");

				$sql = "UPDATE Login SET lastLogin='" . $date2 . "' WHERE id=" . $id;
				$result = $conn->query($sql);

				returnWithInfo($firstName, $lastName, $id, $lastLog );
			}
		}
		else
		{
			returnWithError( "No Records Found" );
		}
		$conn->close();
	}
	
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"id":0,"firstName":"","lastName":"","lastLog":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $firstName, $lastName, $id )
	{
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","lastLog":"' . $lastLog . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
