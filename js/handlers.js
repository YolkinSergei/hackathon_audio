function onPlayTrackClick(event) {
	playTrack(+event.currentTarget.parentNode.dataset.index);
}

function onPauseTrackClick(event) {
	pauseTrack(+event.currentTarget.parentNode.dataset.index);
}

function onMainPlayerButtonClick(event) {
	switch (event.currentTarget.dataset.action) {
		case 'play': {
			playTrack((currentTrackIndex === null || currentTrackIndex < 0) ? 0 : currentTrackIndex);
			break;
		}
		case 'pause': {
			pauseTrack(currentTrackIndex);
			break;
		}
		case 'stop': {
			stopTrack(); 
			break;
		}
		case 'forward': {
			playNextTrack();
			break;
		}
		case 'backward': {
			playPrevTrack();
			break;
		}
	}
}

function onPlayerEnded (event) {
	playNextTrack();
}