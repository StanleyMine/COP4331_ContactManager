let id = document.cookie
  .split("; ")
  .find((row) => row.startsWith("id"))
  .split("=")[1];

document
  .querySelector("input[type='submit']")
  .addEventListener("submit", addContact);

async function addContact(event) {
  event.preventDefault();

  alert("why are we still here?");

  let firstName = document.querySelector("#firstName");
  let lastName = document.querySelector("#lastName");
  let fullName =
    document.querySelector("#firstName") +
    " " +
    document.querySelector("#lastName");

  let email = document.querySelector("#email");
  let phone = document.querySelector("#phone");
  let skill = document.querySelector("#skill");
  let projectLink = document.querySelector("#projectLink");

  if (!firstName) {
    document.getElementById("error").innerText =
      "Please enter a valid first name";
    return;
  }

  if (!lastName) {
    document.getElementById("error").innerText =
      "Please enter a valid last name";
    return;
  }

  if (!email) {
    document.getElementById("error").innerText = "Please enter a valid email";
    return;
  }

  if (!phone) {
    document.getElementById("error").innerText =
      "Please enter a valid phone number";
    return;
  }

  if (!skill) {
    document.getElementById("error").innerText =
      "Please enter a valid skill set";
    return;
  }

  if (!projectLink) {
    document.getElementbyId("error").innerText =
      "Please enter a valid project link";
    return;
  }

  const response = await apiRequest(
    "/LAMPAPI/add_contact.php",
    {
      id,
      fullName,
      email,
      phone,
      skill,
      projectLink,
    },
    "POST"
  );

  if (response.status == 200) {
    if (response.data.error) {
      document.getElementById("error").innerText = response.data.error;
      return;
    }

    // fullName.innerText = "";
    // email.innerText = "";
    // phone.innerText = "";
    // skill.innerText = "";
    // projectLink.innerText = "";

    document.getElementById("success").innerText = response.data;
  } else {
    document.getElementById("error").innerText = response.data;
  }
}

// what if someone clicks both add contact and contact manager?

document
  .querySelector("input[type='button']")
  .addEventListener("click", toContactManager);

function toContactManager(event) {
  event.preventDefault();
  window.location.href = "contactManager.html";
}
