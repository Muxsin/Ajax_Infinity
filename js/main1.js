let URL = "http://jsonplaceholder.typicode.com/posts";
let title_bar = document.querySelector(".title-bar");
let comments_bar = document.querySelector(".comments-bar");
let search = document.querySelector("#search");
let showBtn = document.querySelector("#show-btn");

showBtn.onclick = () => {
  let xhttp = new XMLHttpRequest();
  xhttp.onload = () => {
    let data = JSON.parse(xhttp.responseText);
    let id = parseInt(search.value);
    comments_bar.innerHTML = "";
    title_bar.style = "border: 1px solid silver; margin: 25px 0;";
    let titleId = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == id) {
        titleId = i;
        break;
      }
    }
    title_bar.innerHTML = `
        <div class="title"><b>${data[titleId].title}</b></div>
        <div class="body">${data[titleId].body}</div>
        `;
    a = URL + "/" + data[titleId].id + "/" + "comments";
    console.log(a);
    let xhttp1 = new XMLHttpRequest();
    xhttp1.onload = () => {
      let data1 = JSON.parse(xhttp1.responseText);
      for (let i = 0; i < data1.length; i++) {
        comments_bar.innerHTML += `
                <div class="comment">
                    <div class="comment-name">
                        ${data1[i].name}
                    </div>
                    <div class="comment-body">
                        ${data1[i].body}
                    </div>
                    <div class="comment-user">
                        <div class="user-email">
                        ${data1[i].email}
                        </div>
                    </div>
                </div>
                `;
      }
    };
    xhttp1.open("GET", `${URL}/${data[titleId].id}/comments`);
    xhttp1.send();
  };
  xhttp.open("GET", `${URL}`, true);
  xhttp.send();
};
