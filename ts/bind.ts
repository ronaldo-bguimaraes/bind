import { State } from "./state.js";

interface IBindElement extends Element {

  state: State;

  [index: string]: any;

}

class Bind {

  private _state: State;

  private _node: IBindElement;

  private _parentElement: Element;

  public constructor(state: State, node: IBindElement, parentElement: Element) {

    this._state = state;

    this._node = node;

    this._parentElement = parentElement;

  }

  public get parentElement() {

    return this._parentElement;

  }

  public updateNode() {

    const show = this._node.getAttribute("bind-to");

    if (show !== null) {

      this._node[show] = this._state.value;

    }

  }

}

export { IBindElement, Bind };