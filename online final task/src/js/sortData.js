import mediator from "./mediator";

export default function sortData(data) {
  let compare = (a, b) => {
    if (a.release_date > b.release_date) {
      return -1;
    }
  };
  let orderedData = data.results.sort(compare);
  mediator.publish("makeMenu", orderedData);
}
