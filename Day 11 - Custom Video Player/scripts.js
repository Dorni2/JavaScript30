const video = document.querySelector('video');
const playBtn = document.querySelector('.toggle');
const vol = document.querySelector('input[name="volume"]');
const playRate = document.querySelector('input[name="playbackRate"]');
const skipButtons = document.querySelectorAll('[data-skip]');
const progressBar = document.querySelector('.progress__filled');
const progress = document.querySelector('.progress');

video.addEventListener('click', playPause);
video.addEventListener('play', changeButton);
video.addEventListener('pause', changeButton);
video.addEventListener('timeupdate', handleProgress);
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);
playBtn.addEventListener('click', playPause);
vol.addEventListener('change', changeVolume);
playRate.addEventListener('change', changeRate);
skipButtons.forEach((skipButton) => skipButton.addEventListener('click', skipTime));

let mouseDown = false;

function changeButton() {
    let ButtonAdi = video.paused ? '►' : '||';
    playBtn.textContent = ButtonAdi;
}

function playPause() {
    if (video.paused) { 
        video.play()
    } else {
        video.pause()
    }
}

function changeVolume(e) {
    video.volume = e.srcElement.value;
}

function changeRate(e) {
    video.playbackRate = e.srcElement.value;
}

function skipTime(e) {
    const time = this.dataset.skip;
    video.currentTime += parseInt(this.dataset.skip);
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}