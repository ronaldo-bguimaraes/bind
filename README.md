## bind

## Como usar

JavaScript
```
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