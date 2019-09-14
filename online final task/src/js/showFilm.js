import mediator from "./mediator";

export default function showFilm(data) {
  let defaultPic = document.getElementById("def_pic");
  defaultPic.style.display = "none";
  let main = document.getElementById("film_box");
  main.style.display = "grid";

  addPoster(data);
  addCanvas(data);
  addTitle(data);
  addDescription(data);
  addMoreInfo(data);
  cleanHiddenInfo();
  mediator.publish("markButton", data["release_date"].slice(0, 4));
}

function addPoster(data) {
  let moviePosterUrl = "https://image.tmdb.org/t/p/w500";
  let poster = document.getElementsByClassName("poster");
  let posterUrl = `${moviePosterUrl}` + `${data["poster_path"]}`;
  let posterHolder = poster[0].children[0];
  posterHolder.src = posterUrl;
}

function addCanvas(data) {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  canvas.width = 150;
  canvas.height = 150;
  canvas.style.width = "3vw";
  canvas.style.height = "3vw";
  let vote = data["vote_average"];
  let score = data["vote_average"] * 0.2 - 0.5;
  let centerX = canvas.width / 2;
  let centerY = canvas.height / 2;
  let green = "#21D07A";
  let darkGreen = "#204529";
  let yellow = "#D2D531";
  let darkYellow = "#423D0F";
  let red = "#DB2360";
  let darkRed = "#571435";
  let color;
  let subcolor;
  if (vote > 6.6) {
    color = green;
    subcolor = darkGreen;
  } else if (vote < 3.3) {
    color = red;
    subcolor = darkRed;
  } else {
    color = yellow;
    subcolor = darkYellow;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.arc(centerX, centerY, canvas.width / 2 - 4, 0, 2 * Math.PI, false);
  ctx.fillStyle = "black";
  ctx.fill();

  if (vote > 0) {
    ctx.font = "bold 2.4vw Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(`${vote * 10}%`, centerX, centerY + 15);
  } else {
    ctx.font = "bold 2.4vw Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(`NR`, centerX, centerY + 15);
  }

  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.lineWidth = 10;
  ctx.strokeStyle = subcolor;
  ctx.arc(centerX, centerY, canvas.width / 2 - 16, 0 * Math.PI, 2 * Math.PI);
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.lineWidth = 10;
  ctx.strokeStyle = color;
  ctx.arc(
    centerX,
    centerY,
    canvas.width / 2 - 16,
    -0.5 * Math.PI,
    score * Math.PI
  );
  ctx.stroke();
}

function addTitle(data) {
  let title = document.getElementsByClassName("film_title")[0].children[0];
  title.textContent = `${data["title"]}`;
  let date = document.getElementsByClassName("film_title")[0].children[1];
  let formatedDate = formatDate(data["release_date"]);
  date.textContent = formatedDate;
}

function formatDate(date) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let dateObj = new Date(date);
  let day = dateObj.getDate();
  let monthNumber = dateObj.getMonth();
  let year = dateObj.getFullYear();
  return months[monthNumber] + " " + day + ", " + year;
}

function addDescription(data) {
  let description = document.getElementsByClassName("film_description")[0]
    .children[0];
  description.textContent = `${data["overview"]}`;
}

function addMoreInfo(data) {
  let paragraph = document.getElementsByClassName("film_addition")[0]
    .children[0];
  paragraph.textContent = "More Info";
  let listener = () => {
    addHiddenInfo(data, paragraph, listener);
  };
  paragraph.addEventListener("click", listener);
}

function addHiddenInfo(data, parent, listener) {
  let language = document.getElementsByClassName("hiddenInfo")[0].children[0];
  language.textContent = `Language: ${data["original_language"]}`;
  let rating = document.getElementsByClassName("hiddenInfo")[0].children[1];
  let hiddenInfo = document.getElementsByClassName("hiddenInfo")[0];
  hiddenInfo.style.display = "block";
  if (data["vote_average"]) {
    rating.textContent = "Rating: ";
    for (let k = 0; k < data["vote_average"] / 2; k++) {
      let emptyStar = document.createElement("i");
      emptyStar.className = "fas fa-star";
      rating.appendChild(emptyStar);
    }
    if (rating.children.length < 5) {
      for (let j = 0; j <= 5 - rating.children.length; j++) {
        let fullStar = document.createElement("i");
        fullStar.className = "far fa-star";
        rating.appendChild(fullStar);
      }
    }
  } else {
    rating.textContent = "Rating: No votes yet";
  }
  parent.removeEventListener("click", listener);
}

function cleanHiddenInfo() {
  let hiddenInfo = document.getElementsByClassName("hiddenInfo")[0];
  hiddenInfo.style.display = "none";
  let language = hiddenInfo.children[0];
  language.textContent = "";
  let rating = hiddenInfo.children[1];
  rating.textContent = "";
}
