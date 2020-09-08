async function searchContacts() {
  // display dyanmic table growing with result matches
  // look into innerHTML
}

function addRow(dataRow) {
  const myTable = document.getElementById("contact-table");
  const row = document.createElement("tr");
  const columnKeys = [
    "firstName",
    "lastName",
    "email",
    "phoneNumber",
    "skill",
    "dateAdded",
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
    const succeeded = await deleteRowRequest(dataRow.id);
    if (succeeded) {
      row.remove();
    }
  });
  row.appendChild(deleteCell);

  myTable.appendChild(row);
}

async function deleteRowRequest(dataRow) {
  const response = await apiRequest(
    "/LAMPAPI/deleteContact.php",
    { id },
    "DELETE"
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

async function createContact() {}
