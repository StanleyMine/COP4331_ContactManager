document.getElementById("login-form").addEventListener("submit", login);

async function login(event) {
  event.preventDefault();
  const Username = document.getElementById("username").value;
  const Password = document.getElementById("password").value;

  if (!Username) {
    // checking "", blank, null, 0, false
    document.getElementById("error").innerText =
      "Please enter a valid username.";
    return;
  }
  if (!Password) {
    // checking "", blank, null, 0, false
    document.getElementById("error").innerText =
      "Please enter a valid password.";
    return;
  }

  // testing user to stop invalid strings
  if (!checkValidName(Username)) {
    document.getElementById("error").innerText =
      "Please enter a valid username.";
    return;
  }

  const response = await apiRequest(
    "/LAMPAPI/login.php",
    {
      Username,
      Password,
    },
    "POST"
  );

  if (response.status == 200) {
    if (response.data.error) {
      document.getElementById("error").innerText = response.data.error;
      return;
    }

    var d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie =
      "username=" + response.data.id + ";" + expires + "; path=/";
    window.location.replace("contactManager.html");
  } else {
    document.getElementById("error").innerText = response.data;
  }
}
