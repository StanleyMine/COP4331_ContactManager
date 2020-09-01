document.getElementById("login-form").addEventListener("submit", login);

async function apiRequest(endpoint, data) {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return { status: response.status, data: await response.text() };
    }

    return { status: response.status, data: await response.json() };
  } catch (err) {
    return {
      status: 500,
      data: "An error has occured, please try again later.",
    };
  }
}

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

function checkValidName(myString) {
  const validUsernameRegex = /^[a-z0-9]+$/i;
  if (!validUsernameRegex.test(myString)) {
    return false;
  }
  return true;
}

async function createAccount() {
  const createuser = document.getElementById("createuser").value;
  const createpass = document.getElementById("createpass").value;
  const confpass = document.getElementById("confpass").value;

  if (confpass != createpass) {
    //passwords don't match
    alert("passwords do not match");
  }

  const response = await apiRequest("/api/createAccount.php", {
    createuser,
    createpass
  });

  if (response.status >= 200 && response.status <= 299) {
    // response.data stores normal data
    document.getElementById("createError").innerText = "Success!";
  } else if (response.status >= 400 && response.status <= 499) {
    document.getElementById("createError").innerText = "Sorry, this username is not available. Please try again.";
  } else {
    document.getElementById("error").innerText = "Server Error. Please try later.";
  }
}

function createContact() {}

function deleteContact() {}

function searchContacts() {
  // display dyanmic table growing with result matches
  // look into innerHTML
}
