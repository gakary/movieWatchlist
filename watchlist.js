const key = "c31e8d0f";
const watchDiv = document.getElementById("watchlist_hold");
let watchList = [];
const alertDiv = document.getElementById("alert");

document.addEventListener("click", (e) => {
  if (e.target.dataset.movie) {
    const button = e.target;

    if (button.src.includes("images/add.png")) {
      handleAddWatchList(button.dataset.movie);
      button.src = "images/added.png";
    } else {
      // call handleRemoveWatchList function and pass the movie title as a parameter
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

const handleRemoveWatchList = (movieTitle) => {
  // Retrieve the watchList data from localStorage
  let watchListData = localStorage.getItem("WatchListData");

  if (watchListData) {
    // Parse the watchList data and filter out the movie with the given title
    watchList = JSON.parse(watchListData).filter(
      (movie) => movie !== movieTitle
    );

    // Store the updated watchList data back into localStorage
    localStorage.setItem("WatchListData", JSON.stringify(watchList));
  }
};

const getWatchListMoviesDetails = (array) => {
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
                            <img class="mov-add" data-movie="${data.Title}" src="images/added.png">
                            <p class="mov-wishText">Watchlist</p>
                        </div>
                        <div class="mov-end">
                            <p class="mov-desc">${data.Plot}<p>
                        </div>
                    </div>
                </div>
                <hr>`;

        renderWatchList(html);
      }); //end then
  } //end for
};

const myLocalStorageData = localStorage.getItem("WatchListData");
const myList = JSON.parse(myLocalStorageData);
getWatchListMoviesDetails(myList);

const renderWatchList = (html) => {
  watchDiv.innerHTML = html;
};
