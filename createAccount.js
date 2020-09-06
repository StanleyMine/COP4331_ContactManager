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

  const response = await apiRequest("/LAMPAPI/createAccount.php", {
    createuser,
    createpass,
  });

  if (response.status == 200) {
    if (response.data.error) {
      document.getElementById("createError").innerText = response.data.error;
      return;
    }
    // response.data stores normal data
    document.getElementById("createError").innerText = response.data;
  } else {
    document.getElementById("createError").innerText = response.data;
  }
}
