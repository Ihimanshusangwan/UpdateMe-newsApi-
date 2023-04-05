// let apiKey = "674d9c270afcda2d0a1bd7fb78d83afb";
// let apiKey= "70f8078651a94f7b9e916bd1d49c2453";
let apiKeys = ["674d9c270afcda2d0a1bd7fb78d83afb","70f8078651a94f7b9e916bd1d49c2453"];
let apiKey = apiKeys[0];
let default_lang = "en";

const load_spinner = ()=>{
  document.getElementById("spinner").innerHTML = `<div class="d-flex justify-content-center mt-4" id="loading-spinner">
   <div class="spinner-border" role="status">
     <span class="sr-only">Loading...</span>
   </div>
 </div>`;
};

const hide_spinner = ()=>{
  document.getElementById("spinner").innerHTML = "";
};

const empty_container = ()=>{
  document.getElementById("main-container").innerHTML ="";
};

let show_fetched_data = (data)=>{
  empty_container();
  let articles = data.articles;
  // console.log(articles);
      for (let i in articles) {
        if (articles[i].image != null) {
          const container = document.getElementById("main-container")
          container.innerHTML += `<div class="card m-2 mt-3" style="width: 18rem;">
            <img src="${articles[i].image}" class="card-img-top" alt="">
            <div class="card-body">
              <h5 class="card-title">${articles[i].title}</h5>
              <p class="card-text">${articles[i].content}</p>
            </div>        
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Date: ${articles[i].publishedAt.slice(0, 10)} Time: ${articles[i].publishedAt.slice(12, 16)} </li>
              <li class="list-group-item">Source: ${articles[i].source.name}</li>
            </ul>
            <div class="card-body">
              <a href="${articles[i].url}" class="card-link">Read more</a>
            </div>
            </div>`;
        }
      }
      hide_spinner();
};

let changeApiKey = (response)=>{
  if(response.status == 403){
    apiKey = apiKeys[1];
    throw Error;
  }
};

const getData = async () => {
  load_spinner();
  await fetch(`https://gnews.io/api/v4/top-headlines?category=general&lang=${default_lang}&uscountry=&max=10&apikey=${apiKey}`)
    .then((response) => { 
      changeApiKey(response);
      return response.json();
    })
    .then((data) => {
      show_fetched_data(data);
    })
    .catch((Error)=>{
      getData();
    })
}
getData();

document.querySelectorAll(".lang-change-btn").forEach((e)=>{
  e.addEventListener("click",()=>{
    load_spinner();
    default_lang = e.value;
    empty_container();
    getData();
  })
});

document.getElementById("home").addEventListener("click",()=>{
  load_spinner();
  empty_container();
  getData();
});

document.querySelectorAll(".cat-select-btn").forEach((e) => {
  e.addEventListener("click", () => {
    load_spinner();
    fetch(`https://gnews.io/api/v4/top-headlines?category=${e.value}&lang=${default_lang}&uscountry=&max=10&apikey=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        show_fetched_data(data);
      })
  });
});

document.getElementById("search-btn").addEventListener("click",(e)=>{
  e.preventDefault();
  let keyword = document.getElementById("search-box").value;
  load_spinner();
    fetch(`https://gnews.io/api/v4/search?q=${keyword}&lang=${default_lang}&country=&max=10&apikey=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        show_fetched_data(data);
        if(document.getElementById("main-container").innerHTML ==""){
          document.getElementById("main-container").innerHTML = `<p class="h4" style="color: red;">Can't Fetch news for <span style="color: blue;">${keyword}</span> currently, try again later...</p>`;
        }
      })
})