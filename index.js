let imgCounter = 1;
function fetchWheater(city) {
  fetch(`https://goweather.herokuapp.com/weather/${city}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.temperature === "") {
        throw new InvalidCity(`The "${city}" was not found in our database.`);
      } else {
        document.querySelector(
          "#wheatherDiv"
        ).innerHTML = `Current weather in ${
          city.charAt(0).toUpperCase() + city.slice(1)
        } is ${data.temperature}`;
      }
    })
    .catch((err) => {
      document.querySelector("#wheatherDiv").innerHTML = err.message;
    });
}
fetchWheater("Skopje");
let form = document.getElementById("form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  fname = document.getElementById("fname");
  fetchWheater(fname.value);
});
function checkGal(param) {
  fetch(`https://picsum.photos/v2/list?page=${param}&limit=2`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.querySelector(
        "#twoImages"
      ).innerHTML = `<div class="col-1"></div>
          <div class="col-lg">
              <img src="${data[0].download_url}" class="w-100 h-75" alt="" srcset="">
              <p>Image by: ${data[0].author}</p>
          </div>
          <div class="col-lg">
              <img src="${data[1].download_url}" class="w-100 h-75" alt="" srcset="">
              <p>Image by: ${data[1].author}</p>
          </div>
          <div class="col-1"></div>`;
    });
}

checkGal(imgCounter);
document.getElementById("prevBtn").disabled = true;
let numbTickets = document.getElementById("numbTickets");
document.getElementById("prevBtn").addEventListener("click", function () {
  if (imgCounter == 2) {
    document.getElementById("prevBtn").disabled = true;
  }
  imgCounter--;
  checkGal(imgCounter);
});
document.getElementById("nextBtn").addEventListener("click", function () {
  imgCounter++;
  checkGal(imgCounter);
  document.getElementById("prevBtn").disabled = false;
});
let totalPrice = 0;
let pricePerTicket = 0;

function changePrice() {
  let ticketWay = document.querySelector(
    'input[name="ticketWay"]:checked'
  ).value;
  switch (document.getElementById("destination").value) {
    case "istanbul":
      if (ticketWay == 1) {
        document.getElementById("pricePerTicket").innerHTML =
          "Price per ticket: 100$";
        pricePerTicket = 100;
      } else {
        document.getElementById("pricePerTicket").innerHTML =
          "Price per ticket: 200$";
        pricePerTicket = 200;
      }
      console.log("1");
      break;
    case "Viena":
      if (ticketWay == 1) {
        document.getElementById("pricePerTicket").innerHTML =
          "Price per ticket: 80$";
        pricePerTicket = 80;
      } else {
        document.getElementById("pricePerTicket").innerHTML =
          "Price per ticket: 160$";
        pricePerTicket = 160;
      }
      break;
    case "Rim":
      if (ticketWay == 1) {
        document.getElementById("pricePerTicket").innerHTML =
          "Price per ticket: 150$";
        pricePerTicket = 150;
      } else {
        document.getElementById("pricePerTicket").innerHTML =
          "Price per ticket: 300$";
        pricePerTicket = 300;
      }
      break;
    default:
      break;
  }
  if (document.getElementById("destination").value !== "Select destination"){
  numbTickets.disabled = false;
  }
}
numbTickets.addEventListener('change',function(){
  if (document.getElementById("destination").value === "Select destination"){
    return;
  }
  if (!numbTickets.value || numbTickets.value <= 0) {
    document.getElementById("buyTicket").disabled = true;
  } else {
    document.getElementById("buyTicket").disabled = false;
  }
})
document.getElementById("destination").addEventListener("change", changePrice);
ticketWayChange = document.getElementById("ticketWay");
ticketWayChange.addEventListener("change", changePrice);

document.getElementById("buyTicket").addEventListener("click", function () {
  let tickets = parseInt(numbTickets.value);
  let totalPaid = tickets * pricePerTicket;
  totalPrice += totalPaid;
  document.getElementById(
    "notification"
  ).innerHTML += `<div class="my-3 p-3 borderSolidGray">
  <h6>Congratulations</h6>
  <p>You just bought ${
    numbTickets.value
  } tickets for ${document.getElementById("destination").value}</p>
  <p class="fw-semibold">Total paid: ${totalPaid}$</p>
</div>`;
  document.getElementById(
    "paidTotal"
  ).innerHTML = `You have paid total ${totalPrice}$`;
});

function InvalidCity(message) {
  this.message = message;
  this.name = "InvalidCity";
}
