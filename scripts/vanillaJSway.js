// console.log(process.env.API_TMDB);
// * * * * SET UP JIM CARREY MOVIE LIST
const jimCarreyFilms = [
	'3049', //Ace Ventura: Pet Detective
	'9273', //Ace Ventura: When Nature Calls
	'37165', //The Truman Show
	'38', //Eternal Sunshine of the Spotless Mind
	'310', //Bruce Almighty
	'854', //The Mask
	'1850', //Man on the Moon
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
// const API_KEY = process.env.API_TMDB;
const API_KEY = '08c738a8ee4d96edd5457b76330ce05c';
const BASE_URL = 'https://api.themoviedb.org/3/';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

// * * * * ADDING FIREBASE
// const firebaseConfig = {
// 	apiKey: process.env.API_FIREBASE,
// 	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
// 	databaseURL: process.env.FIREBASE_DATABASE_URL,
// 	projectId: process.env.FIREBASE_PROJECT_ID,
// 	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
// 	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
// 	appId: '1:369164447250:web:c9cf3788d356215d22b2cb'
// };

const firebaseConfig = {
	apiKey: 'AIzaSyARgaq0T9FbER3T-toz8oZ1sAC1QRWsgC8',
	authDomain: 'jim-carrey-films.firebaseapp.com',
	databaseURL: 'https://jim-carrey-films.firebaseio.com',
	projectId: 'jim-carrey-films',
	storageBucket: 'jim-carrey-films.appspot.com',
	messagingSenderId: '369164447250',
	appId: '1:369164447250:web:c9cf3788d356215d22b2cb'
	// measurementId: 'G-ZC7T6HKZKJ'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// * * * * WORKING LOOP OF FILMS
function addElement() {
	jimCarreyFilms.forEach(function(film) {
		let url = `${BASE_URL}movie/${film}?api_key=${API_KEY}&language=en-US`;

		// * * * * DOM ELEMENTS
		const movieCard = document.createElement('div');
		movieCard.className = 'movie';

		// * * * * RETRIEVING FROM API
		fetch(url)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				movieCard.innerHTML = `
				<img class='movie-poster' src=${IMAGE_URL}${data.poster_path} alt='${data.original_title} Movie Poster'>
				<h2 class='movie-title'>${data.original_title}<h2>
				<span class='release-date'>Release Date: ${data.release_date}</span>
				<div class='movie-overview'>
					<p>${data.overview}</p>
				</div>
				<button class='choice' type='submit' id=${film} value='${data.original_title}'>Your Winner!</button>
				`;

				const moviesContainer = document.querySelector('#selected-films');
				moviesContainer.appendChild(movieCard);
			})
			.catch(function(err) {
				alert(err);
			});
	});
}

// * * * * BUTTON CLICK OPENS OVERLAY
function buttonWindow(e) {
	const movieChoice = e.target.id;
	const overlay = document.querySelector('#overlay');

	if (e.target !== e.currentTarget) {
		if (e.target.classList.contains('choice')) {
			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
			const database = firebase.database().ref(`/votes/${movieChoice}/count`);
			let counter = 0;
			let count = counter + 1;
			database.push(count);

			overlay.classList.add('open');
			return false;
		} else if (e.target.classList.contains('X')) {
			overlay.classList.remove('open');
			return false;
		} else {
			return false;
		}
	}
	return false;
}
window.addEventListener('click', buttonWindow);

// * * * * GET RANKINGS
function getData() {
	jimCarreyFilms.forEach(function(film) {
		const database = firebase.database().ref(`/votes/${film}/count`);
		const databaseTitle = firebase.database().ref(`/votes/${film}/title`);

		database.on('value', function(snapshot) {
			databaseTitle.on('value', function(childSnap) {
				let number = snapshot.numChildren();
				let title = childSnap.val();

				const rankingCard = document.createElement('div');
				rankingCard.className = 'movie-ranking';

				rankingCard.innerHTML = `
					<p>${title} <span class='visuallyhidden'>${film}</span>: ${number}</p>
					`;

				const rankingBox = document.querySelector('#rankings');
				rankingBox.appendChild(rankingCard);

				// let dataArr = [];
				// let dataArr = {
				// 	label: film.title,
				// 	value: film.number
				// };
				// console.log(dataArr);

				// addData(myChart, dataArr.label, dataArr.value);
			});
		});
	});
}

// * * * * TRYING TO SYNC

// * * * * CHART
// var ctx = document.getElementById('myChart').getContext('2d');

// let config = {
// 	type: 'horizontalBar',
// 	data: {
// 		labels: dataArr.label,
// 		datasets: [
// 			{
// 				label: '# of Votes',
// 				data: dataArr.value,
// 				backgroundColor: [ '#000' ],
// 				borderColor: [ '#d2691e' ],
// 				borderWidth: 3
// 			}
// 		]
// 	},
// 	options: {
// 		scales: {
// 			yAxes: [
// 				{
// 					ticks: {
// 						beginAtZero: true
// 					}
// 				}
// 			]
// 		}
// 	}
// };

// var myChart = new Chart(ctx, config);

// function addData(chart, label, data) {
// 	chart.data.labels.push(label);
// 	chart.data.datasets.forEach((dataset) => {
// 		dataset.data.push(data);
// 	});
// 	chart.update();
// }

// * * * * INIT
function init() {
	window.onload = addElement();
	getData();
}

document.addEventListener('DOMContentLoaded', init);

// https://console.firebase.google.com/project/jim-carrey-films/database/jim-carrey-films/data

// https://www.youtube.com/watch?v=FN_ffvw_ksE
// https://developers.themoviedb.org/3/movies/get-movie-details
// https://themoviedb.romanpaprotsky.com/js/script.js
// https://themoviedb.romanpaprotsky.com/
