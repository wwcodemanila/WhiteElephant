const storage = window.localStorage;
const target = document.getElementById("message");

function showRefreshButton(text) {
  const button = document.getElementById("button");
  button.innerText = text;
  button.classList.add('visible');
}

function seedStorage() {
  let n = Number(prompt("How many participants are there?"));

  if (Number.isInteger(n) && n > 0) {
    let shuffled = _.shuffle(Array.from(Array(n).keys()));
    storage.setItem("shuffled", JSON.stringify(shuffled));
    storage.setItem("index", 0);
    showRefreshButton("Let's go!");
  } else {
    seedStorage();
  }
}

function showNextNumber() {
  let shuffled = JSON.parse(storage.getItem("shuffled"));
  let index = Number(storage.getItem("index"));

  if (index < shuffled.length) {
    let person = shuffled[index] + 1

    target.innerHTML = 'Person <div class="person">#' + person + '</div> come on down!';
    showRefreshButton("Next!");
    storage.setItem("index", index + 1);
  } else {
    target.innerHTML = 'All done!';
    storage.clear();
    showRefreshButton("Again!");
  }
}


(function initialize() {
  if (storage.getItem("shuffled") === null) {
    seedStorage();
  } else {
    showNextNumber();
  }
})();
