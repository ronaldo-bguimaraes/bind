import { Bind, IBindElement } from "./bind.js";

class State<T = any> {

  private _value: T;

  private _bindList: Set<Bind>;

  public constructor(value: T) {

    this._value = value;

    this._bindList = new Set<Bind>();

    this.update();

  }

  public get value(): T {

    return this._value;

  }

  public set value(value: T) {

    this._value = value;

    this.update();

  }

  private update() {

    for (const bind of this._bindList) {

      bind.updateNode();

    }

    return this;

  }

  private addBind(bind: Bind) {

    this._bindList.add(bind);

    return this.update();

  }

  public bind(node: IBindElement, parentElement: Element): this {

    return this.addBind(new Bind(this, node, parentElement));

  }

  public unbind(parentElement: Element) {

    for (const bind of this._bindList) {

      if (bind.parentElement === parentElement) {

        this._bindList.delete(bind);

      }

    }

    return this.update();

  }

}

interface IStateMap {

  [index: string]: State;

}

class DataState {

  public static bind(stateMap: IStateMap, parentElement: Element) {

    for (const from in stateMap) {

      const nodeList: NodeListOf<IBindElement> = parentElement.querySelectorAll(`[bind-from=${from}]`);

      for (const node of nodeList) {

        node.state = stateMap[from].bind(node, parentElement);

      }

    }

  }

  public static unbind(stateMap: IStateMap, parentElement: Element) {

    for (const from in stateMap) {

      stateMap[from].unbind(parentElement);

    }

  }

}

export { State, IStateMap, DataState };