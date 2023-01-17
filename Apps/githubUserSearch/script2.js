// script para usar a api da microsoft store
// Path: Apps\githubUserSearch\script2.js

const form = document.getElementById('form-pesquisa');
const resultados = document.getElementById('resultados');

form.addEventListener('submit', e => {
  e.preventDefault();

  // Obtém o ProductID pesquisado
  const ProductId = document.getElementById('ProductId').value;

  // productID teste minecraft preview 9p5x4qvlc2xr
    // Envia a requisição à API da microsoft store para obter os dados do app
fetch(`https://bspmts.mp.microsoft.com/v1/public/catalog/Retail/Products/${ProductId}/applockerdata`, {

})
.then(response => response.json())
.then(data => {
  // Exibe os dados do app
  resultados.innerHTML = `
    <h2>packageFamilyName: ${data.packageFamilyName}</h2>
    <p>packageIdentityName: ${data.packageIdentityName}</p>
    <p>windowsPhoneLegacyId: ${data.windowsPhoneLegacyId}</p>
    <p>publisherCertificateName: ${data.publisherCertificateName}</p>
  `;
})
.catch(error => {
    // Exibe um erro caso algo dê errado
    resultados.innerHTML = '<p>Erro ao pesquisar o ProductId: ' + error +'</p><br><p>Verifique se o ProductId está correto e tente novamente.</p><br><p>Se o erro persistir, tente novamente mais tarde.</p>';
  });

});
