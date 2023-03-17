const key = "c31e8d0f";
const moviesTitle = [];
const searchBtn = document.getElementById('search-btn');
const getSearch = document.getElementById('search-input');
const movieDiv = document.getElementById('hold');

searchBtn.addEventListener("click",()=>{
    //get user searching value & remove the spacing between
    let searchText = getSearch.value.trim();
    console.log(searchText);
    
    //push first 10 movies into array
    addTitleList(searchText)
        .then(() => {  // added .then() block to wait for addTitleList() to complete
            getMoviesDetails();
        })
        .then()
})

const addTitleList = async (searchText) => {
    /* api provide a http , but it have to use https  */
    const response = await fetch(`https://www.omdbapi.com/?s=${searchText}&apikey=${key}`);
    const data = await response.json();
    for (let movie of data.Search) {
        moviesTitle.push(movie.Title);
    }
    console.log(moviesTitle);
}

const getMoviesDetails = () =>{
    console.log("test");
    let html=""
    for (let i = 0; i < moviesTitle.length ; i++){
        fetch(`https://www.omdbapi.com/?t=${moviesTitle[i]}&apikey=${key}`)
        .then(res => res.json())
        .then(data =>{
            console.log("html")
             html+=` <div class="result-container">
                
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
                            
      
                            <img class="mov-add" src="images/add.png">
                            <p class="mov-wishText">Watchlist</p>

                            <!--end mov-middle-->
                            </div>
                            <div class="mov-end">
                                <p class="mov-desc">${data.Plot}<p>
                                
                        </div>
                        <!--end mov-details-->
                    </div>
                    
             <!--end result-container-->
             </div>
             <hr>`
             movieDiv.innerHTML = html
        })//end then
    }//end for
     
}

