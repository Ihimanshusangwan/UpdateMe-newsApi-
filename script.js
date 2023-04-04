let apiKey = "674d9c270afcda2d0a1bd7fb78d83afb";
let getData = async () => {
  document.getElementById("spinner").innerHTML = `<div class="d-flex justify-content-center mt-4" id="loading-spinner">
   <div class="spinner-border" role="status">
     <span class="sr-only">Loading...</span>
   </div>
 </div>`;

  await fetch(`https://gnews.io/api/v4/top-headlines?category=general&lang=en&uscountry=&max=10&apikey=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      let articles = data.articles;
      console.log(articles);
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
      document.getElementById("spinner").innerHTML = "";
    })
}
getData();

document.querySelectorAll(".cat-select-btn").forEach((e) => {
  e.addEventListener("click", () => {
    document.getElementById("spinner").innerHTML = `<div class="d-flex justify-content-center mt-4" id="loading-spinner">
   <div class="spinner-border" role="status">
     <span class="sr-only">Loading...</span>
   </div>
 </div>`;
    fetch(`https://gnews.io/api/v4/top-headlines?category=${e.value}&lang=en&uscountry=&max=10&apikey=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        let articles = data.articles;
        console.log(articles);
        document.getElementById("main-container").innerHTML = "";
        for (let i in articles) {
          if (articles[i].image != null) {
            const container = document.getElementById("main-container");
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
        document.getElementById("spinner").innerHTML = "";
      })
  });
});
document.getElementById("search-btn").addEventListener("click",(e)=>{
  e.preventDefault();
  let keyword = document.getElementById("search-box").value;
  document.getElementById("spinner").innerHTML = `<div class="d-flex justify-content-center mt-4" id="loading-spinner">
   <div class="spinner-border" role="status">
     <span class="sr-only">Loading...</span>
   </div>
 </div>`;
 

    fetch(`https://gnews.io/api/v4/search?q=${keyword}&lang=en&country=us&max=10&apikey=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        let articles = data.articles;
        console.log(articles);
        document.getElementById("main-container").innerHTML = "";
        for (let i in articles) {
          if (articles[i].image != null) {
            const container = document.getElementById("main-container");
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
        document.getElementById("spinner").innerHTML = "";
        if(document.getElementById("main-container").innerHTML ==""){
          document.getElementById("main-container").innerHTML = `<p class="h4" style="color: red;">Can't Fetch news for <span style="color: blue;">${keyword}</span> currently, try again later...</p>`;
        }
      })
})