import { Bind } from "./bind.js";
class State {
    _value;
    _bindList;
    constructor(value) {
        this._value = value;
        this._bindList = new Set();
        this.update();
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
        this.update();
    }
    update() {
        for (const bind of this._bindList) {
            bind.updateNode();
        }
        return this;
    }
    addBind(bind) {
        this._bindList.add(bind);
        return this.update();
    }
    bind(node, parentElement) {
        return this.addBind(new Bind(this, node, parentElement));
    }
    unbind(parentElement) {
        for (const bind of this._bindList) {
            if (bind.parentElement === parentElement) {
                this._bindList.delete(bind);
            }
        }
        return this.update();
    }
}
class DataState {
    static bind(stateMap, parentElement) {
        for (const from in stateMap) {
            const nodeList = parentElement.querySelectorAll(`[bind-from=${from}]`);
            for (const node of nodeList) {
                node.state = stateMap[from].bind(node, parentElement);
            }
        }
    }
    static unbind(stateMap, parentElement) {
        for (const from in stateMap) {
            stateMap[from].unbind(parentElement);
        }
    }
}
export { State, DataState };
