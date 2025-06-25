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
