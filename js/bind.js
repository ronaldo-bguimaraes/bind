class Bind {
    _state;
    _node;
    _parentElement;
    constructor(state, node, parentElement) {
        this._state = state;
        this._node = node;
        this._parentElement = parentElement;
    }
    get parentElement() {
        return this._parentElement;
    }
    updateNode() {
        const show = this._node.getAttribute("bind-to");
        if (show !== null) {
            this._node[show] = this._state.value;
        }
    }
}
export { Bind };
