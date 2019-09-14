import mediator from "./mediator";

export default function showMenu(dataObj) {
  let years = dataObj["uniqYears"];
  let data = dataObj["data"];
  let menu = document.getElementsByClassName("dropdown");
  let horizontalMenu = document.getElementById("horizontal_menu");
  let verticalMenu = document.getElementById("vertical_menu");
  for (let i = 0; i < years.length; i++) {
    let div1 = createParentDiv(data, years[i], horizontalMenu);
    let div2 = createParentDiv(data, years[i], verticalMenu);
  }
}

function createParentDiv(data, year, target) {
  let div = document.createElement("div");
  div.className = `dropdown ${year}`;
  let button = createButton(year);
  let list = createListItems(data, year);
  div.appendChild(button);
  div.appendChild(list);
  target.appendChild(div);
}

function createButton(year) {
  let button = document.createElement("button");
  button.className = "btn btn-secondary dropdown-toggle";
  button.id = "dropdownMenuButton";
  button.textContent = year;
  button.addEventListener("click", () => {
    mediator.publish("choseYear", year);
  });
  button.setAttribute("type", "button");
  button.setAttribute("data-toggle", "dropdown");
  button.setAttribute("aria-haspopup", "true");
  button.setAttribute("aria-expanded", "false");
  return button;
}

function createListItems(data, year) {
  let div = document.createElement("div");
  div.className = "dropdown-menu";
  div.setAttribute("aria-labelledby", "dropdownMenuButton");
  for (let i = 0; i < data.length; i++) {
    if (data[i]["release_date"].slice(0, 4) === year) {
      let a = document.createElement("a");
      a.className = "dropdown-item";
      a.setAttribute("href", "#");
      a.addEventListener("click", () => {
        mediator.publish("showFilm", data[i]);
      });
      a.textContent = `${data[i]["title"]}`;
      div.appendChild(a);
    }
  }
  return div;
}
