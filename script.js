document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const genreFilter = document.getElementById('genreFilter');
    const filterButton = document.getElementById('filterButton');
    const newsListings = document.getElementById('newsListings');

    // **SIMULAÇÃO DE DADOS DE NOTÍCIAS**
    // No seu projeto real, 'allNews' seria preenchido por uma requisição
    // AJAX (fetch API) à sua API de backend que fornece as notícias.
    // Ex: const allNews = await fetch('SUA_API_DE_NOTICIAS_AQUI').then(res => res.json());

    const allNews = [
        {
            id: 1,
            title: 'Prefeitura de Araguaína anuncia pacote de obras para o segundo semestre',
            description: 'Novas infraestruturas e reformas estão previstas para diversas regiões da cidade, focando em mobilidade urbana e saneamento.',
            genre: 'Política',
            date: '2024-05-27T10:00:00Z', // Data e hora no formato ISO 8601
            source: 'Portal Araguaína News',
            link: 'https://www.exemplo.com.br/araguaina/noticia/prefeitura-obras-segundo-semestre'
        },
        {
            id: 2,
            title: 'Equipe de Araguaína se prepara para campeonato estadual de futebol',
            description: 'Os treinos estão intensos visando a disputa do título tocantinense neste ano.',
            genre: 'Esportes',
            date: '2024-05-27T09:30:00Z',
            source: 'Tocantins Esporte',
            link: 'https://www.exemplo.com.br/araguaina/noticia/futebol-campeonato-estadual'
        },
        {
            id: 3,
            title: 'Nova unidade de saúde é inaugurada no setor Maracanã em Araguaína',
            description: 'A unidade promete ampliar o atendimento primário e facilitar o acesso da população a serviços médicos essenciais.',
            genre: 'Saúde',
            date: '2024-05-26T18:00:00Z',
            source: 'Jornal do Tocantins',
            link: 'https://www.exemplo.com.br/araguaina/noticia/unidade-saude-maracana'
        },
        {
            id: 4,
            title: 'Feira de agricultura familiar movimenta economia local de Araguaína',
            description: 'Produtores rurais expõem seus produtos frescos e orgânicos, atraindo centenas de consumidores todo final de semana.',
            genre: 'Economia',
            date: '2024-05-26T14:00:00Z',
            source: 'Araguaína em Foco',
            link: 'https://www.exemplo.com.br/araguaina/noticia/feira-agricultura-familiar'
        },
        {
            id: 5,
            title: 'Festival de Cultura de Araguaína celebra a diversidade artística',
            description: 'Evento reúne apresentações de música, dança, teatro e exposições de arte, valorizando talentos locais.',
            genre: 'Cultura',
            date: '2024-05-25T11:00:00Z',
            source: 'Agenda Cultural TO',
            link: 'https://www.exemplo.com.br/araguaina/noticia/festival-cultura'
        },
        {
            id: 6,
            title: 'Polícia prende suspeito de assaltos em série na região central de Araguaína',
            description: 'As investigações continuam para identificar outros envolvidos nos crimes que vinham aterrorizando comerciantes.',
            genre: 'Polícia',
            date: '2024-05-25T08:00:00Z',
            source: 'Plantão Tocantins',
            link: 'https://www.exemplo.com.br/araguaina/noticia/policia-assaltos'
        },
        {
            id: 7,
            title: 'Nova lei de zoneamento é aprovada na Câmara de Araguaína',
            description: 'Impactos significativos são esperados para o desenvolvimento urbano da cidade.',
            genre: 'Política',
            date: '2024-05-24T16:00:00Z',
            source: 'Gazeta da Cidade',
            link: 'https://www.exemplo.com.br/araguaina/noticia/nova-lei-zoneamento'
        },
        {
            id: 8,
            title: 'Abertas inscrições para cursos profissionalizantes em Araguaína',
            description: 'Oportunidade para capacitação em diversas áreas, visando a inserção no mercado de trabalho.',
            genre: 'Educação',
            date: '2024-05-24T10:00:00Z',
            source: 'SEDUC Araguaína',
            link: 'https://www.exemplo.com.br/araguaina/noticia/cursos-profissionalizantes'
        },
        {
            id: 9,
            title: 'Previsão do tempo para Araguaína: Sol com algumas nuvens e baixa umidade',
            description: 'Temperaturas elevadas são esperadas para os próximos dias na região norte do Tocantins.',
            genre: 'Geral',
            date: '2024-05-27T07:00:00Z',
            source: 'Clima Tempo',
            link: 'https://www.exemplo.com.br/araguaina/noticia/previsao-tempo'
        }
    ];

    function displayNews(newsToDisplay) {
        newsListings.innerHTML = ''; // Limpa as notícias existentes

        if (newsToDisplay.length === 0) {
            newsListings.innerHTML = '<p class="no-results">Nenhuma notícia encontrada com os filtros aplicados.</p>';
            return;
        }

        newsToDisplay.forEach(news => {
            const newsCard = document.createElement('div');
            newsCard.classList.add('news-card');

            // Adiciona um listener de clique ao CARD inteiro
            newsCard.addEventListener('click', () => {
                if (news.link) { // Verifica se existe um link para a notícia
                    window.open(news.link, '_blank'); // Abre o link em uma nova aba
                } else {
                    console.warn(`Notícia "${news.title}" não possui link definido.`);
                    alert('Link da notícia não disponível.');
                }
            });

            newsCard.innerHTML = `
                <h2>${news.title}</h2>
                <p>${news.description}</p>
                <div class="news-meta">
                    <span><i class="far fa-calendar-alt"></i> ${new Date(news.date).toLocaleDateString('pt-BR')}</span>
                    <span><i class="fas fa-newspaper"></i> ${news.source}</span>
                    <span class="genre">${news.genre}</span>
                </div>
            `;
            newsListings.appendChild(newsCard);
        });
    }

    function filterNews() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const selectedGenre = genreFilter.value;

        let filtered = allNews.filter(news => {
            const matchesTitle = news.title.toLowerCase().includes(searchTerm);
            const matchesGenre = selectedGenre === 'all' || news.genre === selectedGenre;
            return matchesTitle && matchesGenre;
        });

        // Ordenar por data mais recente primeiro
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

        displayNews(filtered);
    }

    // Event Listeners para acionar o filtro
    filterButton.addEventListener('click', filterNews);
    searchInput.addEventListener('input', filterNews); // Filtra em tempo real ao digitar
    genreFilter.addEventListener('change', filterNews); // Filtra ao mudar o gênero

    // Carrega todas as notícias ao iniciar a página
    filterNews();
});