async function apiRequest(endpoint, data) {
    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "text/json",
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            return { status: response.status, data: await response.text() };
        }

        return { status: response.status, data: await response.json() };
    } catch (err) {
        return { status: 500, data: text };
    }
}

async function login() {
    var username, password;
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;

    const reponse = await apiRequest("/api/login.php", { username, password });

    if (response.status >= 200 && response.status <= 299) {
        // response.data stores normal data
    } else if (response.status >= 400 && response.status <= 499) {
        // response.data stores user error
    } else {
        // display something about the server having issues
    }
}

async function createAccount() {
    // need to confirm passwords and also check 
    // if account already exists with username

    var createuser, createpass, confpass;
    createuser = document.getElementById("createuser").value;
    createpass = document.getElementById("createpass").value;
    confpass = document.getElementById("confpass").value;

    if (confpass != createpass) {
        //passwords don't match
        alert("passwords do not match");
    }

    const reponse = await apiRequest("/api/createAccount.php", { createuser, createpass, confpass });

}

function createContact() {

}

function deleteContact() {

}

function searchContacts() {
    // display dyanmic table growing with result matches
    // look into innerHTML
}