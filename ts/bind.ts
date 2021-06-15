interface IObjectState {

  [key: string]: State

}

interface IBindElement extends HTMLElement {

  $name: string;

  $attr: string;

  $state: State;

  updateState(value: any): void;

  updateNode(value: any): void;

  [key: string]: any;

}

class State {

  private $value: any = undefined;

  private $nodeList: Set<IBindElement> = new Set([]);

  public constructor(valueDefault: any) {

    // inicialize value
    this.value = valueDefault;

  }

  public get value() {

    return this.$value;
  }

  public set value(value) {

    this.$value = value;

    // atualiza os elementos com o novo valor
    this.$nodeList.forEach(node => node.updateNode(value));
  }

  public bind(node: IBindElement) {

    return this.$nodeList.add(node);
  }

  public static startBind(objectState: IObjectState, bindElement: HTMLElement) {

    const nodeList: NodeListOf<IBindElement> = bindElement.querySelectorAll("[data-bind]");

    for (const node of nodeList) {

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
            }

            // função para atualizar o elemento
            node.updateNode = function (value) {
              node[node.$attr] = value;
            }

            // adicina o elemento ao $state
            node.$state.bind(node);

            // executa a primeira iteração
            node.updateState(node.$state.value);
          }

          else throw `State '${node.$name}' não encontrado...`;
        }

        else throw `Formato incorreto em '${bind}'...`;
      }
    }
  }
}

export { State, IObjectState };