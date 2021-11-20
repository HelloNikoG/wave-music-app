//song, name, artist and pic

// const [song, setSong] = useState(chillHop());
// 	const [currentSong, setCurrentSong] = useState(song[0]);
// 	const [isPlaying, setIsPlaying] = useState(false);
// const [songInfo, setSongInfo] = useState({
// 	currentTime: 0,
// 	duration: 0,
// });
import React from 'react';

function Song({ currentSong }) {
	return (
		<div className="song-container">
			<img src={currentSong.cover} alt={currentSong.cover} />
			<h2>{currentSong.name}</h2>
			<h3>{currentSong.artist}</h3>
		</div>
	);
}

export default Song;
