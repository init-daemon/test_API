const API_URL = "https://jsonplaceholder.typicode.com/";
function addUserToTable(user) {
    const tableBody = document.getElementById("user-list");

    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>
            <button class="btn btn-primary btn-sm" onclick="editUser(${user.id})" data-bs-target="#modal-edit-user" data-bs-toggle="modal">Modifier</button>
            <button class="btn btn-danger btn-sm" onclick="destroy(${user.id})">Supprimer</button>
        </td>
    `;
}

function fetchAndDisplayUsers() {
    document.getElementById("user-list").innerHTML = "";
    fetch(API_URL + "users/")
        .then(response => response.json())
        .then(data => {
            const users = data;
            for (const user of users) {
                addUserToTable(user);
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données depuis l\'API', error);
        });
}

const getUserDataById = async function (userId) {
    let data = null;
    try {
        let response = await fetch(API_URL + "users/" + userId)
        if (response.ok) {
            data = await response.json();
        } else {
            console.error('retour du server:', response.status)
        }
    } catch (e) {
        console.log(e)
    }
    return data
}

async function editUser(userId) {
    console.log(userId)
    const userToEdit = await getUserDataById(userId)
        .then(d => {
            console.log("d", d)
            document.getElementById("user-id-to-edit").value = d.id;
            document.getElementById("edit-name").value = d.name;
            document.getElementById("edit-email").value = d.email;
        })
        .catch(e => console.error(e));
    console.log("userToEdit", userToEdit)
}

async function edit(id, data) {

    fetch(API_URL + "users/" + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            fetchAndDisplayUsers();
            console.log('modifié avec succès');
        })
        .catch(error => {
            console.error('Erreur lors de l\'ajout de l\'utilisateur', error);
        });
}

async function destroy(id) {
    fetch(API_URL + "users/" + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(() => {
            fetchAndDisplayUsers();
        })
}

function save() {
    edit(document.getElementById("user-id-to-edit").value, {
        "name": document.getElementById("edit-name").value,
        "email": document.getElementById("edit-email").value
    })
}