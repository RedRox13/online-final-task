import mediator from "./mediator";
import sendRequest from "./request";
import sortData from "./sortData";
import makeMenu from "./makeMenu";
import showMenu from "./showMenu";
import choseYear from "./choseYear";
import showFilm from "./showFilm";
import markButton from "./markButton";

mediator.subscribe("load", sendRequest);
mediator.subscribe("sortData", sortData);
mediator.subscribe("makeMenu", makeMenu);
mediator.subscribe("showMenu", showMenu);
mediator.subscribe("choseYear", choseYear);
mediator.subscribe("showFilm", showFilm);
mediator.subscribe("markButton", markButton);

mediator.publish("load");
