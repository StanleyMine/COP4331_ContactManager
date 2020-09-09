<?php

	$inData = getRequestInfo();

	$servername = "localhost";
	$user = "group1db";
	$pass = "Group1_123!";
	$thedb = "group1db_project1";


	$conn = new mysqli($servername, $user, $pass, $thedb);
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		// Checks whether the username is already in the database.
		$sql = "DELETE from User_Info WHERE (userID=" . $inData["id"] . " and phoneNumber='" . $inData["phoneNumber"] . "')"; 
		$result = $conn->query($sql);
		if($result)
		{
			returnWithInfo( "The contact was successfully deleted.");
		}
		else
		{
            returnWithError( "The contact either does not exist or could not be deleted.");
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
		$retValue = '{"message":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $message )
	{
		$retValue = '{"message":"' . $message . '"}';
		sendResultInfoAsJson( $retValue );
	}

?>
