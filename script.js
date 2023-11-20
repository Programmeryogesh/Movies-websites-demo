let count = 1;
async function fetchMovieData() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjJiYjkyY2FhZTcwMWE4Nzc0NjNmZWNmOWM3OTEyZCIsInN1YiI6IjY1NTdhYTEwMjI5MzFhMDExYzk2M2ZkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p3uQX7YSWIEC4_4Y9oJF9nmUJa5gI0kn9nJM9J98sEE",
    },
  };
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${count}`,
      options
    );
    const result = await response.json();

    const movies = result.results;

    // console.log(movies);

    displayMovies(movies);

    return result;
  } catch (error) {
    console.error(error);
  }
}

function displayMovies(movies) {
  const movieListElement = document.getElementById("movieList");

  movies.forEach((movie) => {
    let listItem = document.createElement("div");
    listItem.classList.add("movie_card");
    movieListElement.appendChild(listItem);

    let div = document.createElement("div");
    div.classList.add("cover-img");

    let img = document.createElement("img");
    div.appendChild(img);
    listItem.appendChild(div);

    let title = document.createElement("div");
    title.classList.add("title");
    listItem.appendChild(title);

    let type = document.createElement("div");
    type.classList.add("type");
    listItem.appendChild(type);

    let genre = document.createElement("p");
    type.appendChild(genre);

    let year = document.createElement("p");
    type.appendChild(year);
    const imagePath = movie.backdrop_path;

    const baseUrl = "https://image.tmdb.org/t/p/w500/";
    img.setAttribute("src", baseUrl + imagePath);

    title.innerHTML = movie.title;
    genre.innerHTML = "Release";
    year.innerHTML = movie.release_date;
  });
}
fetchMovieData();

function nextPage() {
  count++;
  clearData() 
  fetchMovieData();
}

function PrePage() {
  if (count > 1) {
    count--;
    clearData() 
    fetchMovieData();
  }
}

function clearData() {
  const movieListElement = document.getElementById("movieList");
  movieListElement.innerHTML = "";
}
// <------------------------------------------------------------------------------------------------------------------->
async function searchMovies() {
  const searchInput = document.getElementById("searchInput");
  const searchTerm = searchInput.value.trim();

  if (searchTerm === "") {
    alert("Please enter a movie title.");
    return;
  }

  const apiKey = "262bb92caae701a877463fecf9c7912d";
  const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=${apiKey}&append_to_response=videos`;

  try {
    const response = await fetch(apiUrl);
    const result = await response.json();
    if (result.results && result.results.length > 0) {
      const movies = result.results;
      displayShowMovies(movies);
    } else {
      alert("No results found for the given search term.");
    }
    
  } catch (error) {
    console.error(error);
  }
}
let home = document.getElementById("home");

function displayShowMovies(movies) {
  clearData();
  displayMovies(movies) ;
  home.style.display = "block";
}
const homePageUrl = "index.html";
function redirectToHomePage() {
  window.location.href = homePageUrl;
}
home.addEventListener('click' ,redirectToHomePage)