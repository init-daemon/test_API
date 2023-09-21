function fetchAndDisplayUsers() {

    fetch('https://jsonplaceholder.typicode.com/users')
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

fetchAndDisplayUsers();

function addUserToTable(user) {
    const tableBody = document.getElementById("user-list");

    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>
            <button class="btn btn-primary btn-sm" onclick="editUser(${user.id})" data-bs-target="#modal-edit-user" data-bs-toggle="modal">Modifier</button>
            <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Supprimer</button>
        </td>
    `;
}


const getUserDataById = async function () {
    const data = null;
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/users/1')
        if (response.ok) {
            let data = await response.json();
        } else {
            console.error('retour du server:', response.status)
        }
    } catch (e) {
        console.log(e)
    }
    return data
}

//modification des données 
async function editUser(userId) {

    const userToEdit = await getUserDataById(userId)
        .then(d => {
            console.log("d", d)
            document.getElementById("edit-name").value = d.name;
            document.getElementById("edit-email").value = d.email;
        })
        .catch(e => console.error(e));
    console.log("userToEdit", userToEdit)
}


//supprimer utilisateur
function deleteUser(userId) {

}

//ajout d'utilisateur au tableau
// addUserToTable(userData);

// document.getElementById("add-user").addEventListener("submit", function (event) {
//     event.preventDefault();


//     const name = document.getElementById("name").value;
//     const email = document.getElementById("email").value;

//     const newUser = {
//         name: name,
//         email: email,

//     };

//     fetch('https://jsonplaceholder.typicode.com/users', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newUser),
//     })
//         .then(response => response.json())
//         .then(data => {
//             console.log('Nouvel utilisateur ajouté:', data);

//             document.getElementById("add-user").reset();
//         })
//         .catch(error => {
//             console.error('Erreur lors de l\'ajout de l\'utilisateur', error);
//         });
// });

