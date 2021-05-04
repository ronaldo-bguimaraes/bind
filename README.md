# Bind

## Como usar

JavaScript
```
import { createState, initBind } from "./bind.js";

const data = {};

data.name = createState("Fulano de Tal");

initBind(document.body, data);
```

HTML:

```
<body>
  <span>
    Meu nome é: <span bind="textContent:name"></span>
  </span>
  <input type="text" oninput="updateState(this[attr])" bind="value:name">
</body>
```

O padrão utilizado no HTML é:
`bind="nomeDoAtributo:nomeDoState"`

`attr` é um atribubo criado pela `initBind` function.
Ele é anexado a cada elemento que tenha o atributo `bind`, e contém o nome que vem antes do `:`.
(nome do atributo a ser modificado)

Exemplo:

Em `<span bind="textContent:name"></span>` o `attr` será `textContent`