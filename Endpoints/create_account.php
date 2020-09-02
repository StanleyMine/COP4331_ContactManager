<?php

	$inData = getRequestInfo();

	$servername = "localhost";
	$user = "admins";
	$pass = "Group1_123!"
	$thedb = "group1db_project1";

	$userID = 0;
	$firstName = "";
	$lastName = "";

	$conn = new mysqli($servername, $user, $pass, $thedb);
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_erro );
	}
	else
	{
		// Checks whether the username is already in the database.
		$sql = "SELECT id,firstName,lastName FROM Login where username='" . $inData["Username"] . "'";
		$result = $conn->query($sql);
		if($result->num_rows > 0)
		{
			returnWithError( "This username is unavailable");
		}
		// Get the current date
		$mydate=getdate(date("U"));
		$dateCreated = "$mydate[month] $mydate[mday], $mydate[year]";

		// insert into the Login table.
		$sql = "INSERT into Login (username, password, firstName, lastName, dateCreated) VALUES ('" + $inData["Username"] + "', '" + $inData["Password"] + "', '" + $inData["firstName"] + "', '" + $inData["lastName"] + "', '" + $dateCreated + "')";
		$result = $conn->query($sql);
		if ($result)
		{

			$sql = "SELECT id FROM Login where username='" + $inData["Username"] + "'";
			$result = $conn->query($sql);
			$row = $result->fetch_assoc();
		
			$firstName = $row["firstName"];
			$lastName = $row["lastName"];
			$userID = $row["id"];

			echo "Account successfully created";
			returnWithInfo($firstName, $lastName, $id );
			
		}
		else
		{
			returnWithError( "There was a problem creating the account" );
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
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $firstName, $lastName, $id )
	{
		$retValue = '{"id":' . $userID . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}

?>
