// const obj = {
//    0: '10',
//    1: '20',
// }

// obj는 배열이 아니기 때문에 forEach함수를 사용할 수 없습니다.

const obj = [
   {
      0: '10',
      1: '20',
   },
]

obj.forEach((element) => {
   console.log(element)
})
