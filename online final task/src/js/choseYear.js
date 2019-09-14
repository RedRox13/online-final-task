import mediator from "./mediator";
import $ from "jquery";

export default function choseYear(year) {
  let list = document.getElementsByClassName(year);

  $(`.${year}`).on("show.bs.dropdown", function() {
    [].forEach.call(list, function(elem) {
      elem.classList.add("show");
      elem.children[0].setAttribute("aria-expanded", "true");
      elem.children[1].classList.add("show");
    });
  });
  $(`.${year}`).on("shown.bs.dropdown", function() {
    [].forEach.call(list, function(elem) {
      elem.classList.add("show");
      elem.children[0].setAttribute("aria-expanded", "true");
      elem.children[1].classList.add("show");
    });
  });
  $(`.${year}`).on("hide.bs.dropdown", function() {
    [].forEach.call(list, function(elem) {
      elem.classList.remove("show");
      elem.children[0].setAttribute("aria-expanded", "false");
      elem.children[1].classList.remove("show");
    });
  });
  $(`.${year}`).on("hidden.bs.dropdown", function() {
    [].forEach.call(list, function(elem) {
      elem.classList.remove("show");
      elem.children[0].setAttribute("aria-expanded", "false");
      elem.children[1].classList.remove("show");
    });
  });
}
