async function searchContacts() {
  // display dyanmic table growing with result matches
  // look into innerHTML
  const errorEl = document.createElement("div");
  errorEl.className = "floating-error";
  errorEl.innerText = "My error message";
  errorEl.style.animation = "5s fade-in-out";

  document.body.appendChild(errorEl);

  setTimeout(() => {
    errorEl.remove();
  }, 5000);
}

function addRow(dataRow) {
  const mytable = document.getElementById("contact-table");
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
    await deleteRowRequest(dataRow.id); // you need to make this
    row.remove(); // detach the row if and when the request gets a success response
  });
  row.appendChild(deleteCell);

  table.appendChild(row);
}

async function deleteContact() {}

async function createContact() {}
