const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

const count = document.getElementById('count');
const total = document.getElementById('total');

const movieSelect = document.getElementById('movie');

// Populate UI with saved data
populateUI();

let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update count and total 
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  // copy selected seats into arr
  // map through array
  // return a new array indexes
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  // save input to local storage
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Get date from localstorage and populate UI
function populateUI() {
  // the seats saved in localstorage
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
  // the movie saved in localstorage
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }

}

// Movie Select
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;

  // movie selected index
  setMovieData(e.target.selectedIndex, e.target.value);

  updateSelectedCount();
});

// Selecting seats
container.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

// Update selected Count
updateSelectedCount();