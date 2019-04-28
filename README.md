Battery Indicator Element
-----------------------

Battery status indicator custom element.

- Uses [`LitElement`](https://lit-element.polymer-project.org/), a lightweight class that extends `HTMLElement`.

### Usage
```html
<battery-indicator percentage="85"></<battery-indicator>
```

#### Theming
```css
battery-indicator {
  width: 48px;
  height: 48px;
  --charge-fill: #000;
  --charge-fill-opacity: 1.0;
  --background-fill: #000;
  --background-fill-opacity: 0.3;
  --status-fill: #fff;
  --status-fill-opacity: 1.0;
}
```

### Browser Support
This element requires ES2015 language features and the following browser APIs:
- [Custom Elements (V1)](https://caniuse.com/#feat=custom-elementsv1)
- [CSS Variables](https://caniuse.com/#feat=css-variables)

### Development
1. `npm ci`
2. `npm start`
3. <http://localhost:8080>

### To Do
- [ ] Make status scale to fill container with percentage
- [ ] Merge status element into indicator element
- [ ] Reduce height of SVG to about 24px (from 48px)
- [ ] Add test suite
