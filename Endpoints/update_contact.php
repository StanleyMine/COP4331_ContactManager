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
        // Update the User_Info table.
            
		$sql = "UPDATE User_Info SET fullName = '".$inData["fullName"]."', skills = '".$inData["skills"]."', projectLink = '".$inData["projectLink"]."', phoneNumber = '".$inData["phoneNumber"]."', email = '".$inData["email"]."' WHERE userID = '".$inData[id]."' and id ='".$inData[contactID]."'";

		$result = $conn->query($sql);
		
		if ($result)
		{

			returnWithInfo("Contact successfully updated!");
				
		}
		else
		{
			returnWithError( "There was a problem updating the contact" );
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