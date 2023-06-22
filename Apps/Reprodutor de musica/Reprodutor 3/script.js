const fileInput = document.querySelector('#file-input');
const playlist = document.querySelector('.playlist');
const tracks = playlist.querySelectorAll('li');
const curr_track = document.createElement('audio');

let index = 0;

// Adiciona um evento de clique para cada botão de reprodução
tracks.forEach((track, i) => {
  const playBtn = track.querySelector('.play-btn');
  const src = track.getAttribute('data-src');

  playBtn.addEventListener('click', () => {
    index = i;
    loadTrack(src, track);
    playTrack();
  });
});

// Função para carregar uma faixa na lista de reprodução
function loadTrack(src, track) {
  curr_track.src = src;

  // Remove a classe 'active' de todas as faixas da lista de reprodução
  tracks.forEach(track => {
    track.classList.remove('active');
  });

  // Adiciona a classe 'active' à faixa selecionada
  track.classList.add('active');

  // Atualiza o título da página com o nome da faixa selecionada
  document.title = track.querySelector('span').textContent;
}

// Função para reproduzir uma faixa na lista de reprodução
function playTrack() {
  curr_track.play();
  playpause_btn.innerHTML = '<i class="fas fa-pause-circle"></i>';
}

// Função para pausar uma faixa na lista de reprodução
function pauseTrack() {
  curr_track.pause();
  playpause_btn.innerHTML = '<i class="fas fa-play-circle"></i>';
}

// Função para formatar o tempo em segundos para um formato de hora legível
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);
  return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

// Atualiza a barra de progresso da faixa atual
function updateProgress() {
  seek_slider.value = curr_track.currentTime;
  current_time.textContent = formatTime(curr_track.currentTime);
}

// Atualiza a barra de progresso e o tempo atual e total da faixa atual durante a reprodução
function updateTrackInfo() {
  seek_slider.max = curr_track.duration;
  total_duration.textContent = formatTime(curr_track.duration);
}

// Avança para a próxima faixa na lista de reprodução
function nextTrack() {
  if (index < tracks.length - 1) {
    index++;
  } else {
    index = 0;
  }
  const nextTrack = tracks[index];
  const nextSrc = nextTrack.getAttribute('data-src');
  loadTrack(nextSrc, nextTrack);
  playTrack();
}

// Adiciona um evento de clique ao botão de carregamento de arquivos
fileInput.addEventListener('change', () => {
  const files = fileInput.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const src = URL.createObjectURL(file);
    const filename = file.name;
    const track = document.createElement('li');
    track.innerHTML = `<span>${filename}</span><button class="play-btn"><i class="fas fa-play-circle"></i></button>`;
    track.setAttribute('data-src', src);
    playlist.appendChild(track);
    track.querySelector('.play-btn').addEventListener('click', () => {
      index = i;
      loadTrack(src, track);
      playTrack();
    });
  }
});

// Adiciona um evento de clique ao botão de reprodução/pausa
playpause_btn.addEventListener('click', () => {
  const isPlaying = curr_track.paused ? false : true;
  if (isPlaying) {
    pauseTrack();
  } else {
    playTrack();
  }
});

// Adiciona um evento de clique ao botão de avançar para a próxima faixa
next_btn.addEventListener('click', nextTrack);

// Atualiza a barra de progresso e o tempo atual e total da faixa atual durante a reprodução
curr_track.addEventListener('timeupdate', updateProgress);
curr_track.addEventListener('loadedmetadata', updateTrackInfo);

// Atualiza a posição da faixa atual quando o usuário arrasta a barra de progresso
seek_slider.addEventListener('input', () => {
  curr_track.currentTime = seek_slider.value;
});

// Atualiza o volume da faixa atual quando o usuário arrasta a barra de volume
volume_slider.addEventListener('input', () => {
  curr_track.volume = volume_slider.value;
});