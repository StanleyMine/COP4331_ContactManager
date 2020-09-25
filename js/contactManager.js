document
  .getElementById("search-form")
  .addEventListener("submit", searchContacts);

document.getElementById("logout-button").addEventListener("click", logout);

document
  .getElementById("delete-account-button")
  .addEventListener("click", deleteAccountRequest);

// getting cookies
let id = document.cookie
  .split("; ")
  .find((row) => row.startsWith("id"))
  .split("=")[1];
let lastLog = document.cookie
  .split("; ")
  .find((row) => row.startsWith("lastLog"))
  .split("=")[1];

fillTable();

function logout() {
  var d = new Date();
  var expires = "expires=" + d.toUTCString();
  document.cookie =
    "id=" + id + "; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  document.cookie =
    "lastLog=" + lastLog + "; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  window.location.replace("."); // clear cookies and replace
}

async function fillTable() {
  const myTbody = document.getElementById("tableTbody");
  const mySpan = document.getElementById("welcome-span");
  mySpan.innerText = lastLog;
  myTbody.innerHTML = ""; // empty table if anything is in it
  const response = await apiRequest(
    "/LAMPAPI/read_contacts.php",
    { id },
    "POST"
  );
  if (response.status == 200 || response.data.error) {
    if (response.data.error) {
      errorMessage(response.data.error);
      return;
    }
    for (const contact of response.data.results) {
      addRow(contact);
    }
  } else {
    errorMessage("Something went wrong, try again later.");
  }
}

async function searchContacts(event) {
  event.preventDefault();
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
  if (response.status == 200) {
    if (response.data.error) {
      errorMessage(response.data.error);
      return;
    }
    myTbody.innerHTML = "";
    for (const contact of response.data.results) {
      addRow(contact);
    }
  } else {
    errorMessage("Something went wrong, try again later.");
  }
}

async function addRow(dataRow) {
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
    const rowCell = document.createElement("td");
    rowCell.innerText = dataRow[columnKey];
    row.appendChild(rowCell);
  }

  const deleteCell = document.createElement("td");
  deleteCell.innerText = "🗑️";
  deleteCell.addEventListener("click", async () => {
    if (confirm("Delete Contact Confirmation")) {
      const succeeded = await deleteRowRequest(dataRow.id);
      if (succeeded) {
        row.remove();
      }
    }
  });
  const editCell = document.createElement("td");
  const link = document.createElement("a");
  link.innerText = "🖋";
  const hrefData = JSON.stringify(dataRow);
  link.href = `/addContact.html?data=${encodeURIComponent(hrefData)}`;
  editCell.appendChild(link);

  // append to row and table
  row.appendChild(deleteCell);
  row.appendChild(editCell);
  myTable.appendChild(row);
}

async function deleteRowRequest(phoneNumber) {
  const response = await apiRequest(
    "/LAMPAPI/delete_Contact.php",
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

async function deleteAccountRequest() {
  if (!confirm("Are you sure you want to delete your account?")) {
    return;
  }
  const response = await apiRequest(
    "/LAMPAPI/delete_Account.php",
    { id },
    "POST"
  );
}
