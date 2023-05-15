// Configurar as credenciais da API do Spotify
const clientId = 'd9d9015415ed4815b3ef143ff2af2abf';
const clientSecret = 'f7224d1794d84a6bb19c07239cc76f84';
const redirectUri = 'http://localhost:26543';

// Função para fazer uma requisição POST para a API do Spotify// Configurar as credenciais da API do Spotify

// Função para fazer uma requisição POST para a API do Spotify
async function postRequest(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: data
    });
    console.log(data)
    return response.json();
}

// Função para obter o token de acesso
async function getAccessToken() {
    const response = await postRequest('https://accounts.spotify.com/api/token', 'grant_type=client_credentials');
    console.log(response)
    return response.access_token;
}

// Função para obter as estatísticas do usuário
async function getUserStats(accessToken) {
    const response = await fetch('https://api.spotify.com/v1/me/top/artists?limit=5', {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    });
    const data = await response.json();
    console.log(data.items)
    return data.items;
    
}

// Função para exibir as estatísticas do usuário no site
async function displayUserStats() {
    try {
        const accessToken = await getAccessToken();
        const topArtists = await getUserStats(accessToken);

        const topArtistsList = document.getElementById('top-artists');
        topArtists.forEach((artist) => {
            const listItem = document.createElement('li');
            listItem.textContent = artist.name;
            topArtistsList.appendChild(listItem);
        });
    } catch (error) {
        console.log('Erro:', error);
    }
}

// Chamar a função para exibir as estatísticas do usuário ao carregar a página
window.onload = displayUserStats;

