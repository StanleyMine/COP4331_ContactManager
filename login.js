document.getElementById("login-form").addEventListener("submit", login);

async function login(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username) {
    // checking "", blank, null, 0, false
    document.getElementById("error").innerText =
      "Please enter a valid username.";
    return;
  }
  if (!password) {
    // checking "", blank, null, 0, false
    document.getElementById("error").innerText =
      "Please enter a valid password.";
    return;
  }

  // testing user to stop invalid strings
  if (!checkValidName(username)) {
    document.getElementById("error").innerText =
      "Please enter a valid username.";
    return;
  }

  const response = await apiRequest("/api/login.php", { username, password });

  if (response.status >= 200 && response.status <= 299) {
    // response.data stores normal data
    // TODO : access contacts manager from here
  } else if (response.status >= 400 && response.status <= 499) {
    document.getElementById("error").innerText = "Not in DB";
  } else {
    document.getElementById("error").innerText =
      "Server Error. Please try later.";
  }
}
