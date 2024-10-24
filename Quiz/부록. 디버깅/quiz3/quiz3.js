// obj가 배열이 아니기 때문에 for문을 돌릴 수 없습니다.

// const obj = {
//    0: '10',
//    1: '20',
// }

// for (let val of obj) {
//    console.log(val)
// }

const obj = {
   0: '10',
   1: '20',
}

for (let i = 0; i <= 1; i++) {
   console.log(obj[i])
}
