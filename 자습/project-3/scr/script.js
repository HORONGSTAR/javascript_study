const cards = document.querySelectorAll('.card')
const value = document.querySelectorAll('.result-area')
const button = document.querySelectorAll('.button')
const score = document.querySelector('.score')

const cardNum = [Math.floor(Math.random() * 7) + 2]
let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9]
nums = nums.filter((n) => n !== cardNum[0])
cardNum.push(nums[Math.floor(Math.random() * nums.length)])

cards[0].textContent = cardNum[0]

const up = () => (cardNum[0] < cardNum[1] ? [true, '<'] : [false, '>'])
const down = () => (cardNum[0] > cardNum[1] ? [true, '>'] : [false, '<'])

function result(callback, name) {
   for (let btn of button) btn.setAttribute('disabled', true)
   name ? (button[0].className = 'button-color') : (button[1].className = 'button-color')

   cards[1].style.transition = 'transform 0.5s'
   cards[1].style.transform = 'rotateY(0deg)'

   setTimeout(() => {
      cards[1].textContent = cardNum[1]
   }, 100)

   setTimeout(() => {
      value[0].textContent = callback()[1]
   }, 400)

   setTimeout(() => {
      callback()[0] ? (value[1].textContent = 'You Win!😉') : (value[1].textContent = 'Game Over😅')
      value[1].style.transition = 'transform 0.5s'
      value[1].style.transform = 'translateY(-10px)'
   }, 800)

   setTimeout(() => {
      value[2].innerHTML = `
               
               <button onClick="gameReplay()">재도전</button>
               `
   }, 1500)
}

const gameReplay = () => (eventStart = false)
