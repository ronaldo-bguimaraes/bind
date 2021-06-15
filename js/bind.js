class State {
    constructor(valueDefault) {
        this.$value = undefined;
        this.$nodeList = new Set([]);
        // inicialize value
        this.value = valueDefault;
    }
    get value() {
        return this.$value;
    }
    set value(value) {
        this.$value = value;
        // atualiza os elementos com o novo valor
        this.$nodeList.forEach(node => node.updateNode(value));
    }
    static bind(objectState, node) {
        const bind = node.dataset.bind;
        if (bind !== undefined) {
            const split = bind.split(":");
            if (split.length === 2) {
                // atribui os values
                [node.$name, node.$attr] = split;
                node.$state = objectState[node.$name];
                if (node.$state) {
                    // função para atualizar o stado
                    node.updateState = function (value) {
                        node.$state.value = value;
                    };
                    // função para atualizar o elemento
                    node.updateNode = function (value) {
                        node[node.$attr] = value;
                    };
                    // adicina o elemento ao $state
                    node.$state.$nodeList.add(node);
                    // executa a primeira iteração
                    node.updateState(node.$state.value);
                }
                else
                    throw `State '${node.$name}' não encontrado...`;
            }
            else
                throw `Formato incorreto em '${bind}'...`;
        }
    }
    static bindChildren(objectState, parentNode) {
        const nodeList = parentNode.querySelectorAll("[data-bind]");
        for (const node of nodeList) {
            State.bind(objectState, node);
        }
    }
}
export { State };
