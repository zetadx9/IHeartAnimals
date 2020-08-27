const clickMeBtn = document.getElementById('clickMe');
const deleteBtn = document.querySelector('.delete');

// clickMeBtn.addEventListener('click', handleClick);
deleteBtn.addEventListener('click', handleDelete);


function handleClick(event) {
  // console.log('Click Me clicked...');
  // GET Request to get Authors
  fetch('/api/v1/animals', {
    credentials: 'include',
  })
    .then((stream) => stream.json())
    .then((data) => renderAnimals(data));
}

function renderAnimals(animalsArr) {
  const animalsSection = document.getElementById('animals');

  animalsArr.forEach((animal) => {
    const animalTemplate = `
      <div class="card" style="width: 18rem;">
        <img style="height: 200px" src="https://picsum.photos/100/100" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${animal.name}</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="/authors/${animal._id}" class="btn btn-primary float-right">View Details</a>
        </div>
      </div>
    `;

    animalsSection.insertAdjacentHTML('beforeend', animalTemplate);
  });
}


function handleDelete(event) {
  console.log(event.target.id);
  const animalId = event.target.id;
  fetch(`/api/v1/animals/${animalId}`, {
    method: 'DELETE',
  })
    .then((stream) => stream.json())
    .then((res) => window.location.pathname = '/animals');
}