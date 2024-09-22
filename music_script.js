const nowPlayingElem = document.querySelector('.now-playing');
const trackArtElem = document.querySelector('.track-art');
const trackNameElem = document.querySelector('.track-name');
const trackArtistElem = document.querySelector('.track-artist');

const playPauseBtn = document.querySelector('.playpause-track');
const nextBtn = document.querySelector('.next-track');
const prevBtn = document.querySelector('.prev-track');

const seekSlider = document.querySelector('.seek_slider');
const volumeSlider = document.querySelector('.volume_slider');
const currentTimeElem = document.querySelector('.current-time');
const totalDurationElem = document.querySelector('.total-duration');
const waveEffectElem = document.getElementById('wave');
const randomIconElem = document.querySelector('.fa-random');
const audioTrack = document.createElement('audio');

let trackIdx = 0;
let isPlaying = false;
let isRandomMode = false;
let timer;

const trackList = [
    {
        img: 'images/uptownfunk.jpg',
        title: 'Uptown Funk',
        artist: 'Mark Ronson, Bruno Mars',
        src: 'C:/Users/hriti/Downloads/MDS615-Group-Project/music/Mark Ronson - Uptown Funk (Official Video) ft. Bruno Mars.mp3'
    },
    {
        img: 'Images/partyintheusa.jpg',
        title: 'Party In The U.S.A.',
        artist: 'Miley Cyrus',
        src: 'music/usa.mp3'
    },
    {
        img: 'images/feeling.jpg',
        title: 'CANT STOP THE FEELING!',
        artist: 'Justin Timjberlake',
        src: 'music/feeling.mp3'
    },
    {
        img: 'images/happy.jpg',
        title: 'Happy',
        artist: 'Pharrell Williams',
        src: 'music/happy.mp3'
    }
];

initializeTrack(trackIdx);

function initializeTrack(index) {
    clearInterval(timer);
    resetTrack();

    audioTrack.src = trackList[index].src;
    audioTrack.load();

    trackArtElem.style.backgroundImage = `url(${trackList[index].img})`;
    trackNameElem.textContent = trackList[index].title;
    trackArtistElem.textContent = trackList[index].artist;
    nowPlayingElem.textContent = `Playing track ${index + 1} of ${trackList.length}`;

    timer = setInterval(updateTrackProgress, 1000);
    audioTrack.addEventListener('ended', playNextTrack);
    setRandomBackgroundColor();
}

function setRandomBackgroundColor() {
    const hexChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    
    function generateColor() {
        return `#${Array.from({ length: 6 }, () => hexChars[Math.floor(Math.random() * hexChars.length)]).join('')}`;
    }
    
    document.body.style.background = `linear-gradient(to right, ${generateColor()}, ${generateColor()})`;
}

function resetTrack() {
    currentTimeElem.textContent = "00:00";
    totalDurationElem.textContent = "00:00";
    seekSlider.value = 0;
}

function toggleRandom() {
    isRandomMode ? disableRandom() : enableRandom();
}

function enableRandom() {
    isRandomMode = true;
    randomIconElem.classList.add('randomActive');
}

function disableRandom() {
    isRandomMode = false;
    randomIconElem.classList.remove('randomActive');
}

function repeatCurrentTrack() {
    loadTrack(trackIdx);
    playCurrentTrack();
}

function togglePlayPause() {
    isPlaying ? pauseCurrentTrack() : playCurrentTrack();
}

function playCurrentTrack() {
    audioTrack.play();
    isPlaying = true;
    trackArtElem.classList.add('rotate');
    waveEffectElem.classList.add('loader');
    playPauseBtn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseCurrentTrack() {
    audioTrack.pause();
    isPlaying = false;
    trackArtElem.classList.remove('rotate');
    waveEffectElem.classList.remove('loader');
    playPauseBtn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function playNextTrack() {
    if (trackIdx < trackList.length - 1 && !isRandomMode) {
        trackIdx += 1;
    } else if (isRandomMode) {
        trackIdx = Math.floor(Math.random() * trackList.length);
    } else {
        trackIdx = 0;
    }
    initializeTrack(trackIdx);
    playCurrentTrack();
}

function playPrevTrack() {
    trackIdx = trackIdx > 0 ? trackIdx - 1 : trackList.length - 1;
    initializeTrack(trackIdx);
    playCurrentTrack();
}

function seekTo() {
    const seekToTime = audioTrack.duration * (seekSlider.value / 100);
    audioTrack.currentTime = seekToTime;
}

function setVolume() {
    audioTrack.volume = volumeSlider.value / 100;
}

function updateTrackProgress() {
    if (!isNaN(audioTrack.duration)) {
        const seekPosition = (audioTrack.currentTime / audioTrack.duration) * 100;
        seekSlider.value = seekPosition;

        const formatTime = (time) => {
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        };

        currentTimeElem.textContent = formatTime(audioTrack.currentTime);
        totalDurationElem.textContent = formatTime(audioTrack.duration);
    }
}
