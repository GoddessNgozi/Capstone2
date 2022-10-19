const getData = async () => {
    const response = await fetch('https://api.tvmaze.com/shows');
    const getJsonObj = await response.json();
    const result = getJsonObj.slice(0, 18);
    counter(result.length);
  
    const likes = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/5cAzmpr4jeQVeyEjNyKs/likes');
    const res = await likes.json();
    cards(result, res);
  };

  const cards = (games, data) => {
    const cards = document.querySelector('.cards');
    cards.innerHTML = '';
    games.forEach((game, index) => {
      const id = data.findIndex((like) => +like.item_id === index);
      const msgLikes = id >= 0 ? data[id].likes : 0;
      const innerHtml = `
      <div class="card" id="card">
        <img src="${game.image.original}" class="card-img" />
        <div class="social flex">
          <span class="details">${game.name}</span>
          <div class="like flex">
            <i class="bx bx-heart" data-id="${index}"></i>
            <span>${msgLikes} Likes</span>
          </div>
        </div>
        <button id="pop-up" data-id="${index}">Comments</button>
      </div>`;
      cards.innerHTML += innerHtml;
    });
};