let id = document.cookie.split("; ").find(row => row.startsWith("id")).split("=")[1];

document.querySelector("#add-contact-form").addEventListener("submit", addContact);

async function addContact(event)
{
    event.preventDefault();
    
    let firstName = document.querySelector("#firstName").value;
    let lastName = document.querySelector("#lastName").value;
    let fullName = document.querySelector("#firstName").value + " " + document.querySelector("#lastName").value;

    let email = document.querySelector("#email").value;
    let phoneNumber = document.querySelector("#phone").value;
    let skills = document.querySelector("#skill").value;
    let projectLink = document.querySelector("#projectLink").value;

    if (!firstName)
    {
        document.getElementById("error").innerText = "Please enter a valid first name";
        return;
    }
    
    if (!lastName)
    {
        document.getElementById("error").innerText = "Please enter a valid last name";
        return;
    }
    
    if (!email)
    {
        document.getElementById("error").innerText = "Please enter a valid email";
        return;
    }

    if (!phone)
    {
        document.getElementById("error").innerText = "Please enter a valid phone number";
        return;
    }

    if (!skill)
    {
        document.getElementById("error").innerText = "Please enter a valid skill set";
        return;
    }

    if (!projectLink)
    {
        document.getElementById("error").innerText = "Please enter a valid project link";
        return;
    }
    
    const response = await apiRequest(
        "/LAMPAPI/add_contact.php",
        {
            id,
            fullName,
            email,
            phoneNumber,
            skills,
            projectLink
        },
        "POST"
    );

    if (response.status == 200)
    {
        if (response.data.error)
        {
            document.getElementById("error").innerText = response.data.error;
            return;
        }
        
        fullName.innerText = "";
        email.innerText = "";
        phone.innerText = "";
        skill.innerText = "";
        projectLink.innerText = "";

        document.getElementById("success").innerText = response.data;
    }
    else
    {
        document.getElementById("error").innerText = response.data;
    }
}

document.querySelector("input[type='button']").addEventListener("click", toContactManager);

function toContactManager(event)
{
    event.preventDefault();
    window.location.href = "contactManager.html";
}
