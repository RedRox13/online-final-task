import mediator from "./mediator";

export default function markButton(year) {
  let list = document.getElementsByClassName("dropdown");
  [].forEach.call(list, function(elem) {
    elem.classList.remove("isActive");
  });
  let choosenYear = document.getElementsByClassName(year);
  [].forEach.call(choosenYear, function(elem) {
    elem.classList.add("isActive");
  });
}
