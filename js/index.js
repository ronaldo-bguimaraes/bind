import { createState, initBind } from "./bind.js";

const data = {};

data.name = createState("ronaldo");

data.idade = createState("19");

initBind(document.body, data);

window.data = data;