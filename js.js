const section = document.querySelector(".sections");
const row = document.querySelectorAll(".row");
const to = document.querySelector("#to");
const from = document.querySelector("#from");
const btnconfirm = document.querySelector("#confirm");
const btnbuy = document.querySelector("#buy");
const direct = document.querySelector(".direct");

// example  data for test

//Passenger class example;
class Passenger {
  firstStaionValue;
  lastStaionValue;
  seatNumber;
}
//test data
let person1 = new Passenger();
person1.firstStaionValue = 1;
person1.lastStaionValue = 3;
person1.direction = "right";
person1.seatNumber = 5;

let person2 = new Passenger();
person2.firstStaionValue = 2;
person2.lastStaionValue = 4;
person2.direction = "right";
person2.seatNumber = 13;

let person3 = new Passenger();
person3.firstStaionValue = 4;
person3.lastStaionValue = 2;
person3.direction = "left";
person3.seatNumber = 1;

let person4 = new Passenger();
person4.firstStaionValue = 2;
person4.lastStaionValue = 3;
person4.direction = "left";
person4.seatNumber = 2;

let rıghtDirectionPassengers = [];
let leftDirectionPassengers = [person3, person4];

//Fill the seats
let j = 0;
let k = 8;
for (i = 0; i < 5; i++) {
  for (j; j < k; j++) {
    let html = `<div class="seat" id=${j}></div>`;
    section.children[i].insertAdjacentHTML("afterbegin", html);
  }

  k = j + 8;
}

// adding event listener for  all  seats
for (i = 0; i < j; i++) {
  let element = document.getElementById(`${i}`);
  element.addEventListener("click", () => {
    if (element.className !== "seat sold") {
      element.classList.toggle("selected");
      console.log(element.className);
    }
  });
}

//adding event listener form confirm button and control function

btnconfirm.addEventListener("click", control);

function control() {
  let direction = to.value - from.value;
  addFillSeat(direction);

  if (direction == 0) {
    console.log("same station");
  } else if (direction > 0) {
    direct.className = "ri-arrow-right-line direct";
    rıghtDirectionPassengers.forEach((person) => {
      let seatNumber = person.seatNumber;

      if (person.firstStaionValue < from.value && person.lastStaionValue > to) {
        document.getElementById(seatNumber).classList.add("sold");
      } else if (person.lastStaionValue <= from.value) {
        document.getElementById(seatNumber).classList.remove("sold");
      } else if (person.firstStaionValue >= to.value) {
        document.getElementById(seatNumber).classList.remove("sold");
      }
    });
  } else if (direction) {
    direct.className = "ri-arrow-left-line direct";
    leftDirectionPassengers.forEach((person) => {
      if (person.lastStaionValue > from.value) {
        let seatNumber = person.seatNumber;
        document.getElementById(seatNumber).classList.remove("sold");
      }
    });
  }
}

btnbuy.addEventListener("click", buy);

function buy() {
  let selectedSeatsArray = [];
  let selectedSeats = document.querySelectorAll(".selected");

  let direction = to.value - from.value;
  if (direction != 0) {
    if (direction > 0) {
      direction = "right";
    } else if (direction < 0) {
      direction = "left";
    }
    console.log(direction);
    selectedSeats.forEach((seat) => {
      if (seat.id) {
        selectedSeatsArray.push(seat.id);
        seat.classList.remove("selected");
        seat.classList.add("sold");
      }
    });
    creatPassenger(direction, to.value, from.value, selectedSeatsArray);
    console.log(rıghtDirectionPassengers);
    prompt("biletiniz başarıyla");
  } else {
    prompt("lütfen farklı iki istasyon seçin");
    clearSeats();
  }
}

function creatPassenger(direction, toValue, fromValue, selectedSeats) {
  let passenger;
  if (selectedSeats) {
    console.log(direction);
    selectedSeats.forEach((element) => {
      passenger = new Passenger();
      passenger.firstStaionValue = fromValue;
      passenger.lastStaionValue = toValue;
      passenger.seatNumber = element;
      if (direction == "left") {
        leftDirectionPassengers.push(passenger);
      } else if (direction == "right") {
        rıghtDirectionPassengers.push(passenger);
      } else {
        prompt("yok");
      }
    });
  }
}

function addFillSeat(direction) {
  clearSeats();
  if (direction > 0) {
    rıghtDirectionPassengers.forEach((person) => {
      const seatNumber = person.seatNumber;
      console.log(seatNumber);
      document.getElementById(seatNumber).classList.add("sold");
    });
  } else if (direction < 0) {
    direct.classList[0] = "ri-arrow-left-line direct";
    console.log(direct.classList[0]);
    console.log(direct.classList[0]);
    leftDirectionPassengers.forEach((person) => {
      const seatNumber = person.seatNumber;
      console.log(seatNumber);
      document.getElementById(seatNumber).classList.add("sold");
    });
  }
}

function clearSeats() {
  let seatsSold = document.querySelectorAll(".sold");
  let seatsSelected = document.querySelectorAll(".selected");

  seatsSold.forEach((seat) => {
    if (seat.parentElement.className == "row") {
      seat.classList.remove("sold");
    }
  });
  seatsSelected.forEach((selected) => {
    if (selected.parentElement.className == "row") {
      selected.classList.remove("selected");
    }
  });
}

clearSeats();
