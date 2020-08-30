// * * * * SET UP DOTENV
dotenv = require('dotenv').config();

// * * * * SET UP JIM CARREY MOVIE LIST
const jimCarreyFilms = [
	'3049', //Ace Ventura: Pet Detective
	'9273', //Ace Ventura: When Nature Calls
	'37165', //The Truman Show
	'38', //Eternal Sunshine of the Spotless Mind
	'310', //Bruce Almighty
	'854', //The Mask
	'8871', //How the Grinch Stole Christmas
	'10201', //Yes Man
	'2123', //Me, Myself & Irene
	'1624', //Liar Liar
	'414', //Batman Forever
	'9894', //The Cable Guy
	'2210', //Earth Girls Are Easy
	'8467', //Dumb and Dumber
	'454626' //Sonic the Hedgehog
];

// * * * * API VALUES
const API_KEY = process.env.API_TMDB;
const BASE_URL = 'https://api.themoviedb.org/3/';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

// * * * * WORKING LOOP OF FILMS
let fragment = document.createDocumentFragment();
// document.body.onload = addElement; //Will double the movie container

function addElement() {
	jimCarreyFilms.forEach(function(film) {
		let url = `${BASE_URL}movie/${film}?api_key=${API_KEY}&language=en-US`;

		// * * * * DOM ELEMENTS
		const movieCard = document.createElement('div');
		movieCard.setAttribute('class', 'movie');
		// movieCard.className = 'movie'; //Both of these work
		let img = document.createElement('img');
		img.className = 'movie-poster';
		let h2 = document.createElement('h2');
		h2.className = 'movie-title';
		let span = document.createElement('span');
		span.className = 'release-date';
		let p = document.createElement('p');
		p.className = 'movie-overview';

		// * * * * RETRIEVING FROM API
		fetch(url)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);

				img.src = `${IMAGE_URL}${data.poster_path}`;
				img.alt = `${data.original_title} Movie Poster`;
				h2.textContent = data.original_title;
				span.textContent = `Release Date: ${data.release_date}`;
				p.textContent = data.overview;

				fragment.appendChild(img);
				fragment.appendChild(h2);
				fragment.appendChild(span);
				fragment.appendChild(p);
				movieCard.appendChild(fragment);

				const moviesContainer = document.querySelector('#selected-films');
				moviesContainer.appendChild(movieCard);
			})
			.catch(function(err) {
				alert(err);
			});
	});
}

addElement();

// https://www.youtube.com/watch?v=FN_ffvw_ksE
// https://developers.themoviedb.org/3/movies/get-movie-details
// https://themoviedb.romanpaprotsky.com/js/script.js
// https://themoviedb.romanpaprotsky.com/
