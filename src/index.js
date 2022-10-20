import './style.css';

const cards = (shows, likeys) => {
    const cards = document.querySelector('.cards');
    cards.innerHTML = '';
    shows.forEach((show, index) => {
      const rater = show.rating.average ? '⭐' + show.rating.average : 'NR';
      const likeNum = likeys.find((ele) => ele.item_id === index);
      console.log(likeNum);
      /* const liker = likeNum ? likeNum.likes + '❤️' : '🖤'; */
      const innerHtml = `
      <li class="show-card">
        <div class="movie-data card" id="card" style="background-image: url(${show.image.original})">
          <span class="rating">${rater}</span>
          <button class="comment-btn" type="button">Comments</button>
          <span class="likes">❤️${likeys[index].likes}</span>
      </div>
      <p class="show-name">${show.name}</p>
      </li>`;
      cards.innerHTML += innerHtml;
      const liks = document.querySelectorAll('.likes');
      liks.forEach((lik, index) => {
        lik.addEventListener('click', () => {
          postLikes(likeys[index].item_id);
          lik.textContent = '❤️' + `${likeys[index].likes + 1}`;
        });
      });
    });
};

  const postLikes = async (id) => {
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

  const getShows = async () => {
    const response = await fetch('https://api.tvmaze.com/shows');
    const getJsonObj = await response.json();
    const result = getJsonObj.splice(100, 18);
    /*const likes = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/9SBCkZBSL5MdiOyZMhaU/likes');
    const res = await likes.json();*/
    fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/9SBCkZBSL5MdiOyZMhaU/likes')
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      cards(result, data);
    });
  };

  /*const fetchLikes = () => {
    fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/9SBCkZBSL5MdiOyZMhaU/likes')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    }*/

  document.addEventListener('DOMContentLoaded', getShows);