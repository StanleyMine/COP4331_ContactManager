document
  .getElementById("create-account")
  .addEventListener("submit", createAccount);

async function createAccount(event) {
  event.preventDefault();
  const Username = document.getElementById("createuser").value;
  const Password = document.getElementById("createpass").value;
  const confpass = document.getElementById("confpass").value;

  if (Password != createpass) {
    //passwords don't match
    document.getElementById("createError").innerText = "Passwords do not match";
  }

  if (!checkValidName(Username)) {
    document.getElementById("createError").innerText =
      "Please enter a valid username.";
    return;
  }

  const response = await apiRequest(
    "/LAMPAPI/create_account.php",
    {
      Username,
      Password,
    },
    "POST"
  );

  if (response.status == 200) {
    if (response.data.error) {
      document.getElementById("createError").innerText = response.data.error;
      return;
    }
    // response.data stores normal data
    document.getElementById("createSuccess").innerText = response.data.message;
    document.getElementById("createError").innerText = "";
  } else {
    document.getElementById("createError").innerText = response.data;
  }
}
