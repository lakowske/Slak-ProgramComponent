# slak-programcomponent
Create a program from a set of elements.  A unidirectional virtual-dom component.

# Import

``` js
//Import the module.
//
var ProgramComponent = require('slak-programcomponent');
```

# Construct

``` js
var ProgramComponent = require('slak-programcomponent');
var ListView         = require('slak-listview').ListView;
var view             = require('./view');

var programState = ListView([], view.elementToTree, 'Schedule', 'Add an activity (e.g. bell, wood block) from the activity palette, then click start.');
var activityState = ListView([], view.elementToTree, '', '', true);

// A program component is made up of two ListViews
var programComponent = ProgramComponent(programState, activityState);
```

# Render

``` js

var eventBus = new EventEmitter();
var emit     = eventBus.emit.bind(eventBus);

// Render a programComponent to a hyperscript tree with the given state.
var programComponent = ProgramComponent.render(state.programComponent);
```
