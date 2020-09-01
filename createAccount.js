document
  .getElementById("create-account")
  .addEventListener("submit", createAccount);

async function createAccount(event) {
  event.preventDefault();
  const createuser = document.getElementById("createuser").value;
  const createpass = document.getElementById("createpass").value;
  const confpass = document.getElementById("confpass").value;

  if (confpass != createpass) {
    //passwords don't match
    document.getElementById("createError").innerText = "Passwords do not match";
  }

  if (!checkValidName(createuser)) {
    document.getElementById("createError").innerText =
      "Please enter a valid username.";
    return;
  }

  const response = await apiRequest("/api/createAccount.php", {
    createuser,
    createpass,
  });

  if (response.status >= 200 && response.status <= 299) {
    // response.data stores normal data
    document.getElementById("createError").innerText = "Success!";
  } else if (response.status >= 400 && response.status <= 499) {
    document.getElementById("createError").innerText =
      "Sorry, this username is not available. Please try again.";
  } else {
    document.getElementById("createError").innerText =
      "Server Error. Please try later.";
  }
}
