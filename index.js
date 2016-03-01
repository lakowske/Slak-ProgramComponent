/*
 * (C) 2016 Seth Lakowske
 */

var h = require('virtual-dom/h');
var ListView = require('Slak-ListView');

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
function ProgramComponent(programView, elementsView, emit) {
    elementsView.events.on('add', function(state, item) {
        var progItem = clone(item);
        progItem.editMode = false;
        programView.items.push(progItem);
        emit('dirty');
    })

    programView.events.on('remove', function(state, item) {
        ListView.remove(programView, item);
        emit('dirty');
    })

    elementsView.events.on('remove', function(state, item) {
        ListView.remove(elementsView, item);
        emit('dirty');    
    })
    
    return {
        editMode: false,
        programView: programView,
        elementsView: elementsView,
    }
    
}

function render(state, emit) {
    function emitEvent(name) {
        return function(ev) {
            emit(name, state, ev)
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
        emit('dirty');
    }}, 'Edit');

    var programHeader = h('h3', 'Schedule');
    var elementsHeader = h('h3', 'Activity Palette');
    var components = [edit];

    if (state.editMode) {
        components.push(newButton);
        components.push(save);
    }

    components.push(programHeader);
    components.push(ListView.render(state.programView, emit));

    if (state.editMode) {
        components.push(elementsHeader);
        components.push(ListView.render(state.elementsView, emit));
    }

    return h('div', components);
}

ProgramComponent.render = render;

module.exports = ProgramComponent;
