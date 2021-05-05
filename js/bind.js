// cria um novo estado
function createState(defaultValue) {

  const state = { value: defaultValue };

  // objeto set para armazenar os elementos
  state.nodeList = new Set();

  return {

    get value() {
      // retorna o valor guardado no estado
      return state.value;
    },

    set value(value) {
      // atualiza o valor do state
      state.value = value;

      // atualiza o valor dos elementos
      this.updateNode(state.value);
    },

    bind(node) {
      // adiciona o node ao nodeList
      state.nodeList.add(node);
    },

    updateNode(value) {
      // percorre os elementos no nodeList
      for (const node of state.nodeList) {

        // atualiza o valor do elemento
        node.updateNode(value);
      }
    }
  }
}

// faz a ligação de todos os elementos do parentNode com o estado
function initBind(parentNode, data) {

  // selectiona todos os elementos com o atributo bind
  const list = parentNode.querySelectorAll("[bind]");

  // conecta o elemento ao estado
  function bindNode(node, attr, state) {

    // remove a marcação de bind do elemento
    node.removeAttribute("bind");

    // adiciona o attr do bind no elemento
    node.attr = attr;

    // adiciona o state ao elemento
    node.state = state;

    // função para atualizar o stado
    node.updateState = function (value) {
      state.value = value;
    }

    // função para atualizar o elemento
    node.updateNode = function (value) {
      this[attr] = value;
    }

    // adicina o elemento ao estado
    state.bind(node);

    // executa a primeira iteração
    node.updateState(node.state.value);
  }

  // percorre a lista de elementos
  for (const node of Array.from(list)) {

    // extrai o attr e name do atributo bind
    const [attr, name] = node.getAttribute("bind").split(":");

    // cria a ligação com o elemento e o estado
    bindNode(node, attr, data[name]);
  }
}

export { createState, initBind }