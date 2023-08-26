# Practice Notes

## Shared

### How to control code style?

  eslint, prettier

### Directory structure for test code?

Tests for components, functions, etc. should be placed with source code.
Easy to reference source code.
Test for main flow should be placed to `__tests__`.

```
- src
  - __tests__
  - utils
    - date.js
    - date.test.js
  - others...
```

### How to share type definition for type checking?

## Server

### How to use ES Module?

### How to test mongodb?

## Client

### How to preload state in development mode?

for development, proxy `preloadState.js` to get preload state.

```html
<script src="/preloadState.js"></script>
```

### How to format date by culture or country?

## CI / CD
