# millio-widgets

This is the source code for the millio-widgets that is used in the millo-dashboard code.

### To get going
Checkout repo and then run ```npm install``` (install node/npm if you do not have it already installed)

To use it in your package you can do

#### Widget lists
```
import MilloWidgets from 'millio-widgets';

export default () => {
    <MilloWidgets widgets={WidgetExampleConfig}/>;
}
```

### Single widgets
```
import { WidgetComponent } from 'millio-widgets';

export default ({ widget }) => {
    return <WidgetComponent widget={widget}/>
};
```

It also exposes all widgets as a named export
```
    import { Radial, Percentage, Temperature, NumericHistory, Map, SimpleRedirect, HealthMonitor, HumanReadbleTimestamp } from 'millio-widgets';
```

To run the test applicaiton run  ```npm start```

The millio widgets example app should now be available on ```localhost:3000```.
When you do changes to the code it will updated automatically.

#### Building Less
If you want to rebuild the styles run ```npm run style```

### Tests
The unit test are written using [chaijs](http://chaijs.com/api/bdd/) bdd assertions, and running on [mocha](https://mochajs.org/).

To run the tests once run ```npm test```

To run the continuously (every time the code changes they will re run) run ```npm run watch```

For testing and assert on jsx built DOM we're using a wrapper on top of reacts test utils ([enzyme](http://airbnb.io/enzyme/)) where the react components can be rendered shallowly or mounted in jsdom.

#### To build a new release
*  ```npm run build```
