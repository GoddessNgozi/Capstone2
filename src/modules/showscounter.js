const showsCounter = () => {
    const showList = document.querySelectorAll('.show-card');
    const counter = showList.length;
    const count = document.querySelector('.count');
    count.textContent = counter;
    return counter;
  };

 export default showsCounter; 