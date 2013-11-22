#floating-label

Floating label plugin

##Installation

###Bower

`bower install floating-label`

###Manual Download

- [Development]()
- [Production]()

##Usage

Basic usage:

```javascript
// No Options
$('[placeholder]').floatingLabel();

// Options
$('[placeholder]').floatingLabel({
  animateDuration: 200
});
```

#### Options

```
inputEvents: 'propertychange keyup input paste'
labelStyles: {
  display: 'block',
  position: 'relative'
}
animateDuration: 100
animateEasing: function (x, t, b, c, d) {
  return -c * ((t=t/d-1)*t*t*t - 1) + b;
}
```

## API

#### Changing Placeholder

This will change both the palceholder and the label.

```javascript
$('#someInput').floatingLabel();
$('#someInput').floatingLabel('setPlaceholder', 'New Placeholder');
```


##Development

###Requirements

- node and npm
- bower `npm install -g bower`
- grunt `npm install -g grunt-cli`

###Setup

- `npm install`
- `bower install`

###Run

`grunt dev`

or for just running tests on file changes:

`grunt ci`

###Tests

`grunt mocha`
