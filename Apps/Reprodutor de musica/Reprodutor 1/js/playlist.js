

let playPlaylist = document.querySelector(".playPlaylist");

function playpausePlaylist() {
  // Switch between playing and pausing
  // depending on the current state
  if (!isPlaying) playTrackOnPlaylist();
  else pauseTrackOnPlaylist();
}

function playTrackOnPlaylist() {
    
  // Play the loaded track
  curr_track.play();
  isPlaying = true;

  // Replace icon with the pause icon
  playPlaylist.innerHTML = '<i class="fa fa-pause-circle fa-3x"></i>';

}

function pauseTrackOnPlaylist() {
  // Pause the loaded track
  curr_track.pause();
  isPlaying = false;
  
  // Replace icon with the play icon
  playPlaylist.innerHTML = '<i class="fa fa-play-circle fa-3x"></i>';

}

function carregarPlaylist() {
  const menu = document.getElementById("menu");
  for (let i = 0; i < track_list.length; i++) {
    let li = document.createElement("li");
    li.setAttribute("data-src", track_list[i].src);

    //li.style.backgroundColor = Colors[track_index + 1] ; para testes futuros
    //li.style.backgroundColor = Colors[track_index] ;


    let trackArt = document.createElement("div");
    trackArt.className = "track-art";
    trackArt.style.height = "40px";
    trackArt.style.width = "40px";
    trackArt.style.backgroundImage = "url(" + track_list[i].image + ")";

    let trackName = document.createElement("div");
    trackName.className = "track-name-playlist";
    trackName.textContent = track_list[i].name;

    let totalDuration = document.createElement("span");
    totalDuration.className = "total-duration-playlist";
    totalDuration.textContent = track_list[i].duration;

    let playpause = document.createElement("div");
    playpause.className = "playPlaylist";
    playpause.setAttribute("onclick", "playpausePlaylist()");

    let playIcon = document.createElement("i");
    playIcon.className = "fa fa-play-circle fa-3x";
    playIcon.setAttribute("onclick", "playpausePlaylist()");


    li.appendChild(trackArt);
    li.appendChild(trackName);
    li.appendChild(totalDuration);
    li.appendChild(playIcon);

    li.addEventListener("click", function () {
      loadTrack(i);
    });

    menu.appendChild(li);
  }
}


carregarPlaylist();
