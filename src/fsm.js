class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config)
    {
        this.usteps=[];
        this.rsteps=[];
        this.begin=config.initial;
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
            this.usteps.push(this.initial);
            this.rsteps=[];
            this.initial=state;
        }
        else
        {
            throw new Error();
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger (event) {
        if (event==='get_hungry'){
            if (this.initial==='sleeping'||this.initial==='busy'){
                this.rsteps=[];
                this.usteps.push(this.initial);
                this.initial='hungry';
            }
            else {
                throw new Error();
            }

        }
        else if (event==='get_tired') {
            if (this.initial==='busy') {
                this.rsteps=[];
                this.usteps.push(this.initial);
                this.initial = 'sleeping';
            }
            else {
                throw new Error();
            }
        }
        else if (event==='study') {
            if (this.initial==='normal') {
                this.rsteps=[];
                this.usteps.push(this.initial);
                this.initial = 'busy';
            }
            else {
                throw new Error();
            }
        }
        else if (event==='eat') {
            if(this.initial==='hungry') {
                this.rsteps=[];
                this.usteps.push(this.initial);
                this.initial = 'normal';
            }
            else {
                throw new Error();
            }
        }
        else if (event==='get_up') {
            if (this.initial==='sleeping') {
                this.rsteps=[];
                this.usteps.push(this.initial);
                this.initial = 'normal';
            }
            else {
                throw new Error();
            }
        }
        else{
            throw new Error();
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.initial=this.begin;
        this.rsteps=[];
        this.usteps=[];

    }
    //

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event)
    {
        if (event==='get_hungry')
        {
            return ['busy', 'sleeping'];

        }
        else if (event==='get_tired') {
            return ['busy'];
        }
        else if (event==='study') {
            return ['normal'];
        }
        else if (event==='eat') {
            return ['hungry'];
        }
        else if (event==='get_up') {
            return ['sleeping']
        }
        else if (event===undefined) {
           return ['normal', 'busy', 'hungry', 'sleeping'];
        }
        else{
            return [];
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this.usteps.length===0)
        {
            return false;
        }
        else {
            this.initial=this.usteps.pop();
            this.rsteps.push(this.initial);
            return true;
        }

    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.rsteps.length===0) {
            return false;
        }
        else {
            this.usteps.push(this.initial);
            this.initial = this.rsteps.pop();
            return true;
        }

    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.usteps=[];
        this.rsteps.clear=[];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
