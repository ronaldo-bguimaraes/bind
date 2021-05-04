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

`attr` é um atribubo criado pelo initBind que é anexado a cada elemento com o atributo `bind`. Ele
contém o nome do atributo que vem antes do `:`

Exemplo:

Em `<span bind="textContent:name"></span>` o `attr` será `textContent`