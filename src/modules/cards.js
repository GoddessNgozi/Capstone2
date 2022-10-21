import Movies from './movies.js';
import showsCounter from './showscounter';

const cards = (shows, likeys) => {
    const cards = document.querySelector('.cards');
    cards.innerHTML = '';
    shows.forEach((show, index) => {
      const rater = show.rating.average ? '⭐' + show.rating.average : 'NR';
      /* const likeNum = likeys.find((ele) => ele.item_id === index);
      const liker = likeNum ? likeNum.likes + '❤️' : '🖤'; */
      const innerHtml = `
      <li class="show-card">
      <span class="status">${show.status}</span>
        <div class="movie-data card" id="card" style="background-image: url(${show.image.original})">
          <span class="rating">${rater}</span>
          <button class="comment-btn" type="button">Comments</button>
          <span class="likes">❤️${likeys[index].likes}</span>
      </div>
      <p class="show-name">${show.name}</p>
      </li>`;
      cards.innerHTML += innerHtml;
    });
    Movies.likeShow(likeys);
    showsCounter();
};

export default cards;