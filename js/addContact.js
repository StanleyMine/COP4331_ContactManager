let id = document.cookie
  .split("; ")
  .find((row) => row.startsWith("id"))
  .split("=")[1];

let flag = 0;
let contactID = -1;

checkForEdit();

function checkForEdit() {
  let params = new URL(document.location.href).searchParams;
  let data = params.get("data");
  if (!data) {
    flag = 0;
    contactID = -1;
    return;
  }
  flag = 1;
  data = decodeURIComponent(data);
  data = JSON.parse(data);

  const [fName, lName] = data["fullName"].split(" ");

  contactID = data["contactID"];
  document.getElementById("firstName").value = fName;
  document.getElementById("lastName").value = lName;
  document.getElementById("email").value = data["email"];
  document.getElementById("phone").value = data["phoneNumber"];
  document.getElementById("skill").value = data["skills"];
  document.getElementById("projectLink").value = data["projectLink"];
}

document
  .querySelector("#add-contact-form")
  .addEventListener("submit", addContact);

async function addContact(event) {
  event.preventDefault();

  let firstName = document.querySelector("#firstName").value;
  let lastName = document.querySelector("#lastName").value;
  let fullName =
    document.querySelector("#firstName").value +
    " " +
    document.querySelector("#lastName").value;

  let email = document.querySelector("#email").value;
  let phoneNumber = document.querySelector("#phone").value;
  let skills = document.querySelector("#skill").value;
  let projectLink = document.querySelector("#projectLink").value;

  // Field Length constants. Don't use magic numbers.
  const FNLEN = 50,
    LNLEN = 50,
    EMAILLEN = 100,
    PHONELEN = 20,
    SKILLLEN = 100,
    PROJECTLEN = 100;

  const CHARLIMITMSG = "character limit: ";

  if (!firstName) {
    document.getElementById("error").innerText =
      "Please enter a valid first name";
    return;
  }

  if (firstName.length > FNLEN) {
    document.getElementById("error").innerText =
      "First name " + CHARLIMITMSG + FNLEN;
    return;
  }

  if (!lastName) {
    document.getElementById("error").innerText =
      "Please enter a valid last name";
    return;
  }

  if (lastName.length > LNLEN) {
    document.getElementById("error").innerText =
      "Last name " + CHARLIMITMSG + LNLEN;
    return;
  }

  if (!email) {
    document.getElementById("error").innerText = "Please enter a valid email";
    return;
  }

  if (email.length > EMAILLEN) {
    document.getElementById("error").innerText =
      "Email " + CHARLIMITMSG + EMAILLEN;
    return;
  }

  if (!phoneNumber) {
    document.getElementById("error").innerText =
      "Please enter a valid phone number";
    return;
  }

  if (phoneNumber.length > PHONELEN) {
    document.getElementById("error").innerText =
      "Phone number " + CHARLIMITMSG + PHONELEN;
    return;
  }

  if (!skills) {
    document.getElementById("error").innerText =
      "Please enter a valid skill set";
    return;
  }

  if (skills.length > SKILLLEN) {
    document.getElementById("error").innerText =
      "Skillset " + CHARLIMITMSG + SKILLLEN;
    return;
  }

  if (!projectLink) {
    document.getElementById("error").innerText =
      "Please enter a valid project link";
    return;
  }

  if (projectLink.length > PROJECTLEN) {
    document.getElementById("error").innerText =
      "Project link " + CHARLIMITMSG + PROJECTLEN;
    return;
  }

  let phpFile = "";
  let data = "";

  if (flag == 0) {
    phpFile = "add_contact.php";
    data = { id, fullName, email, phoneNumber, skills, projectLink };
  } else if (flag == 1) {
    phpFile = "update_contact.php";
    data = { contactID, id, fullName, email, phoneNumber, skills, projectLink };
  }

  const response = await apiRequest("/LAMPAPI/" + phpFile, data, "POST");

  if (response.status == 200) {
    if (
      response.data.error == "Contact successfully updated!" ||
      response.data.error == "Contact successfully added!"
    ) {
      fullName.innerText = "";
      email.innerText = "";
      phoneNumber.innerText = "";
      skills.innerText = "";
      projectLink.innerText = "";
      contactID = -1;
      document.getElementById("success").innerText = response.data.error;
      document.getElementById("error").innerText = "";
      return;
    }
    document.getElementById("error").innerText = response.data.error;
    document.getElementById("success").innerText = "";
  } else {
    document.getElementById("error").innerText = response.data;
    document.getElementById("success").innerText = "";
  }
}

document
  .querySelector("input[type='button']")
  .addEventListener("click", toContactManager);

function toContactManager(event) {
  event.preventDefault();
  window.location.href = "contactManager.html";
}
