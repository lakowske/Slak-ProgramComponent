# Slak-ProgramComponent
Create a program from a set of elements.  A unidirectional virtual-dom component.

# Import

``` js
//Import the module.
//
var ProgramComponent = require('Slak-ProgramComponent');
```

# Construct

``` js
var view          = require('./view');
var ListView      = require('Slak-ListView').ListView;

var ProgramComponent = require('Slak-ProgramComponent');
var programState = ListView([], view.elementToTree, 'Schedule', 'Add an activity (e.g. bell, wood block) from the activity palette, then click start.');
var activityState = ListView([], view.elementToTree, '', '', true);

// A program component is made up of two ListViews
var programComponent = ProgramComponent(programState, activityState, emit);
```

# Render

``` js

var eventBus = new EventEmitter();
var emit     = eventBus.emit.bind(eventBus);

// Render a programComponent to a hyperscript tree with the given state and event emitter
var programComponent = ProgramComponent.render(state.programComponent, emit);

```


