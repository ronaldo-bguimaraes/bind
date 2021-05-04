import { createState, initBind } from "./bind.js";

const data = {};

data.name = createState("ronaldo");

data.idade = createState("19");

data.hora = createState("");

initBind(document.body, data);

setInterval(function () {

  const date = new Date();

  data.hora.value = date.toLocaleTimeString().bold();

})

window.data = data;