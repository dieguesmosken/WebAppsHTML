'use strict'

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let isPlaying = false;
let updateTimer;
//Variável de controle
var play = false;
let curr_track = document.createElement('audio');
//Cria o componente de áudio especificando a URL
var audio = new Audio('audio/musica1.mp3');


function seekTo() {
    // Calculate the seek position by the
    // percentage of the seek slider 
    // and get the relative duration to the track
    let seekto = curr_track.duration * (seek_slider.value / 100);

    // Set the current track position to the calculated seek position
    curr_track.currentTime = seekto;
}

function setVolume() {
    // Set the volume according to the
    // percentage of the volume slider set
    curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
    let seekPosition = 0;

    // Check if the current track duration is a legible number
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        // Calculate the time left and the total duration
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        // Add a zero to the single digit time values
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        // Display the updated duration
        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

document.querySelector('#play').addEventListener('click', () => {

    if (play)
        return;

    //Reproduz o áudio
    audio.play();


    play = true;
    updateTimer = setInterval(seekUpdate(), 1000);
});

document.querySelector('#pause').addEventListener('click', () => {

    //Pausa o áudio
    audio.pause();

    play = false;
});

document.querySelector('#stop').addEventListener('click', () => {

    //Pausa o áudio
    audio.pause();

    //Volta para o ínicio do track
    audio.currentTime = 0;

    play = false;
});