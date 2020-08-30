// * * * * JIM CARREY PERSON
// https://api.themoviedb.org/3/person/206?api_key=08c738a8ee4d96edd5457b76330ce05c&language=en-US

// * * * * SET UP DOTENV
// dotenv = require('dotenv').config();

const jimCarreyGifs = [
	'https://media.giphy.com/media/nU704Y2jeFOHm/giphy.gif',
	'https://media.giphy.com/media/y8fXirTJjj6E0/giphy.gif',
	'https://media.giphy.com/media/xUPGcimWgSiwEVrAvS/giphy.gif',
	'https://media.giphy.com/media/i7VDODCiFobCg/giphy.gif',
	'https://media.giphy.com/media/xTiTnwbEerhszYMTYY/giphy.gif',
	'https://media.giphy.com/media/ahZZZZFGLGhvq/giphy.gif',
	'https://media.giphy.com/media/REiJphYIQy13i/giphy.gif',
	'https://media.giphy.com/media/P2Hy88rAjQdsQ/giphy.gif'
];

catchGif(jimCarreyGifs)
	.then((response) => {
		console.log('YOU GOT IT');
	})
	.catch((error) => {
		console.log('Did not work');
		console.log(error);
	});

async function catchGif(jimCarreyGifs) {
	for (let jimCarreyGif of jimCarreyGifs) {
		const response = await fetch(jimCarreyGif);
		const blob = await response.blob();
		const img = document.createElement('img');
		img.src = URL.createObjectURL(blob);
		img.alt = 'Jim Carrey Excited Movie Scene';
		document.body.append(img);
	}
}

// let list = document.createElement('ul');
// let fragment = document.createDocumentFragment();

// jimCarreyFilms.forEach(function(film) {
// 	let li = document.createElement('li');
// 	li.textContent = film;
// 	fragment.appendChild(li);
// });

// list.appendChild(fragment);

// const moviesContainer = document.querySelector('#selected-films');
// moviesContainer.appendChild(list);

// document.body.onload = addElement;

// * * * * WORKING API SETUP
function movieList() {
	let url = `${BASE_URL}movie/${jimCarreyFilms}?api_key=${API_KEY}&language=en-US`;
	// let image = `${IMAGE_URL}${data.poster_path}`;
	fetch(url)
		.then((response) => {
			if (!response.ok) {
				throw Error('OOOOOOOOOPs');
			}
			return response.json();
		})
		.then((data) => {
			console.log(data);
			// console.log('Working?');
			console.log(data.original_title);
			console.log(data.overview);
			console.log(data.release_date);
			// console.log(data.vote_average);
			// moviesContainer.innerHTML = JSON.stringify(data.overview);
		})
		.catch(function(err) {
			alert(err);
		});
}

movieList();

// * * * * SET UP DOM ELEMENTS
const searchInput = document.querySelector('#search-label');
const searchButton = document.querySelector('#search');
const IMAGE_PLACEHOLDER = 'https://via.placeholder.com/500';
let INITIAL_SEARCH_VALUE = null;

// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await

// * * * * TRYING TO CREATE THE MOVIE CONTAINER IN HTML
// function createMovieContainer(data) {
// 	const template = `
//         <div class="movie" >
// 			<img src="http://image.tmdb.org/t/p/w342/3XJKBKh9Km89EoUEitVTSnrlAkZ.jpg" alt="Bruce Almighty">
// 			<p class="title">${data.original_title}</p>
// 			<p class="rating">${data.vote_average}</p>
// 			<p class="overview">${data.overview}</p>
// 		</div>
//     `;

// 	moviesContainer.innerHTML = template;
// 	return moviesContainer;
// }

// * * * * THE URL FOR ACE VENTURA
// let url = `https://api.themoviedb.org/3/movie/3049?api_key=08c738a8ee4d96edd5457b76330ce05c&language=en-US`;

// function searchMovies(keyword) {
// 	let searchURL = `${BASE_URL}search/movie?api_key=${API_KEY}&query=${keyword}`;
// 	fetch(searchURL).then((result) => result.json()).then((data) => {
// 		document.getElementById('selected-films').innerHTML = JSON.stringify(data, null, 4);
// 	});

// 	// let searchInput = document.getElementById('search-label');
// }

// document.addEventListener('DOMContentLoaded', setup);

// // * * * * ERROR HANDLING

// * * * * SEARCH MOVIES
searchButton.onclick = function(event) {
	event.preventDefault();
	const value = searchInput.value;

	if (value) {
		searchMovie(value);
		console.log(value);
	}
	resetInput();
};

// * * * * RESET SEARCH
function resetInput() {
	searchInput.value = '';
}

function searchMovie(value) {
	const url = generateMovieDBUrl('/search/movie') + '&query=' + value;
	requestMovies(url, renderSearchMovies, handleGeneralError);
}

function renderMovies(data) {
	const moviesBlock = generateMoviesBlock(data);
	const header = createSectionHeader(this.title);
	moviesBlock.insertBefore(header, moviesBlock.firstChild);
	moviesContainer.appendChild(moviesBlock);
}

function renderSearchMovies(data) {
	moviesSearchable.innerHTML = '';
	const moviesBlock = generateMoviesBlock(data);
	moviesSearchable.appendChild(moviesBlock);
}

// * * * * CREATE DOM ELEMENTS
function createMovieContainer(section) {
	const movieElement = document.createElement('div');
	movieElement.setAttribute('class', 'movie');

	const template = `
        <div class="content">
            <p id="content-close">X</p>
        </div>
    `;

	movieElement.innerHTML = template;
	movieElement.insertBefore(section, movieElement.firstChild);
	return movieElement;
}

function createImageContainer(imageUrl, id) {
	const tempDiv = document.createElement('div');
	tempDiv.setAttribute('class', 'imageContainer');
	tempDiv.setAttribute('data-id', id);

	const movieElement = `
        <img src="${imageUrl}" alt="" data-movie-id="${id}">
    `;
	tempDiv.innerHTML = movieElement;

	return tempDiv;
}

function createSectionHeader(title) {
	const header = document.createElement('h2');
	header.innerHTML = title;

	return header;
}

function generateMoviesBlock(data) {
	const movies = data.results;
	const section = document.createElement('section');
	section.setAttribute('class', 'section');

	for (let i = 0; i < movies.length; i++) {
		const { poster_path, id } = movies[i];

		if (poster_path) {
			const imageUrl = MOVIE_DB_IMAGE_ENDPOINT + poster_path;

			const imageContainer = createImageContainer(imageUrl, id);
			section.appendChild(imageContainer);
		}
	}

	const movieSectionAndContent = createMovieContainer(section);
	return movieSectionAndContent;
}

// * * * * INIT
searchMovie(INITIAL_SEARCH_VALUE);
