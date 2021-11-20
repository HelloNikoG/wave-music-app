import { useState, useRef } from 'react';
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Nav from './components/Nav';
import './styles/app.scss';
import chillHop from './data';

function App() {
	//states
	const [songArray, setSongArray] = useState(chillHop());
	const [currentSong, setCurrentSong] = useState(songArray[0]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [songInfo, setSongInfo] = useState({
		currentTime: 0,
		duration: 0,
	});
	const [libraryStatus, setLibraryStatus] = useState(false);

	//Ref
	const audioRef = useRef(null);

	const timeUpdateHandler = (e) => {
		const current = e.target.currentTime;
		const duration = e.target.duration || 0;
		setSongInfo({ ...songInfo, currentTime: current, duration: duration });
	};
	return (
		<div className="App">
			<Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
			<Song currentSong={currentSong} />
			<Player
				audioRef={audioRef}
				currentSong={currentSong}
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
				songInfo={songInfo}
				setSongInfo={setSongInfo}
				timeUpdateHandler={timeUpdateHandler}
			/>
			<Library
				songArray={songArray}
				setCurrentSong={setCurrentSong}
				audioRef={audioRef}
				isPlaying={isPlaying}
				setSongArray={setSongArray}
				libraryStatus={libraryStatus}
				setLibraryStatus={setLibraryStatus}
			/>
			<audio
				onTimeUpdate={timeUpdateHandler}
				onLoadedMetadata={timeUpdateHandler}
				ref={audioRef}
				src={currentSong.audio}
			/>
		</div>
	);
}

export default App;

//reference, if you need to select specific html tag in component useRef

//audioRef.current.play() this .play/.pause is built in

//onTimeUpdate runs everytime time changes in audio
