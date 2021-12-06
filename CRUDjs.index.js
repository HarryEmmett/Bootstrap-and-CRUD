"use strict";

const getOutput = document.querySelector("section#create");

const getAllUser = () => {
    axios  //list all users
    .get("https://reqres.in/api/users?page=2")
    .then(res => {
        const results = res.data.data;

        for (let user of results) {
        // const duckCol = document.createElement("div");
        // duckCol.classList.add("col");

        const userContainer = document.createElement("div");    
        const userId = document.createElement("p");
        userId.innerText = `ID: ${user.id}`;
        userContainer.appendChild(userId);
        const duckCard = document.createElement("div");
        duckCard.classList.add("card");

        const email = document.createElement("p");
        email.innerText = `Email: ${user.email}`;
        userContainer.appendChild(email);

        const firstName = document.createElement("p");
        firstName.innerText = `First Name: ${user.first_name}`;
        userContainer.appendChild(firstName);

        const lastName = document.createElement("p");
        lastName.innerText = `Last Name: ${user.last_name}`;
        userContainer.appendChild(lastName);

        const avatar = document.createElement("p");
        avatar.innerText = `Avatar: ${user.avatar}`;
        userContainer.appendChild(avatar);

        console.log(userContainer);
            
        getOutput.appendChild(userContainer);
        }    
    })
    .catch(err => console.error(err));
}

const getOneUser = () => {
    axios //list one user
    .get("https://reqres.in/api/users/2")
    .then(res => {
        const user = res.data.data;
        console.log(user);

        const userContainer = document.createElement("div");    
        const userId = document.createElement("p");
        userId.innerText = `ID: ${user.id}`;
        userContainer.appendChild(userId);

        const email = document.createElement("p");
        email.innerText = `Email: ${user.email}`;
        userContainer.appendChild(email);

        const firstName = document.createElement("p");
        firstName.innerText = `First Name: ${user.first_name}`;
        userContainer.appendChild(firstName);

        const lastName = document.createElement("p");
        lastName.innerText = `Last Name: ${user.last_name}`;
        userContainer.appendChild(lastName);

        const avatar = document.createElement("p");
        avatar.innerText = `Avatar: ${user.avatar}`;
        userContainer.appendChild(avatar);
            
        getOutput.appendChild(userContainer);
    })    
    .catch(err => console.error(err));
}

document.querySelector("#CRUDform").addEventListener("submit", function(event) {
    event.preventDefault();

    console.log("THIS:", this);

    const form = this;

    console.log("Name: ", form.firstName);
    console.log("Job: ", form.job);

    const data = {
        name: form.firstName.value,
        job: form.job.value,
    };

    console.log("DATA: ", data);

axios //create user
.post("https://reqres.in/api/users", data)
.then(res => {
    form.reset(); // resets the form
    form.firstName.focus(); // puts the cursor in the name field
    console.log(res);

})    
.catch(err => console.error(err));
});

document.querySelector("#deleteForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const form = this;

    const Id = form.Id.value;
    axios
        .delete(`https://reqres.in/api/users/${Id}`)
        .then(res => {
            console.log(res);
            getAllUser();
            form.reset();
            form.Id.focus();
            
  
        })
        .catch(err => console.error(err));
});

document.querySelector("#registerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const form2 = this;

    const data2 = {
        email: form2.email.value,
        password: form2.password.value,
    };

    axios 
    .post("https://reqres.in/api/register", data2)
    .then(res => {
        getAllUser();
        getOneUser();
        form2.reset();
        form2.email.focus();
        console.log(res);

        const user = res.data.data;
        console.log(user);



    })    
    .catch(err => console.error(err));
});

getAllUser();