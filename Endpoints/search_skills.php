?php

	$inData = getRequestInfo();

	$servername = "localhost";
	$admin_user = "admins";
	$admin_pass = "Group1_123!"
	$thedb = "group1db_project1";
	
	$id = 0;
	$firstName = "";
	$lastName = "";
	$skill = "";
	$email = "";
	$contacts = array();

	$conn = new mysqli($servername, $admin_user, $admin_pass, $thedb);
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		// I think he would like partial finds too, so this wouldn't work. Will review class for this one
		$sql = "SELECT UserID,firstName,lastName,skills FROM User_Info where skills='" . $inData["Skill"] . "'";
		$result = $conn->query($sql);
		$count = ($result->num_rows)-1;
		if ($result->num_rows > 0)
		{
			while ($count >= 0)
			{
				$row = $result->fetch_assoc();
				$firstName = $row["firstName"];
				$lastName = $row["lastName"];
				$id = $row["UserID"];
				$skill = $row["skills"];
				$contacts[$count] = array("firstName"=>$firstName, "lastname"=>$lastName, "id"=>$id, "skill"=>$skill);
				$count -= 1;
			}
			returnWithInfo($contacts );
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
		$retValue = '{"id":0,"firstName":"","lastName":"", "skill":"", "error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $contacts )
	{
		// Not confident if this will work with a multidimensional
		// array like $contacts
		$retValue = json_encode( $contacts );
		sendResultInfoAsJson( $retValue );
	}
	
?>
