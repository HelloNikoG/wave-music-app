import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPlay,
	faAngleLeft,
	faAngleRight,
	faPause,
} from '@fortawesome/free-solid-svg-icons';

// const [song, setSong] = useState(chillHop());
// 	const [currentSong, setCurrentSong] = useState(song[0]);
// 	const [isPlaying, setIsPlaying] = useState(false);
// const [songInfo, setSongInfo] = useState({
// 	currentTime: 0,
// 	duration: 0,
// });

//controls for music player
function Player({
	audioRef,
	currentSong,
	setCurrentSong,
	isPlaying,
	setIsPlaying,
	songInfo,
	setSongInfo,
	songArray,
	setSongArray,
}) {
	//Event handlers

	const activeLibraryHandler = (nextPrev) => {
		const newSongs = songArray.map((song) => {
			if (song.id === nextPrev.id) {
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
	};
	const playSongHandler = () => {
		if (isPlaying) {
			audioRef.current.pause();
			setIsPlaying(!isPlaying);
		} else {
			audioRef.current.play();
			setIsPlaying(!isPlaying);
		}
	};

	const getTime = (time) => {
		return (
			Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
		);
	};

	const dragHandler = (e) => {
		audioRef.current.currentTime = e.target.value;
		setSongInfo({ ...songInfo, currentTime: e.target.value });
	};

	const skipTrackHandler = async (direction) => {
		let currentIndex = songArray.findIndex(
			(song) => song.id === currentSong.id
		);

		if (direction === 'skip-forward') {
			await setCurrentSong(songArray[(currentIndex + 1) % songArray.length]);
			activeLibraryHandler(songArray[(currentIndex + 1) % songArray.length]);
		}
		if (direction === 'skip-back') {
			if ((currentIndex - 1) % songArray.length === -1) {
				await setCurrentSong(songArray[songArray.length - 1]);
				activeLibraryHandler(songArray[songArray.length - 1]);
				if (isPlaying) audioRef.current.play();
				return; // stops bottom code from running
			}
			await setCurrentSong(songArray[(currentIndex - 1) % songArray.length]);
			activeLibraryHandler(songArray[(currentIndex - 1) % songArray.length]);
		}
		if (isPlaying) audioRef.current.play();
	};

	//Add the styles
	const trackAnimation = {
		transfrom: `translateX(${songInfo.animationPercentage}%)`,
	};
	return (
		<div className="player">
			<div className="time-control">
				<p>{getTime(songInfo.currentTime)}</p>
				<div
					style={{
						background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
					}}
					className="track"
				>
					<input
						onChange={dragHandler}
						min={0}
						max={songInfo.duration}
						value={songInfo.currentTime}
						type="range"
					/>
					<div style={trackAnimation} className="animate-track"></div>
				</div>
				<p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
			</div>
			<div className="play-control">
				<FontAwesomeIcon
					onClick={() => skipTrackHandler('skip-back')}
					className="skip-back"
					size="2x"
					icon={faAngleLeft}
				/>
				<FontAwesomeIcon
					onClick={playSongHandler}
					className="play"
					size="2x"
					icon={isPlaying ? faPause : faPlay}
				/>
				<FontAwesomeIcon
					onClick={() => skipTrackHandler('skip-forward')}
					className="skip-forward"
					size="2x"
					icon={faAngleRight}
				/>
			</div>
		</div>
	);
}

export default Player;
