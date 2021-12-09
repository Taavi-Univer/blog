let postsArray = [];
const title = document.getElementById("title");
const body = document.getElementById("body");
const form = document.getElementById("new-blog");

function renderPosts() {
  let list = "";
  for (let post of postsArray) {
    list += `<h2>${post.title}</h2> 
        <p>${post.body}</p>
        <hr />
        `;
  }

  document.getElementById("container").innerHTML = list;
}

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((data) => {
    postsArray = data.slice(0, 5);
    renderPosts();
  });

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const titleText = title.value;
  const bodyText = body.value;

  const post = { title: titleText, body: bodyText };

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "Content-TYpe": "application/json",
    },
  })
    .then((response) => response.json())
    .then((post) => {
      postsArray.unshift(post);
      renderPosts();

      form.reset();
    });
});
