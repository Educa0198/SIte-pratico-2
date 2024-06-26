document.addEventListener('DOMContentLoaded', function() {
    const username = 'Educa0198';
    const githubAPI = `https://api.github.com/users/${username}`;
    const pessoasAPI = 'https://c297f7e9-8641-44fa-8982-d03821fed020-00-10gu20juq09gm.riker.replit.dev/pessoas';
    const conteudoSugeridoAPI = 'https://c297f7e9-8641-44fa-8982-d03821fed020-00-10gu20juq09gm.riker.replit.dev/conteudosugerido';

    // Função para buscar e exibir informações do perfil do GitHub
    async function fetchGitHubProfile() {
        try {
            const response = await fetch(githubAPI);
            const userData = await response.json();

            const perfilInfo = document.getElementById('perfilInfo');
            perfilInfo.innerHTML = `
                <img src="${userData.avatar_url}" width="300">
                <div class="bio">
                    <strong class="nome2">${userData.name}</strong>
                    <p>${userData.bio}</p>
                    <div class="localizacao">
                        <p><strong>Localização:</strong> ${userData.location}</p>
                        
                        <span><a><i class="ph ph-user-circle"></i></a>${userData.followers}</span>
                    </div>
                    <div class="redes">
                        <a target="_blank" href="${userData.html_url}"> <i class="ph ph-github-logo"></i> </a>
                        <a target="_blank" href="mailto:${userData.email}"> <i class="ph ph-envelope"></i> </a>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('Erro ao carregar perfil do GitHub:', error);
        }
    }

    // Função para buscar e exibir repositórios do GitHub
    async function fetchGitHubRepos() {
        try {
            const response = await fetch(`${githubAPI}/repos`);
            const reposData = await response.json();

            const repoContainer = document.getElementById('repoContainer');
            repoContainer.innerHTML = reposData.map(repo => `
                <div class="col-lg-4 col-md-6 col-sm-12">
                    <div class="card" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">${repo.name}</h5>
                            <a href="${repo.html_url}" class="btn btn-primary">ir para o Repositório</a>
                        </div>
                    </div>
                </div>
                
            `).join('');
        } catch (error) {
            console.error('Erro ao carregar repositórios do GitHub:', error);
        }
    }

    // Função para buscar e exibir conteúdo sugerido (Carousel)
    async function fetchConteudoSugerido() {
        try {
            const response = await fetch(conteudoSugeridoAPI);
            const conteudoSugeridoData = await response.json();

            const carouselIndicators = document.getElementById('carouselIndicators');
            const carouselInner = document.getElementById('carouselInner');

            // Gerando os indicadores e itens do carousel
            conteudoSugeridoData.forEach((item, index) => {
                const indicator = `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${index}" ${index === 0 ? 'class="active"' : ''} aria-label="Slide ${index + 1}"></button>`;
                carouselIndicators.innerHTML += indicator;

                const carouselItem = `
                    <div class="carousel-item ${index === 0 ? 'active' : ''}">
                        <img src="${item.imagem}" class="d-block w-100" alt="${item.alt}">
                    </div>
                `;
                carouselInner.innerHTML += carouselItem;
            });
        } catch (error) {
            console.error('Erro ao carregar conteúdo sugerido:', error);
        }
    }

    // Função para buscar e exibir pessoas (Colegas de trabalho)
    async function fetchPessoas() {
        try {
            const response = await fetch(pessoasAPI);
            const pessoasData = await response.json();

            const pessoasContainer = document.getElementById('pessoasContainer');

            pessoasData.forEach(pessoa => {
                const card = `
                    <div class="col-lg-4 col-md-6 col-sm-12">
                        <div class="card" style="width: 18rem;">
                            <img src="${pessoa.imagem}" class="card-img-top" alt="Imagem de ${pessoa.nome}">
                            <div class="card-body">
                                <h5 class="card-title">${pessoa.nome}</h5>
                            </div>
                        </div>
                    </div>
                `;
                pessoasContainer.innerHTML += card;
            });
        } catch (error) {
            console.error('Erro ao carregar pessoas:', error);
        }
    }

    // Chamando as funções para carregar perfil, repositórios, conteúdo sugerido e pessoas
    fetchGitHubProfile();
    fetchGitHubRepos();
    fetchConteudoSugerido();
    fetchPessoas();
});
