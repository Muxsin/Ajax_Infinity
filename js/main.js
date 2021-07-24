let users = document.querySelector("#users");
let unknown = document.querySelector("#unknown");
let create_resource = document.querySelector("#create-resource");
let users_table = document.querySelector(".users-table");
let unknown_table = document.querySelector(".unknown-table");
let chosen_user = document.querySelector(".chosen-user");
let chosen_user_info = document.querySelector(".chosen-user-info");
let creating_form = document.querySelector(".creating-form");
let items = document.querySelectorAll(".items");
let items_user = document.querySelector(".items-user");
let advertising = document.querySelector(".advertising");

// Active style
let lists = document.querySelector(".lists");

lists.onclick = (e) => {
  if (e.target.className == "list-items") {
    let li = lists.querySelectorAll(".list-items");
    for (i in li) {
      li[i].className = "list-items";
    }
    e.target.className += " active";
  }
};

//AJAX geting users
let xhttpUsers = new XMLHttpRequest();

xhttpUsers.onload = () => {
  let data = JSON.parse(xhttpUsers.responseText);
  for (let i = 0; i < data.data.length; i++) {
    let id = data.data[i].id;
    let first_name = data.data[i].first_name;
    let last_name = data.data[i].last_name;
    let email = data.data[i].email;
    if (i % 2 == 0) {
      users_table.innerHTML += `
            <tr class="user-table odd">
            <td class="id">${id}</td>
            <td class="first">${first_name}</td>
            <td class="last">${last_name}</td>
            <td class="email">${email}</td>
            <td class="avatar hide">${data.data[i].avatar}</td>
            </tr>`;
    } else {
      users_table.innerHTML += `
            <tr class="user-table even">
            <td class="id">${id}</td>
            <td class="first">${first_name}</td>
            <td class="last">${last_name}</td>
            <td class="email">${email}</td>
            <td class="avatar hide">${data.data[i].avatar}</td>
            </tr>`;
    }
  }
};

xhttpUsers.open("GET", "https://reqres.in/api/users", true);
xhttpUsers.send();

//AJAX geting unknown data
let xhttpUnknown = new XMLHttpRequest();

xhttpUnknown.onload = () => {
  let data = JSON.parse(xhttpUnknown.responseText);
  for (let i = 0; i < data.data.length; i++) {
    let id = data.data[i].id;
    let name = data.data[i].name;
    let year = data.data[i].year;
    let color = data.data[i].color;
    let pantone_value = data.data[i].pantone_value;
    if (i % 2 == 0) {
      unknown_table.innerHTML += `
            <tr class="unknown-table odd">
            <td class="id">${id}</td>
            <td class="name">${name}</td>
            <td class="year">${year}</td>
            <td class="color">${color}</td>
            <td class="pantone_value">${pantone_value}</td>
            </tr>`;
    } else {
      unknown_table.innerHTML += `
            <tr class="unknown-table even">
            <td class="id">${id}</td>
            <td class="name">${name}</td>
            <td class="year">${year}</td>
            <td class="color">${color}</td>
            <td class="pantone_value">${pantone_value}</td>
            </tr>`;
    }
  }
};

xhttpUnknown.open("GET", "https://reqres.in/api/unknown", true);
xhttpUnknown.send();

//AJAX creating resource

function requestCreateResource() {
  let xhttpCreateResource = new XMLHttpRequest();

  xhttpCreateResource.onload = () => {
    let data = JSON.parse(xhttpCreateResource.responseText);
    let name = data.name;
    let job = data.job;
    let id = data.id;
    let createdAt = data.createdAt;
    chosen_user.innerHTML = `<div style="margin: 15px;">
    <p><b>id: </b>${id}</p>
    <p><b>name: </b>${name}</p>
    <p><b>job: </b>${job}</p>
    <p><b>createdAt: </b>${createdAt}</p>
    </div>`;
  };

  xhttpCreateResource.open("POST", "https://reqres.in/api/users", true);
  xhttpCreateResource.setRequestHeader("Content-Type", "application/json");
  xhttpCreateResource.send('{"name":"morpheus","job":"leader"}');
}

// Lists
users.onclick = () => {
  users_table.classList.remove("hide");
  unknown_table.classList += " hide";
  creating_form.classList += " hide";
};

unknown.onclick = () => {
  unknown_table.classList.remove("hide");
  users_table.classList += " hide";
  creating_form.classList += " hide";
};

create_resource.onclick = () => {
  creating_form.classList.remove("hide");
  users_table.classList += " hide";
  unknown_table.classList += " hide";
};

//Login and Register
let register_btn = document.querySelector("#register-btn");
let login_btn = document.querySelector("#login-btn");
let loginEmptyFiled = document.querySelector(".loginEmptyField");

