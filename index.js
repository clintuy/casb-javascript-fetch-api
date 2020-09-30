const content = document.querySelector('#content');
const submit = document.querySelector('#submit');
const btnUpdate = document.querySelector('#btnUpdate');


// load employee data
window.addEventListener('load', () => {
    getEmployee();
});

// add employee
submit.addEventListener('click', () => {
    addEmployee();
});

// update emloyee
btnUpdate.addEventListener('click', () => {
    updateEmployee();
});

function getEmployee() {

    let html = '';
    fetch('http://localhost:5000/api/employee/all', {
            mode: 'cors'
        })
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => {
            data.forEach((element) => {
                html += `<li>${element.first_name} ${element.last_name} <a href="javascript:void(0)" onClick="deleteEmployee(${element.id})">Delete</a> <a href="javascript:void(0)" onClick="editEmployee(${element.id})">Edit</a></li>`;
            });

            content.innerHTML = html;
        })
        .catch((error) => {
            console.log(error);
        });
}

function addEmployee() {

    let fname = document.querySelector('#fname').value;
    let lname = document.querySelector('#lname').value;
    let email = document.querySelector('#email').value;
    let gender = document.querySelector('#gender').value;

    let formData = {
        fname,
        lname,
        email,
        gender
    };

    fetch('http://localhost:5000/api/employee/', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(
            location.reload()
        )
        .catch((error) => console.log(error));
}

function editEmployee(id) {

    fetch(`http://localhost:5000/api/employee/${id}`)
        .then(res => res.json())
        .then((data) => {
            document.querySelector('#user_id').value = data[0].id,
                document.querySelector('#fname').value = data[0].first_name,
                document.querySelector('#lname').value = data[0].last_name,
                document.querySelector('#email').value = data[0].email,
                document.querySelector('#gender').value = data[0].gender

        }).catch((error) => console.log(error));


}

function updateEmployee() {

    let id = document.querySelector('#user_id').value;
    let fname = document.querySelector('#fname').value;
    let lname = document.querySelector('#lname').value;
    let email = document.querySelector('#email').value;
    let gender = document.querySelector('#gender').value;


    let formData = {
        id,
        fname,
        lname,
        email,
        gender
    };

    fetch('http://localhost:5000/api/employee', {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(
        location.reload()
    ).catch((error) => console.log(error));;
}

function deleteEmployee(id) {

    let formData = {
        id
    };
    fetch('http://localhost:5000/api/employee/', {
        method: 'DELETE',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(
        location.reload()
    ).catch((error) => console.log(error));
}