import { DataState, IStateMap, State } from "./state.js";

const stateMap: IStateMap = {

  name: new State("Ronaldo"),

  count: new State(0),

  number: new State(0),

  hora: new State(getTimeBold())

}

function getTimeBold() {

  const date = new Date();

  return date.toLocaleTimeString().bold();

}

setInterval(() => stateMap.hora.value = getTimeBold(), 500);

DataState.bind(stateMap, document.body);