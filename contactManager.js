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

async function deleteContact() {}

async function createContact() {}
