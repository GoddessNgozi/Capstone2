import showsCounter from './showscounter.js';

export default class Movies {
  static cards = (shows, likeys) => {
    const cards = document.querySelector('.cards');
    cards.innerHTML = '';
    shows.forEach((show, index) => {
      const rater = show.rating.average ? `⭐${show.rating.average}` : 'NR';
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

  static getShows = async () => {
    const response = await fetch('https://api.tvmaze.com/shows');
    const getJsonObj = await response.json();
    const result = getJsonObj.splice(100, 18);

    fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/9SBCkZBSL5MdiOyZMhaU/likes')
      .then((res) => res.json())
      .then((data) => {
        Movies.cards(result, data);
      });
  };

  static postLikes = async (id) => {
    const data = {
      item_id: id,
    };
    const post = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/9SBCkZBSL5MdiOyZMhaU/likes', post);
  };

  static likeShow = (likeys) => {
    const liks = document.querySelectorAll('.likes');
    liks.forEach((lik, index) => {
      lik.addEventListener('click', () => {
        Movies.postLikes(likeys[index].item_id);
        lik.textContent = `❤️${likeys[index].likes + 1}`;
      });
    });
  }

  /* const fetchLikes = () => {
    fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/9SBCkZBSL5MdiOyZMhaU/likes')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    } */
}
