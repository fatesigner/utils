# animation
跟 [animation](https://www.w3schools.com/css/css3_animations.asp) 相关的操作

## requestAnimationFrame
当你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。
这在执行多次动画时可以提高性能。

```js
import { requestAnimationFrame } from '@fatesigner/animation';

requestAnimationFrame(function() {
  let element = document.getElementById('app');
  element.style.position = 'absolute';
});
```

## cancelAnimationFrame
在浏览器准备下一次的重绘时，你可以选择取消执行某次动画。

```js
import { cancelAnimationFrame, requestAnimationFrame } from '@fatesigner/animation';

let id = requestAnimationFrame(function() {
  let element = document.getElementById('app');
  element.style.position = 'absolute';
});

cancelAnimationFrame(id);
```
