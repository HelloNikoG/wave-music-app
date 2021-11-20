import React from 'react';
import LibrarySong from './LibrarySong';

// const [song, setSong] = useState(chillHop());
// 	const [currentSong, setCurrentSong] = useState(song[0]);
// 	const [isPlaying, setIsPlaying] = useState(false);
// const [songInfo, setSongInfo] = useState({
//     currentTime: 0,
//     duration: 0,
// });

function Library({
	songArray,
	setSongArray,
	setCurrentSong,
	audioRef,
	isPlaying,
	libraryStatus,
	setLibraryStatus,
}) {
	return (
		<div className={`library ${libraryStatus ? 'active-library' : ''} `}>
			<h2>library</h2>
			<div className="library-songs">
				{songArray.map((song) => (
					<LibrarySong
						songArray={songArray} // all the songs data
						song={song} // each individual song and their info from map
						setCurrentSong={setCurrentSong} // function to change current song
						id={song.id} // id of song
						key={song.id} // key required by react
						audioRef={audioRef}
						isPlaying={isPlaying}
						setSongArray={setSongArray}
					/>
				))}
			</div>
		</div>
	);
}

export default Library;
