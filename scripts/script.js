const jimFans = {};
jimFans.API_KEY = '08c738a8ee4d96edd5457b76330ce05c';
jimFans.BASE_URL = 'https://api.themoviedb.org/3/';
jimFans.IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

// * * * * SET UP JIM CARREY MOVIE LIST
jimFans.jimCarreyFilms = [
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

// * * * * WORKING LOOP OF FILMS
jimFans.addMovies = function(query) {
	jimFans.jimCarreyFilms.forEach(function(film) {
		$.ajax({
			// url: 'https://cors-anywhere.herokuapp.com/',
			url: `${jimFans.BASE_URL}movie/${film}?api_key=${jimFans.API_KEY}&language=en-US`,
			method: 'GET',
			dataType: 'json',
			data: {
				key: `${jimFans.API_KEY}`,
				format: 'json',
				q: query
				// params: {
				// 	token: jimFans.API_KEY
				// }
			}
		}).then(function(response) {
			jimFans.displayFilms(response.film);
			console.log(response.film);
		});
	});
};

// * * * * DISPLAY FILMS
jimFans.displayFilms = function(film) {
	$('#selected-movies').empty();
	film.forEach(function(films) {
		const title = $('<h2>').text(films.title);
		$('#selected-movies').append(title);
	});
};

// * * * * BUTTONS
jimFans.buttons = function() {
	$('.choice').on('click', function() {
		$('html, .main').animate({
			scrollTop: $('.main').offset().top
		});
	});
};

// * * * * INIT PIECES
jimFans.init = function() {
	jimFans.buttons();
	jimFans.addMovies();
};

// * * * * DOCUMENT READY
$(() => {
	jimFans.init();
}); // * * * * END OF DOCUMENT READY
