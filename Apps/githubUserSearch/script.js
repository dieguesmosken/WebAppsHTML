
        

    const form = document.getElementById('form-pesquisa');
    const resultados = document.getElementById('resultados');
    
    form.addEventListener('submit', e => {
      e.preventDefault();
    
      // Obtém o usuário pesquisado
      const usuario = document.getElementById('usuario').value;
    
      // Envia a requisição à API do GitHub para obter os dados do usuário
        // Envia a requisição à API do GitHub para obter os dados do usuário
  fetch(`https://api.github.com/users/${usuario}`, {
    headers: {
          // Substitua pelo seu token de acesso pessoal
          'Authorization': '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'
    
    }
  })
    .then(response => response.json())
    .then(data => {
      // Exibe os dados do usuário
      resultados.innerHTML = `
        <img src="${data.avatar_url}" alt="Imagem de ${data.name}"><br>
        <h2>${data.name}</h2>
        <p><a href="${data.html_url}">${data.login}</a></p>
        <p>Seguidores: ${data.followers}</p>
        <p>Repositórios: ${data.public_repos}</p>
      `;

      // Envia a requisição à API do GitHub para obter a lista de repositóri

    // Envia a requisição à API do GitHub para obter a lista de repositórios
    fetch(`https://api.github.com/users/${usuario}/repos`, {
        headers: {
          // Substitua pelo seu token de acesso pessoal
             // Substitua pelo seu token de acesso pessoal
        'Authorization': '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'
    
        }
      })
        .then(response => response.json())
        .then(repos => {
          // Exibe a lista de repositórios
          resultados.innerHTML += '<h3>Repositórios</h3>';
          resultados.innerHTML += '<ul>';
          for (const repo of repos) {
            resultados.innerHTML += `<li><a href="${repo.html_url}">${repo.name}</a></li>`;
          }
          resultados.innerHTML += '</ul>';

          // Conta quantas vezes cada linguagem é utilizada pelo usuário
          const linguagens = repos.reduce((acumulador, repo) => {
                    // Conta quantas vezes cada linguagem é utilizada pelo usuário
                    const linguagens = repos.reduce((acumulador, repo) => {
                        if (repo.language) {
                          if (acumulador[repo.language]) {
                            acumulador[repo.language]++;
                          } else {
                            acumulador[repo.language] = 1;
                          }
                        }
                        return acumulador;
                      }, {});
            /*
                      // Exibe as linguagens de programação mais utilizadas pelo usuário
                      resultados.innerHTML += '<h3>Linguagens de Programação</h3>';
                      resultados.innerHTML += '<ul>';
                      for (const linguagem in linguagens) {
                        resultados.innerHTML += `<li>${linguagem}: ${linguagens[linguagem]}</li>`;
                      }
                      resultados.innerHTML += '</ul>';
                      */
                    }
                    
                    
                    );
                })
                .catch(error => {
                  // Exibe um erro caso algo dê errado
                  resultados.innerHTML = '<p>Erro ao pesquisar o usuário</p>';
                });
            });
        }
        
        
        // Envia a requisição à API do GitHub para obter a lista de repositórios
        
        )

    
