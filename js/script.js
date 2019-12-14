'use strict';

let trackListElement = document.querySelector('#trackListElement'),
	trackListData = [],
	currentTrackIndex = -1,
	mainPlayerButtons = {
		'play': document.querySelector('#btnPlay'),
		'stop': document.querySelector('#btnStop'),
		'backward': document.querySelector('#btnBackward'),
		'forward': document.querySelector('#btnForward')
	},
	player = new Audio(),
	trackInfo = {
		'infoTitle': document.querySelector('.info-title'),
		'infoArtist': document.querySelector('.info-artist'),
		'infoPanel': document.querySelector('.info-panel')
	};

fetch('https://audio-api-4c3da.firebaseio.com/audios.json')
.then(x => x.json())
.then(x => fillPlayList(x));

for (let btnKey in mainPlayerButtons) {
	let mainPlayerButton = mainPlayerButtons[btnKey];

	mainPlayerButton.setAttribute('data-action', btnKey);
	mainPlayerButton.addEventListener('click', onMainPlayerButtonClick);
}

player.addEventListener('ended', onPlayerEnded);