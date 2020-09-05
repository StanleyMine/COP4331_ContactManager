<?php

	$inData = getRequestInfo();

	$servername = "localhost";
	$user = "group1db";
	$pass = "Group1_123!";
	$thedb = "group1db_project1";

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
		$sql = "SELECT id FROM Login where username='" . $inData["Username"] . "'";
		$result = $conn->query($sql);
		if($result->num_rows > 0)
		{
			returnWithError( "This username is unavailable");
		}
		else
		{
			// Get the current date
			$mydate=getdate(date("U"));
			$dateCreated = "$mydate[month] $mydate[mday], $mydate[year]";

			// insert into the Login table.
			$sql = "INSERT into Login (username, password, firstName, lastName, dateCreated) VALUES ('" . $inData["Username"] . "', '" . $inData["Password"] . "', '" . $inData["firstName"] . "', '" . $inData["lastName"] . "', '" . $dateCreated . "')";
			$result = $conn->query($sql);
		
			if ($result)
			{

				$sql = "SELECT firstName, lastName FROM Login where username='" . $inData["Username"] . "'";
				$result = $conn->query($sql);
				$row = $result->fetch_assoc();
			
				$firstName = $row["firstName"];
				$lastName = $row["lastName"];

				returnWithInfo($firstName, $lastName, "Account successfully created!");
				
			}
			else
			{
				returnWithError( "There was a problem creating the account" );
			}
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
		$retValue = '{"firstName":"","lastName":"","message":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $firstName, $lastName, $message )
	{
		$retValue = '{"firstName":"' . $firstName . '","lastName":"' . $lastName . '","message":"' . $message . '"}';
		sendResultInfoAsJson( $retValue );
	}

?>
