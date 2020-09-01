
	$inData = getRequestInfo();

	$servername = "localhost";
	$admin_user = "admins";
	$admin_pass = "Group1_123!";
	$thedb = "group1db_project1";
	
	$id = 0;
	$firstName = "";
	$lastName = "";

	$conn = new mysqli($servername, $admin_user, $admin_pass, $thedb);
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$sql = "SELECT id,firstName,lastName FROM Login where username='" . $inData["Username"] . "' and Password='" . $inData["Password"] . "'";
		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
			$row = $result->fetch_assoc();
			$firstName = $row["firstName"];
			$lastName = $row["lastName"];
			$id = $row["id"];
			
			returnWithInfo($firstName, $lastName, $id );
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
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $firstName, $lastName, $id )
	{
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
