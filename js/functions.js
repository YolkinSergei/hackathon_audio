function fillPlayList (data) {
	trackListData = data;

	for (let index = 0; index < data.length; index++) {
		let trackItemElement = document.createElement('div');

		trackItemElement.classList.add('list-group-item');
		trackItemElement.innerText = `${data[index].artist} - ${data[index].title}`;
		trackItemElement.setAttribute('data-index', index);

		let btnPlay = document.createElement('button');
		btnPlay.classList.add('btn', 'btn-success', 'btn-xs', 'btn-track-play');
		btnPlay.innerHTML = '<i class="glyphicon glyphicon-play"></i>';
		btnPlay.setAttribute('data-index', index);
		btnPlay.addEventListener('click', onPlayTrackClick);

		let btnPause = document.createElement('button');
		btnPause.classList.add('btn', 'btn-warning', 'btn-xs', 'btn-track-pause');
		btnPause.innerHTML = '<i class="glyphicon glyphicon-pause"></i>';
		btnPause.setAttribute('data-index', index);
		btnPause.style.display = 'none';
		btnPause.addEventListener('click', onPauseTrackClick);

		trackItemElement.insertBefore(btnPause, trackItemElement.firstChild);
		trackItemElement.insertBefore(btnPlay, trackItemElement.firstChild);

		trackListElement.appendChild(trackItemElement);
	}
}

function playTrack(index) {
	if (index === null || index < 0 || index >= trackListData.length) return;

	let trackData = trackListData[index];

	if (currentTrackIndex !== index) {
		if (player.src !== '') stopTrack();

		currentTrackIndex = index;
		player.src = trackData.track;
	}

	player.play();

	let trackItemElement = document.querySelector(`[data-index="${index}"]`),
		btnPlay = trackItemElement.querySelector('.btn-track-play'),
		btnPause = trackItemElement.querySelector('.btn-track-pause');
	
	btnPlay.style.display = 'none';
	btnPause.style.display = 'inline-block';

	let btnMainPlay = mainPlayerButtons['play'];
	if (btnMainPlay) {
		btnMainPlay.innerHTML = '<i class="glyphicon glyphicon-pause"></i>';
		btnMainPlay.setAttribute('data-action', 'pause');
	}

	trackInfo.infoPanel.style.display = 'block';
	trackInfo.infoTitle.innerHTML = `<i class="glyphicon glyphicon-cd"></i> ${trackData.title}`;
	trackInfo.infoArtist.innerHTML = `<i class="glyphicon glyphicon-user"></i> ${trackData.artist}`;

	trackItemElement.classList.add('selected-track');
}

function pauseTrack(index) {
	if (index === null || index < 0) return;

	let trackItemElement = document.querySelector(`[data-index="${index}"]`),
		btnPlay = trackItemElement.querySelector('.btn-track-play'),
		btnPause = trackItemElement.querySelector('.btn-track-pause');
	
	btnPause.style.display = 'none';
	btnPlay.style.display = 'inline-block';

	let btnMainPlay = mainPlayerButtons['play'];
	if (btnMainPlay) {
		btnMainPlay.innerHTML = '<i class="glyphicon glyphicon-play"></i>';
		btnMainPlay.setAttribute('data-action', 'play');
	}
	
	player.pause();
}

function stopTrack() {
	pauseTrack(currentTrackIndex);

	let trackItemElement = document.querySelector(`[data-index="${currentTrackIndex}"]`);
	trackItemElement && trackItemElement.classList.remove('selected-track');

	player.src = '';
	player.currentTime = 0;
	currentTrackIndex = -1;

	trackInfo.infoPanel.style.display = 'none';
	trackInfo.infoTitle.innerHTML = '';
	trackInfo.infoArtist.innerHTML = '';

}

function playNextTrack(event) {
	if (currentTrackIndex >= 0 && currentTrackIndex < trackListData.length - 2) {
		playTrack(currentTrackIndex + 1);
	} else {
		stopTrack();
	}
}

function playPrevTrack(event) {
	if (currentTrackIndex > 0 && currentTrackIndex <= trackListData.length - 1) {
		playTrack(currentTrackIndex - 1);
	}
}