document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audio-player');
    const playButton = document.getElementById('play');
    const stopButton = document.getElementById('stop');
    const pauseButton = document.getElementById('pause');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const volumeSlider = document.getElementById('volume');
    const timeSlider = document.getElementById('time-slider');
    const timeInfo = document.getElementById('time-info');
    const playlistItems = document.getElementById('playlist-items');
    const fileUpload = document.getElementById('file-upload');
    const savePlaylistButton = document.getElementById('save-playlist');
    const loadPlaylistButton = document.getElementById('load-playlist');

    let playlist = [];
    let currentIndex = 0;

    function updatePlaylist() {
        playlistItems.innerHTML = '';
        playlist.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.filename} - ${item.duration}`;
            playlistItems.appendChild(li);
        });
    }

    function loadPlaylist(files) {
        playlist = [];
        files.forEach(file => {
            const duration = '3:00'; // Placeholder duration
            playlist.push({ filename: file.name, duration, file });
        });
        updatePlaylist();
    }

    function playTrack(index) {
        if (playlist[index]) {
            const file = playlist[index].file;
            const url = URL.createObjectURL(file);
            audioPlayer.src = url;
            audioPlayer.play().catch(error => {
                console.error('Error playing audio:', error);
                alert('Failed to play audio. Please check the file and try again.');
            });
        }
    }

    playButton.addEventListener('click', () => {
        if (audioPlayer.paused) {
            audioPlayer.play().catch(error => {
                console.error('Error playing audio:', error);
                alert('Failed to play audio. Please check the file and try again.');
            });
        }
    });

    stopButton.addEventListener('click', () => {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
    });

    pauseButton.addEventListener('click', () => {
        audioPlayer.pause();
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            playTrack(currentIndex);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < playlist.length - 1) {
            currentIndex++;
            playTrack(currentIndex);
        }
    });

    volumeSlider.addEventListener('input', () => {
        audioPlayer.volume = volumeSlider.value;
    });

    timeSlider.addEventListener('input', () => {
        audioPlayer.currentTime = (timeSlider.value / 100) * audioPlayer.duration;
    });

    audioPlayer.addEventListener('timeupdate', () => {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;
        timeSlider.value = (currentTime / duration) * 100;
        timeInfo.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
    });

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    fileUpload.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        loadPlaylist(files);
    });

    savePlaylistButton.addEventListener('click', () => {
        const blob = new Blob([JSON.stringify(playlist.map(item => ({ filename: item.filename, duration: item.duration })))], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'playlist.json';
        a.click();
        URL.revokeObjectURL(url);
    });

    loadPlaylistButton.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                try {
                    playlist = JSON.parse(reader.result);
                    updatePlaylist();
                } catch (error) {
                    console.error('Error loading playlist:', error);
                    alert('Failed to load playlist. Please check the file format.');
                }
            };
            reader.readAsText(file);
        });
        input.click();
    });
});
