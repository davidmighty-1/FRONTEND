/*********** GET ELEMENTS ***********/
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const toggle = player.querySelector('.toggle');
const btnPlayIcon = toggle.querySelector('.fa');
const btnMute = player.querySelector('.btn-mute');
const btnStop = player.querySelector('.btn-stop');
const btnExpand = player.querySelector('.btn-expand');
const btnMuteIcon = btnMute.querySelector('.fa');
const skipButtons = player.querySelectorAll('[data-skip]');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__fill');
//const ranges = player.querySelectorAll('.playerslider');

/*********** BUILD OUT FUNCTIONS ***********/

//TOGGLE PLAY OR PAUSE
function togglePlay(){
    if (video.paused) {
        video.play();
        btnPlayIcon.classList.remove('fa-play');
        btnPlayIcon.classList.add('fa-pause');
    } else {
        video.pause();
        btnPlayIcon.classList.remove('fa-pause');
        btnPlayIcon.classList.add('fa-play');
    }
}

//FAST-FORWARD OR REWIND
function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

//MUTE VIDEO
function muteVideo() {
    if(video.muted){
        video.muted = false;
        
        btnMuteIcon.classList.remove('fa-volume-up');
        btnMuteIcon.classList.add('fa-volume-off');
    } else {
        video.muted = true;
        
        btnMuteIcon.classList.remove('fa-volume-off');
        btnMuteIcon.classList.add('fa-volume-up');
    }
}

// STOP THE VIDEO
function stopVideo() {
  video.pause();
  video.currentTime = 0;
  btnPlayIcon.classList.remove('fa-pause');
  btnPlayIcon.classList.add('fa-play');
}

//Update progressBar
function updateProgress () {
  // Calculate current progress
  let value = (100 / video.duration) * video.currentTime;

  // Update the slider value
  progressBar.style.width = value + '%';
}

//Expand video
function expandVideo () {
    if (video.requestFullscreen){
        video.requestFullscreen();
    } else if (video.mozRequestFullscreen){
        video.mozRequestFullscreen();
    } else if (video.webkitRequestFullscreen){
        video.webkitRequestFullscreen();
    }     
}

//Show or hide controls

/*********** EVENT HANDLERS ***********/
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
btnMute.addEventListener('click', muteVideo);
btnStop.addEventListener('click', stopVideo);
video.addEventListener('timeupdate', updateProgress, false);
btnExpand.addEventListener ('click', expandVideo);