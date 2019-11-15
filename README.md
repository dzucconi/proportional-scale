# proportional-scale

Proportionally scales a rectangle. Pass it the width and height, along with a desired max-height/width or both. Get back the proportionally scaled dimensions along with a padding-bottom value: useful in creating scalable responsive image containers.

## Getting started

```
yarn add proportional-scale
```

```typescript
import { scale } from "proportional-scale";

const { width, height, paddingBottom, scale } = scale({
  width: 800,
  height: 600,
  maxWidth: 400
});
// => {
//   width: 400,
//   height: 300,
//   paddingBottom: "75%",
//   scale: 0.5
// };
```