login_btn.onclick = () => {
  let xhttpLogin = new XMLHttpRequest();
  let emailInput = document.querySelector("#email");
  let passwordInput = document.querySelector("#password");
  if (emailInput.value === "" || passwordInput.value === "") {
    loginEmptyFiled.classList.remove("hide");
  } else {
    loginEmptyFiled.classList += " hide";
    xhttpLogin.onreadystatechange = () => {
      if (xhttpLogin.readyState === 4 && xhttpLogin.status === 200) {
        advertising.innerHTML = `<center><h2 style="color: rgb(82, 59, 235);margin-bottom: 0;">Loged in</h2></center><hr style="border: 0.6px solid rgb(223, 223, 223)"><p style="margin-top: 5px;" align="center"><b>Token: </b>${
          JSON.parse(xhttpLogin.responseText).token
        }</p>`;
        let user_table = document.querySelectorAll(".user-table");
        let ind = 0;
        for (let i = 0; i < user_table.length; i++) {
          if (
            user_table[i].querySelector(".email").textContent ===
            emailInput.value
          ) {
            ind = i;
            break;
          }
        }
        for (let i = 0; i < items.length; i++) {
          items[i].classList += " hide";
        }
        items_user.classList.remove("hide");

        items_user.innerHTML = `
                <div class="user">
                    <div class="user-avatar">
                        <img src="${
                          user_table[ind].querySelector(".avatar").textContent
                        }" alt="avatar">
                    </div>
                    <div class="user-info">
                        <h3>${
                          user_table[ind].querySelector(".first").textContent
                        } ${
          user_table[ind].querySelector(".last").textContent
        }</h3>
                        <p>${
                          user_table[ind].querySelector(".email").textContent
                        }</p>   
                        <p class="token hide">${
                          JSON.parse(xhttpLogin.responseText).token
                        }</p>
                    </div>
                </div>
                `;
      }
    };
    xhttpLogin.open("POST", "https://reqres.in/api/login", true);
    xhttpLogin.setRequestHeader("Content-Type", "application/json");
    xhttpLogin.send(
      `{"email":"${emailInput.value}","password":"${passwordInput.value}"}`
    );
  }
};

register_btn.onclick = () => {
  let emailInput = document.querySelector("#email");
  let passwordInput = document.querySelector("#password");
  let xhttpRegister = new XMLHttpRequest();
  if (emailInput.value === "" || passwordInput.value === "") {
    loginEmptyFiled.classList.remove("hide");
  } else {
    loginEmptyFiled.classList += " hide";
    xhttpRegister.open("POST", "https://reqres.in/api/register", true);
    xhttpRegister.onreadystatechange = () => {
      if (xhttpRegister.readyState === 4 && xhttpRegister.status === 200) {
        console.log(xhttpRegister.responseText);
        advertising.innerHTML = `<center><h2 style="color: rgb(82, 59, 235);margin-bottom: 0;">Registered</h2></center><hr style="border: 0.6px solid rgb(223, 223, 223)"><p style="margin-top: 5px; margin-bottom: 5px;" align="center"><b>Id: </b>${
          JSON.parse(xhttpRegister.responseText).id
        }</p><p style="margin-top: ;" align="center"><b>Token: </b>${
          JSON.parse(xhttpRegister.responseText).token
        }</p>`;
      }
    };
    xhttpRegister.setRequestHeader("Content-Type", "application/json");
    xhttpRegister.send(
      `{"email":"${emailInput.value}","password":"${passwordInput.value}"}`
    );
  }
};

//User chosen

users_table.onclick = (e) => {
  if (
    e.target.className === "user-table odd" ||
    e.target.className === "user-table even" ||
    e.target.parentNode.className === "user-table odd" ||
    e.target.parentNode.className === "user-table even"
  ) {
    let parent = e.target.parentNode;
    advertising.innerHTML = `
            <p class="p-img"><img src="${
              parent.querySelector(".avatar").textContent
            }" alt="avatar"></p>
            <h3>${parent.querySelector(".first").textContent} ${
      parent.querySelector(".last").textContent
    }</h3>
            <p>${parent.querySelector(".email").textContent}</p>
        `;
  }
};

//Create resource

let create = document.querySelector("#create");
let createEmptyError = document.querySelector(".createEmptyError");

create.onclick = function (e) {
  e.preventDefault();
  let create_name = document.querySelector("#create-name");
  let create_job = document.querySelector("#create-job");
  let xhttpCreate = new XMLHttpRequest();
  if (create_name.value === "" || create_job.value === "") {
    createEmptyError.classList.remove("hide");
  } else {
    createEmptyError.classList += " hide";
    xhttpCreate.onreadystatechange = () => {
      if (xhttpCreate.readyState === 4 && xhttpCreate.status === 201) {
        console.log(xhttpCreate.responseText);
        advertising.innerHTML = `<center><h2 style="color: rgb(82, 59, 235);margin-bottom: 0;">Created</h2></center><hr style="border: 0.6px solid rgb(223, 223, 223)"><p style="margin-top: 5px; margin-bottom: 5px;" align="center"><b>Id: </b>${
          JSON.parse(xhttpCreate.responseText).id
        }</p><p style="margin-top: 0; margin-bottom: 5px;" align="center"><b>Name: </b>${
          JSON.parse(xhttpCreate.responseText).name
        }</p><p style="margin-top: 0; margin-bottom: 5px;" align="center"><b>Job: </b>${
          JSON.parse(xhttpCreate.responseText).job
        }</p><p style="margin-top: 0; margin-bottom: 5px;" align="center"><b>CreatedAt: </b>${
          JSON.parse(xhttpCreate.responseText).createdAt
        }</p>`;
      }
    };
    xhttpCreate.open("POST", "https://reqres.in/api/users", true);
    xhttpCreate.setRequestHeader("Content-Type", "application/json");
    xhttpCreate.send(
      `{"name":"${create_name.value}","job":"${create_job.value}"}`
    );
  }
};
