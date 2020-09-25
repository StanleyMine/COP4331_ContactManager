document
  .getElementById("create-account")
  .addEventListener("submit", createAccount);

async function createAccount(event) {
  event.preventDefault();
  let Username = document.getElementById("createuser").value;
  let Password = document.getElementById("createpass").value;
  let confpass = document.getElementById("confpass").value;

  if (Password != confpass) {
    //passwords don't match
    document.getElementById("createError").innerText = "Passwords do not match";
  }

  if (!checkValidName(Username)) {
    document.getElementById("createError").innerText =
      "Please enter a valid username.";
    return;
  }

  Password = MD5(Password);

  const response = await apiRequest(
    "/LAMPAPI/create_account.php",
    {
      Username,
      Password,
    },
    "POST"
  );

  if (response.status == 200) {
    if (response.data.error == "This username is unavailable") {
      document.getElementById("createError").innerText = response.data.error;
      return;
    }
    document.getElementById("createSuccess").innerText = response.data.error;
    document.getElementById("createError").innerText = "";
  } else {
    document.getElementById("createError").innerText = response.data;
  }
}
