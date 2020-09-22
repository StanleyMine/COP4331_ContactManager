document
  .getElementById("search-form")
  .addEventListener("submit", searchContacts);

document.getElementById("logout-button").addEventListener("click", logout);

document.addEventListener("load", fillTable);

let id = document.cookie
  .split("; ")
  .find((row) => row.startsWith("id"))
  .split("=")[1];
let lastLog = document.cookie
  .split("; ")
  .find((row) => row.startsWith("lastLog"))
  .split("=")[1];

function logout() {
  var expires = "expires=" + d.toUTCString();
  document.cookie =
    "id=" +
    response.data.id +
    "; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  document.cookie =
    "lastLog=" +
    response.data.lastLog +
    "; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  window.location.replace(".");
}

async function fillTable() {
  const myTbody = document.getElementById("tableTbody");
  const mySpan = document.getElementById("welcome-span");
  mySpan.innerText =
    "Welcome, it has been " + lastLog + " days since you last logged on.";
  const response = await apiRequest(
    "/LAMPAPI/read_contacts.php",
    { id },
    "POST"
  );
  if (response == 200) {
    if (response.data.error) {
      errorMessage(response.data.error);
      return;
    }
    myTbody.innerHTML = "";
    for (const contact of response.data) {
      addRow(contact);
    }
  } else {
    errorMessage("Something went wrong, try again later.");
  }
}

async function searchContacts() {
  const searchType = document.getElementById("select-search").value;
  const searchCriteria = document.getElementById("search-input").value;
  const myTbody = document.getElementById("tableTbody");
  let path;
  let data = { id };
  if (!searchCriteria) {
    // checking search input
    errorMessage("Please provide search criteria.");
    return;
  }

  if (searchType == "Name") {
    path = "search_by_name";
    data = { id, name: searchCriteria };
  } else if (searchType == "Skill") {
    path = "search_skills";
    data = { id, skill: searchCriteria };
  }

  const response = await apiRequest("/LAMPAPI/" + path + ".php", data, "POST");
  if (response == 200) {
    if (response.data.error) {
      errorMessage(response.data.error);
      return;
    }
    myTbody.innerHTML = "";
    for (const contact of response.data) {
      addRow(contact);
    }
  } else {
    errorMessage("Something went wrong, try again later.");
  }
}

function addRow(dataRow) {
  const myTable = document
    .getElementById("contact-table")
    .getElementsByTagName("tbody")[0];
  const row = document.createElement("tr");
  const columnKeys = [
    "fullName",
    "email",
    "phoneNumber",
    "skills",
    "projectLink",
    "dateAdded", // TODO : need to check this, no api endpoint seems to corroborate this
  ];
  // loop through dataRow and add to row
  for (const columnKey of columnKeys) {
    // not convinced this works
    const rowCell = document.createElement("td");
    rowCell.innerText = dataRow[columnKey];
    row.appendChild(rowCell);
  }

  const deleteCell = document.createElement("td");
  deleteCell.innerText = "🗑️";
  deleteCell.addEventListener("click", async () => {
    if (confirm("Delete Contact Confirmation")) {
      const succeeded = await deleteRowRequest(dataRow.phoneNumber);
      if (succeeded) {
        row.remove();
      }
    }
  });
  row.appendChild(deleteCell);
  myTable.appendChild(row);
}

async function deleteRowRequest(phoneNumber) {
  const response = await apiRequest(
    "/LAMPAPI/deleteContact.php",
    { id, phoneNumber },
    "POST"
  );

  if (response.status != 200) {
    errorMessage("Something went wrong, try again later.");
    return false;
  } else if (response.data.error) {
    errorMessage(response.data.error);
    return false;
  }
  return true;
}
