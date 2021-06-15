import { State } from "./bind.js";
const obj = {};
obj.name = new State("Fulano de Tal");
obj.count = new State(0);
obj.number = new State(0);
function getTimeBold() {
    const date = new Date();
    return date.toLocaleTimeString().bold();
}
obj.hora = new State(getTimeBold());
setInterval(() => obj.hora.value = getTimeBold(), 500);
State.startBind(obj, document.body);
