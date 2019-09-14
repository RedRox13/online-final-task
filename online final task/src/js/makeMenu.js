import mediator from "./mediator";

export default function makeMenu(data) {
  let uniqYears = [];
  for (let i = 0; i < data.length; i++) {
    let year = data[i]["release_date"].slice(0, 4);
    if (uniqYears.indexOf(year) === -1) {
      uniqYears.push(year);
    }
  }
  mediator.publish("showMenu", {
    uniqYears: uniqYears,
    data: data
  });
}
