/*
 * (C) 2016 Seth Lakowske
 */

var EventEmitter = require('events');
var h = require('virtual-dom/h');
var ListView = require('slak-listview');

function clone(object) {
    return JSON.parse(JSON.stringify(object));
}

/*
 * A program view made up of two lists: elements and programs.
 * Users can add elements to the program list. A Slak component uses virtual-dom.
 * 
 * @param programView where elements will be added
 * @param elementsView where elements can be viewed
 */
function ProgramComponent(programView, elementsView) {
    elementsView.events.on('add', function(state, item) {
        var progItem = clone(item);
        progItem.editMode = false;
        programView.items.push(progItem);
    })

    programView.events.on('remove', function(state, item) {
        ListView.remove(programView, item);
    })

    elementsView.events.on('remove', function(state, item) {
        ListView.remove(elementsView, item);
    })
    
    return {
        editMode: false,
        programView: programView,
        elementsView: elementsView,
        events : new EventEmitter()
    }
    
}

function render(state) {
    function emitEvent(name) {
        return function(ev) {
            state.events.emit(name, state, ev)
        }
    }

    var newButton = h('input', {type : 'button', value : 'New', onclick : emitEvent('newProgram')})
    var save  = ('div', [
        'Name: ',
        h('input.duration', {type : 'text', id : 'programName', value : state.programView.name, onchange : emitEvent('programName')}),
        h('input', {type : 'button', value : 'Save', onclick : emitEvent('save')})
    ])
    
    var edit   = h('a', {href:'#', style: 'float: right', onclick : function() {
        state.editMode = !state.editMode;
    }}, 'Edit');

    var components = [edit];

    if (state.editMode) {
        components.push(save);
        components.push(newButton);        
        state.programView.remove = true;
    } else {
        state.programView.remove = false;
    }

    components.push(ListView.render(state.programView));

    if (state.editMode) {
        components.push(ListView.render(state.elementsView));
    }

    return h('div', components);
}

ProgramComponent.render = render;

module.exports = ProgramComponent;
