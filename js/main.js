const APIURL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=4ef605d4e9b17ee3824a4ed3ed660df0';
const APIURLTV =
  'https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=4ef605d4e9b17ee3824a4ed3ed660df0';
const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
const BUSCAAPI =
  'https://api.themoviedb.org/3/search/movie?&api_key=4ef605d4e9b17ee3824a4ed3ed660df0&query=';

const header = document.getElementById('header');
const form = document.getElementById('form');
const busca = document.getElementById('busca');
const main = document.getElementById('main');
const btnFilme = document.getElementById('btn-filme');
const btnTV = document.getElementById('btn-tv');

// MODAL
const modal = document.getElementById('modal');
const fechar = document.getElementById('fechar');
const poster = document.getElementById('poster');
const titulo = document.getElementById('titulo');
const sinopse = document.getElementById('overview');
const avaliacao = document.getElementById('avaliacao');
const genero = document.getElementById('genero');

btnFilme.addEventListener('click', function (e) {
  e.preventDefault();
  buscarFilmes(APIURL);
});

btnTV.addEventListener('click', function (e) {
  e.preventDefault();
  buscarFilmes(APIURLTV);
});

buscarFilmes(APIURL);

async function buscarFilmes(url) {
  const resp = await fetch(url);
  const respData = await resp.json();
  // console.log(respData.results);
  mostrarFilme(respData.results);
}

function mostrarFilme(filmes) {
  main.innerHTML = '';

  filmes.forEach(function (filme) {
    const { poster_path, title, vote_average, id } = filme;

    const filmeItem = document.createElement('div');
    filmeItem.classList.add('filme');

    filmeItem.innerHTML = `
		<a href="javascript:void(0);" onclick="return showModal(${id})">
			<img src="${IMGPATH + poster_path}" alt="${title}" />
			<div class="info">
				<h3>${title}</h3>
				<span class="${classePorAvaliacao(vote_average)}">
					${vote_average}
				</span>
			</div>
			</a>
		`;

    main.appendChild(filmeItem);
  });
}

function classePorAvaliacao(avaliacao) {
  if (avaliacao >= 8) {
    return 'verde';
  } else if (avaliacao >= 5) {
    return 'laranja';
  } else {
    return 'vermelho';
  }
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const textoBusca = busca.value;

  if (textoBusca) {
    buscarFilmes(BUSCAAPI + textoBusca);
    busca.value = '';
  }
});

fechar.addEventListener('click', function () {
  modal.classList.remove('show');
});

async function showModal(id) {
  const resp = await fetch(
    'https://api.themoviedb.org/3/movie/' +
      id +
      '?api_key=4ef605d4e9b17ee3824a4ed3ed660df0'
  );
  const respData = await resp.json();

  if (respData) {
    const genre = [];

    respData.genres.map(function (item) {
      genre.push(item.name);
    });

    poster.setAttribute('src', IMGPATH + respData.poster_path);
    titulo.innerText = respData.title;
    genero.innerHTML = genre;
    avaliacao.innerText = respData.vote_average;
    sinopse.innerText = respData.overview;
    modal.classList.add('show');
  }
}

window.addEventListener('scroll', function () {
  if (window.scrollY >= 150) {
    header.classList.add('active');
  } else {
    header.classList.remove('active');
  }
});
