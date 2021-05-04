import { createState, initBind } from "./bind.js";

const data = {};

data.name = createState("ronaldo");

initBind(document.body, data);

window.data = data;