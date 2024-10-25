// src/directives/lazyLoad.js
export default {
  // 指令的钩子函数有mounted、updated、unmounted
  // 选择绑定指令的元素在DOM渲染时调用
  // el是指令绑定的DOM元素，， binding是指令传入的图片URL
  mounted(el, binding) {
    const loadImage = () => {
      el.src = binding.value; // 将真实的图片 URL 赋值给 img 标签的 src 属性
    };

    // 定义一个观察者
    const observer = new IntersectionObserver((entries) => {
      // 回调函数会在元素出现在可视区域，以及离开的时候触发
      // entries保存每个被观察DOM的信息
      entries.forEach((entry) => {
        // isIntersecting属性判断目标元素当前是否可见
        if (entry.isIntersecting) {
          loadImage(); //加载图片
          observer.unobserve(el); // 图片加载后停止观察
        }
      });
    });

    observer.observe(el); // 观察图片元素
  },
};

/* IntersectionObserverEntry 的常用属性：
1.entry.isIntersecting：
  表示元素是否进入了视口或根元素的可见区域。
  true 表示元素进入了视口，false 表示元素离开了视口。
2.entry.target：
  被观察的目标 DOM 元素（例如，你要懒加载的图片 img 元素）。
3.entry.intersectionRatio：
  交叉比例，表示目标元素有多少部分进入了视口。例如，值为 1 表示目标元素完全进入视口，0 表示目标元素完全在视口之外。
4.entry.boundingClientRect：
  目标元素的边界矩形信息，类似 getBoundingClientRect() 返回的值，包含目标元素的大小和位置。
5.entry.intersectionRect：
  目标元素与视口交叉区域的矩形信息。
6.entry.rootBounds：
  根元素的矩形信息，表示视口或自定义根元素的大小和位置
*/
