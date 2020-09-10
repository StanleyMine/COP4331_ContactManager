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
		$sql = "SELECT Login.id, User_Info.phoneNumber FROM Login INNER JOIN User_Info ON Login.id = User_Info.userID WHERE Login.id='" . $inData[id] . "' and User_Info.phoneNumber='" . $inData["phoneNumber"] . "'";
		$result = $conn->query($sql);
		if($result->num_rows > 0)
		{
			returnWithError( "This contact may already exist. Please check the information.");
		}
		else
		{
            // Get the current date
			$mydate=getdate(date("U"));
            $dateAdded = "$mydate[month] $mydate[mday], $mydate[year]";
            $space = " ";
            // insert into the User_Info table.
            
			$sql = "INSERT into User_Info (userID, fullName, skills, projectLink, phoneNumber, email, dateAdded) VALUES ('" . $inData[id] . "', '" . $inData["fullName"] . "', '" . $inData["skills"] . "', '" . $inData["projectLink"] . "', '" . $inData["phoneNumber"] . "', '" . $inData["email"] . "', '" . $dateAdded . "')";
			$result = $conn->query($sql);
		
			if ($result)
			{

				returnWithInfo("Contact successfully added!");
				
			}
			else
			{
				returnWithError( "There was a problem adding the contact" );
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
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $message )
	{
		$retValue = '{"error":"' . $message . '"}';
		sendResultInfoAsJson( $retValue );
	}

?>

