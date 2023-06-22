// Select all the elements in the HTML page
// and assign them to a variable
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let menu = document.getElementById("body");

let musicV = [];

function loadMusic() {
    for (let i = 1; i <= 50; i++) {

        let musicI = {

            name: "Music Test " + i.toString(),

            artist: "Artist Name " + i.toString(),
            image: "img/test/img_3.jpg",
            path: "music2/Music"
                + i.toString() + ".mp3"
        }

        console.log(musicI);
        musicV.push(musicI);
        track_list.push(musicI);

    }
}

// Specify globally used values
let track_index = 0;
let total = 0;
let isPlaying = false;
let updateTimer;

let Colors = [];

let valor1 = track_index - 1;
let valor2 = track_index - 2;
let valor3 = track_index - 3;


// Create the audio element for the player
let curr_track = document.createElement('audio');

// Define the list of tracks that have to be played
let track_list = [{
    name: "Resilient (feat. Aitana)",
    artist: "Katy Perry",
    image: "img/Resilient.jpg",
    //  image: "img/img_1.jpg",
    path: "music/musica1.mp3"
},
{
    name: "Crazy What Love Can Do (with Becky Hill)",
    artist: "David Guetta, Ella Henderson & Grafix",
    //  image: "img/test/img_2.jpg",
    image: "img/Crazy.jpg",
    path: "music/musica2.mp3"
},
{
    name: "Save Your Tears (Remix)",
    artist: "The Weeknd & Ariana Grande",
    image: "img/Save.jpg",
    //  image: "img/test/img_3.jpg",
    path: "music/musica3.mp3",
},
{
    name: "Attraction (Extended)",
    artist: "Lil' Kim, Lemon Demon, Tamar Braxton",
    image: "img/Attraction.jpg",
    //  image: "img/test/img_3.jpg",
    path: "music/01 - Attraction (Extended).mp3",
},
{
    name: "Cameo - David Guetta Remix",
    artist: "Kavinsky",
    image: "img/Cameo.jpg",
    //  image: "img/test/img_3.jpg",
    path: "music/01 - Cameo - David Guetta Remix.mp3",
},
{
    name: "Music Name",
    artist: "Artist Name",
    //  image: "img/Cameo.jpg",
    image: "img/test/img_1.jpg",
    path: "music/01 - Cameo - David Guetta Remix.mp3",
},


];

loadMusic();

function loadTrack(track_index) {

    // Limpa o tempo de duracao da musica anterior
    clearInterval(updateTimer);
    resetValues();

    // Carrega uma nova faixa no player
    curr_track.src = track_list[track_index].path;
    curr_track.load();

    // Atualiza os detalhes da faixa atual
    track_art.style.backgroundImage =
        "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent =
        "REPRODUZINDO " + (track_index + 1) + " DE " + track_list.length;

    // define um intervalo de atualizacao de 1000 milissegundos
    // para atualizar o controle deslizante de busca
    updateTimer = setInterval(seekUpdate, 1000);

    // Move to the next track if the current finishes playing
    // using the 'ended' event
    curr_track.addEventListener("ended", nextTrack);

    // Apply a random background color
    //random_bg_color();
    //  document.body.style = 'background-color:' +
    //      Colors[track_index] + ";";
    console.log(Colors[track_index]);

    //  troca a cor do background
    document.body.style.background = Colors[track_index];
}


function gerarCor() {
    for (let i = 0; i < track_list.length; i++) {
        const letras = '0123456789ABCDEF';
        let cor = '#';
        for (let i = 0; i < 6; i++) {
            cor += letras[Math.floor(Math.random() * 16)];
        }
        Colors.push(cor);
        console.log(cor);
        console.log(Colors.length);

    }

    total = track_list.length;
    console.log("qtd msc: " + track_list.length);


    //document.body.style.background = cor;

}
gerarCor();


function random_bg_color() {
    // Get a random number between 64 to 256
    // (for getting lighter colors)
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;

    // Construct a color withe the given values
    let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
    console.log(bgColor);
    // Set the background to the new color
    //document.body.style.background = bgColor;
}

// Function to reset all values to their default
function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}


function playpauseTrack() {
    // Switch between playing and pausing
    // depending on the current state
    if (!isPlaying) playTrack();
    else pauseTrack();
}


function playTrack() {
    // Play the loaded track
    curr_track.play();
    isPlaying = true;

    // Replace icon with the pause icon
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
    // Pause the loaded track
    curr_track.pause();
    isPlaying = false;

    // Replace icon with the play icon
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
    // Go back to the first track if the
    // current one is the last in the track list
    if (track_index < track_list.length - 1)
        track_index += 1;
    else track_index = 0;

    // Load and play the new track
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    // Go back to the last track if the
    // current one is the first in the track list
    if (track_index > 0)
        track_index -= 1;
    else track_index = track_list.length - 1;

    // Load and play the new track
    loadTrack(track_index);
    playTrack();
}

function seekTo() {
    // Calculate the seek position by the
    // percentage of the seek slider
    // and get the relative duration to the track
    seekto = curr_track.duration * (seek_slider.value / 100);

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
        if (currentSeconds < 10) {
            currentSeconds = "0" + currentSeconds;
        }
        if (durationSeconds < 10) {
            durationSeconds = "0" + durationSeconds;
        }
        if (currentMinutes < 10) {
            currentMinutes = "0" + currentMinutes;
        }
        if (durationMinutes < 10) {
            durationMinutes = "0" + durationMinutes;
        }

        // Display the updated duration
        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}
// Load the first track in the tracklist
loadTrack(track_index);