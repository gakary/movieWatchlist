const key = "c31e8d0f";
const moviesTitle = [];
const searchBtn = document.getElementById("search-btn");
const getSearch = document.getElementById("search-input");
const movieDiv = document.getElementById("hold");
let watchList = [];

document.addEventListener("click", (e) => {
  //only work for element have the data-movie
  if (e.target.dataset.movie) {
    //catch the whole element belong to this data-movie
    const button = e.target;

    if (button.src.includes("images/add.png")) {
      handleAddWatchList(button.dataset.movie);
      button.src = "images/added.png";
    } else {
      handleRemoveWatchList(button.dataset.movie);
      button.src = "images/add.png";
    }
  }
});

handleAddWatchList = (movie) => {
  //the movie is string , if want to store into localStorage , it have to convert to JSON
  let watchListData = localStorage.getItem("WatchListData");
  if (watchListData) {
    // if watchListData exists in localStorage, parse it and append new movie
    watchList = JSON.parse(watchListData);
    watchList.push(movie);
  } else {
    // if watchListData does not exist in localStorage, initialize watchList with new movie
    watchList = [movie];
  }
  localStorage.setItem("WatchListData", JSON.stringify(watchList));
};
handleRemoveWatchList = (movie) => {
  console.log("its :" + typeof movie);
  watchList = watchList.filter((movieObject) => {
    /*because when JSON string are pushed into watchList array
        this array inside all string are JSON string ,
        so that we have to using JSON.stringify to convert to json string
        to checking return by filter movieObject is that equal*/
    return movieObject.Title !== movie.Title;
  });
  localStorage.setItem("WatchListData", JSON.stringify(watchList));
};

searchBtn.addEventListener("click", () => {
  //get user searching value & remove the spacing between
  let searchText = getSearch.value.trim();
  console.log(searchText);

  //push first 10 movies into array
  addTitleList(searchText)
    .then(() => {
      // added .then() block to wait for addTitleList() to complete
      getMoviesDetails(moviesTitle);
    })
    .then();
});

const addTitleList = async (searchText) => {
  /* api provide a http , but it have to use https  */
  const response = await fetch(
    `https://www.omdbapi.com/?s=${searchText}&apikey=${key}`
  );
  const data = await response.json();
  for (let movie of data.Search) {
    moviesTitle.push(movie.Title);
  }
};
const getMoviesDetails = (array) => {
  console.log(typeof array);
  let html = "";
  for (let i = 0; i < array.length; i++) {
    console.log(array[i]);
    fetch(`https://www.omdbapi.com/?t=${array[i]}&apikey=${key}`)
      .then((res) => res.json())
      .then((data) => {
        html += `<div class="result-container">
                    <img class="mov-image" src="${data.Poster}">
                    <div class="mov-details">
                        <div class="mov-header">
                            <h3 class="mov-title">${data.Title}</h3>
                            <img class="mov-star" src="images/star.png">
                            <p class="mov-rate">${data.imdbRating}</p>
                        </div>
                        <div class="mov-middle">
                            <p class="minutes">${data.Runtime}</p>
                            <p class="authors">${data.Genre}</p>
                            <img class="mov-add" data-movie="${data.Title}" src="images/add.png">
                            <p class="mov-wishText">Watchlist</p>
                        </div>
                        <div class="mov-end">
                            <p class="mov-desc">${data.Plot}<p>
                        </div>
                    </div>
                </div>
                <hr>`;
        render(html);
      }); //end then
  } //end for
};

const render = (html) => {
  movieDiv.innerHTML = html;
};
