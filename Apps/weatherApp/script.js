// Função para obter a previsão do tempo
function getWeather(lat, lng) {
    // URL da API do OpenWeatherMap
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    // Parâmetros da API
    const API_KEY = "771942e2133c550992679051d2537c29";
    const units = "metric";
    const lang = "pt";
    const params = {
        lat: lat,
        lon: lng,
        appid: API_KEY,
        units: units,
        lang: lang,
    };
    const queryString = Object.keys(params)
        .map((key) => key + "=" + params[key])
        .join("&");
    const url = API_URL + "?" + queryString;
    // Fazer a requisição HTTP à API
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            // Processar dados da previsão do tempo
            const weather = data.weather[0];
            const main = data.main;
            // Criar elementos HTML para exibir a previsão do tempo
            const weatherCard = document.createElement("div");
            weatherCard.classList.add("weather-card");
            weatherCard.innerHTML = `
  <img src="http://openweathermap.org/img/wn/${weather.icon}@2x.png" alt="${weather.description}">
  <h2>${weather.main}</h2>
  <p>Temperatura: ${main.temp}°C</p>
  <p>Sensação térmica: ${main.feels_like}°C</p>
  <p>Umidade: ${main.humidity}%</p>
`;
            // Adicionar a previsão do tempo à página
            document.getElementById("weather").appendChild(weatherCard);

        });

}

// Obter a localização do usuário
navigator.geolocation.getCurrentPosition(
    // Callback de sucesso
    (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        // Obter a previsão do tempo
        getWeather(lat, lng);
    },
    // Callback de erro
    (error) => {
        console.error(error);
    }
);