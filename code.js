async function apiRequest(endpoint, data, requestType) {
  try {
    const response = await fetch(endpoint, {
      method: requestType,
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

function checkValidName(myString) {
  const validUsernameRegex = /^[a-z0-9]+$/i;
  if (!validUsernameRegex.test(myString)) {
    return false;
  }
  return true;
}

function errorMessage(message) {
  const errorEl = document.createElement("div");
  errorEl.className = "floating-error";
  errorEl.innerText = message;

  document.body.appendChild(errorEl);

  setTimeout(() => {
    errorEl.remove();
  }, 5000);
}
