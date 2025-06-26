async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end"); // asyncTask1
  await async3();
  console.log("async1 final"); // asyncTask3
}

async function async2() {
  console.log("async2");
  await Promise.resolve();
  console.log("async2 end"); // asyncTask2
}

async function async3() {
  console.log("async3");
}

console.log("start");
async1();
console.log("end");

// 1. start
// 2. async1 start
// 3. await async2执行，async1暂停挂起， async2
// 4. await async2让出主线程,将后续async2 end注册微任务,回到主线程
// 5. 主线程end
// 6. 同步代码完成,进入微任务,async2 end
// 7. async2完毕，async1继续执行，async1 end
// 8. 同理await async3执行，async1暂停挂起，async3
// 9. async3 final