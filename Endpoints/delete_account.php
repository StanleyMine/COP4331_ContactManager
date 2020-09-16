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
		$sql = "DELETE FROM User_Info where userID=" . $inData["id"];
		$result = $conn->query($sql);
		if($result)
		{
            $sql = "DELETE FROM Login WHERE id=" . $inData["id"];
            $result = $conn->query($sql);
            returnWithInfo( "Account successfully deleted. Sorry to see you go!" );
		}
		else
		{
			returnWithError( "There was an error deleting the account" );
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
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $message )
	{
		$retValue = '{"error":"' . $message . '"}';
		sendResultInfoAsJson( $retValue );
	}

?>