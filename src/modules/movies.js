import cards from './cards.js';

export default class Movies {
  static getShows = async () => {
    const response = await fetch('https://api.tvmaze.com/shows');
    const getJsonObj = await response.json();
    const result = getJsonObj.splice(100, 18);
  
    fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/9SBCkZBSL5MdiOyZMhaU/likes')
    .then((res) => res.json())
    .then((data) => {
      cards(result, data);
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
        lik.textContent = '❤️' + `${likeys[index].likes + 1}`;
      });
    });
  }

      /*const fetchLikes = () => {
    fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/9SBCkZBSL5MdiOyZMhaU/likes')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    }*/
}
