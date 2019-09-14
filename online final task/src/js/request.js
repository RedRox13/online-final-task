import mediator from "./mediator";

export default function sendRequest() {
  let dataUrl =
    "https://api.themoviedb.org/3/discover/movie?api_key=bdd15cf14c644dfa6482135b71e11dab&with_genres=878";
  let xhr = new XMLHttpRequest();
  xhr.open("GET", dataUrl, false);
  xhr.onload = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let parsedData = JSON.parse(xhr.responseText);
      mediator.publish("sortData", parsedData);
    }
  };
  xhr.send(null);
}
