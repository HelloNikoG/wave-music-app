//song, name, artist and pic

import React from 'react';

//states
// const [song, setSong] = useState(chillHop());
// 	const [currentSong, setCurrentSong] = useState(song[0]);
// 	const [isPlaying, setIsPlaying] = useState(false);
// const [songInfo, setSongInfo] = useState({
//     currentTime: 0,
//     duration: 0,
// });

function LibrarySong({
	songArray,
	song,
	setCurrentSong,
	id,
	audioRef,
	isPlaying,
	setSongArray,
}) {
	const songSelectHandler = () => {
		const selectedSong = songArray.filter((state) => state.id === id);
		setCurrentSong(selectedSong[0]);
		const newSongs = songArray.map((song) => {
			if (song.id === id) {
				return {
					...song,
					active: true,
				};
			} else {
				return {
					...song,
					active: false,
				};
			}
		});
		setSongArray(newSongs);
		// setCurrentSong(song);
		if (isPlaying) {
			const playPromise = audioRef.current.play();
			if (playPromise !== undefined) {
				playPromise.then((audio) => {
					audioRef.current.play();
				});
			}
		}
	};
	return (
		<div
			onClick={songSelectHandler}
			className={`library-song ${song.active ? 'selected' : ''}`}
		>
			<img src={song.cover} alt={song.cover} />
			<div className="song-description">
				<h3>{song.name}</h3>
				<h4>{song.artist}</h4>
			</div>
		</div>
	);
}

export default LibrarySong;
