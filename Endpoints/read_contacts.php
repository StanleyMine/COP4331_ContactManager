<?php

	$inData = getRequestInfo();

	$servername = "localhost";
	$admin_user = "group1db";
	$admin_pass = "Group1_123!";
	$thedb = "group1db_project1";
	
	$contactID = 0;
	$fullName = "";
	$firstName = "";
	$lastName = "";
	$skills = "";
	$email = "";
	$phoneNumber = "";
	$projectLink = "";
	$dateAdded = "";
	$contacts = "";

	$conn = new mysqli($servername, $admin_user, $admin_pass, $thedb);
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$sql = "SELECT id,fullName,skills,projectLink,email,phoneNumber,dateAdded FROM User_Info where userID=" . $inData["id"];
		$result = $conn->query($sql);
		$count = $result->num_rows;
		if ($result->num_rows == 0)
		{
			returnWithError( "You must be lonely. Try again when you glow up." );
		}
		else
		{
			$contacts = "[";
			while ($count > 0)
			{
				$row = $result->fetch_assoc();
				$contactID = $row["id"];
				$fullName = $row["fullName"];
				$skills = $row["skills"];
				$email = $row["email"];
				$phoneNumber = $row["phoneNumber"];
				$projectLink = $row["projectLink"];
				$dateAdded = $row["dateAdded"];
				$myJsonObject = '{"contactID":'.$contactID.', "fullName":"' . $fullName . '","skills":"' . $skills . '","email":"' . $email . '","phoneNumber":"' . $phoneNumber . '","projectLink":"' . $projectLink . '","dateAdded":"'.$dateAdded.'"}';
				
				$contacts .= $myJsonObject;
				if($count > 1)
				{
					$contacts .= ",";
				}
				$count--;
			}
			$contacts .= "]";
			returnWithInfo( $contacts );
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
		$retValue = '{"results":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $contacts )
	{
		$retValue = '{"results":' . $contacts . ',"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
