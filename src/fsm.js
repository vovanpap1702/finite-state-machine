class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config)
    {
        this.initial=config.initial;
        this.states=config.states;
        this.states.normal.transitions.study=config.states.normal.transitions.study;
        this.states.busy.transitions.get_tired=config.states.busy.transitions.get_tired;
        this.states.busy.transitions.get_hungry=config.states.busy.transitions.get_hungry;
        this.states.hungry.transitions.eat=config.states.hungry.transitions.eat;
        this.states.sleeping.transitions.get_hungry=config.states.sleeping.transitions.get_hungry;
        this.states.sleeping.transitions.get_up=config.states.sleeping.transitions.get_up;

    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState()
    {
        return this.initial;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state)
    {
        if(state=="hungry"||state=="busy"||state=="normal"||state=="sleeping")
        {
            this.initial=state;
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {}

    /**
     * Resets FSM state to initial.
     */
    reset() {}

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {}

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {}

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {}

    /**
     * Clears transition history
     */
    clearHistory() {}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
