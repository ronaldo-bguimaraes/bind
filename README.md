# Bind

## Como usar

### Exemplo 1 - Mostrando Dados de um `input`

HTML:
```
<body>
  <span>
    Meu nome é: <span bind="textContent:name"></span>
  </span>
  <input type="text" oninput="updateState(this[attr])" bind="value:name">
</body>
```

JavaScript:
```
import { createState, initBind } from "./bind.js";

const data = {};

data.name = createState("Fulano de Tal");

initBind(document.body, data);
```

O padrão utilizado no HTML é:
`bind="nomeDoAtributo:nomeDoState"`

`attr` é um atribubo criado pela `initBind` function.
Ele é anexado a cada elemento que tenha o atributo `bind`, e contém o nome que vem antes do `:`.
(nome do atributo a ser modificado)

Para atualiza o `state` basta criar um evento no elemento, que seja de sua preferência.

Exemplos de implementação:

1° (Recomendada): `oninput="updateState(this[attr])`
2°: `onkeyup="updateState(this[attr])`
2°: `onchange="updateState(this[attr])`

Exemplo de `attr`:

Em `<span bind="textContent:name"></span>` o `attr` será `textContent`

### Exemplo 2 - Contador de cliques

HTML:
```
<body>
  <span>
    Conta cliques: <span bind="textContent:count"></span>
  </span>
  <button type="text" onclick="updateState(this[attr] + 1)" bind="_:count">Clique aqui!</button>
</body>
```

JavaScript:
```
import { createState, initBind } from "./bind.js";

const data = {};

data.count = createState(0);

initBind(document.body, data);
```

### Exemplo 3 - Mostrando o Horário

HTML:
```
<body>
  <span>
    Horário: <span bind="innerHTML:hora"></span>
  </span>
</body>
```

JavaScript:
```
import { createState, initBind } from "./bind.js";

const data = {};

function getTimeBold() {

  const date = new Date();

  return date.toLocaleTimeString().bold();
}

data.hora = createState(getTimeBold());

setInterval(() => data.hora.value = getTimeBold(), 1000);

initBind(document.body, data);
```