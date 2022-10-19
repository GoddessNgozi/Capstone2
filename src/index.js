import './style.css';

const cards = (shows) => {
    const cards = document.querySelector('.cards');
    cards.innerHTML = '';
    shows.forEach((show) => {
      const rater = show.rating.average ? '⭐' + show.rating.average : 'NR';
      const innerHtml = `
      <li>
      <span class="status">${show.status}</span>
      <div class="card" id="card" style="background-image: url(${show.image.original})">
        <div>
          <span class="rating">${rater}</span>
          <span class="comment"></span>
          <span class="class"></span>
        </div>
      </div>
      <p class="show-name">${show.name}</p>
      </li>`;
      cards.innerHTML += innerHtml;
    });
};

const getShows = async () => {
    const response = await fetch('https://api.tvmaze.com/shows');
    const getJsonObj = await response.json();
    const result = getJsonObj.splice(100, 18);
    const likes = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/xsXdcGU20uAwQvxMb5aN/likes');
    cards(result);
  };

  document.addEventListener('DOMContentLoaded', getShows);