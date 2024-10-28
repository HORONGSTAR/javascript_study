/* 
options : 서버에게 같이 전달하는 포스트잇 같은 거
method: 'GET', //Restful방식 중 GET방식으로 요청
accept: 'application/json', //저는 json 객체 형태로 데이터를 받을게요~ 라고 서버에게 요청
Authorization: 보안을 위해서 서버에서 주는 인증키
fetch : 서버에 request를 요청하는 자바스크립트에서 제공하는 함수
fetch(request 주소, request 할때 서버에 같이 전달하는 옵션) / 물음표 뒤는 쿼리스트링 : 서버에 보내는 값들
왜? fatch는 promise를 사용할까? (왜 비동기일까?)
promise, async, await -> 비동기
request 해주는 과정을 비동기로 동작시키고 있다
서버에 장애가 있거나 네트워크에 문제가 있거나 했을때 동기적으로 실행이 된다면 사용자는 다른 작업을 할 수가 x -> 따라서 request 작업은 비동기로 구성되어 있다.
promise 객체를 리턴(서버에서 데이터를 가져올때까지 기다린다)
*/

const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization:
         'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYjIwMzYyY2QzOWJlMDZhYmFmM2YzNDE1MDlmZjZmMiIsIm5iZiI6MTcyOTgyNTQzNy43OTM2NTksInN1YiI6IjY3MWFlOGM1YTRhYzhhNDMyYzVjMjEyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Iq8-N3zDVTDbRE9qgO5kGTs3qmqSBVTaMGJjysXAUIw',
   },
}

const url = 'https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1&region=KR'

const getPlatingMovies = async (url) => {
   try {
      const response = await fetch(url, options) // console.log(response) // 기다렸다가 다 가져오면 실행
      const date = await response.json() // await를 지정하는 이유 : fetch는 비동기적으로 실행되므로 서버에서 request해오는 딜레이 시간 중에 실행된다.
      const results = date.results
      const container = document.querySelector('main .container')
      let rowsHtml = '' //모든 row를 담을 문자열 변수
      for (let i = 0; i < results.length; i += 4) {
         let rowHtml = '<div class="row">'

         for (let j = 0; j < 4; j++) {
            const index = i + j
            if (index >= results.length) break //results 배열을 벗어나면 중단

            const movie = results[index]
            rowHtml += `
            <div class="col-sm-3 p-3">
            <div class="card">
            <a href="./detail.html?movie_id=${movie.id}">
               <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top poster" alt="${movie.title}" />
            </a>
            <div class="card-body">
               <p class="card-text title">${movie.title}</p>
               <p class="card-text average">${!movie.vote_average ? '미반영' : movie.vote_average.toFixed(1) + '점'}</p>
            </div>
            </div>
            </div>`
         }
         rowHtml += '</div>'

         rowsHtml += rowHtml
      }

      container.innerHTML = rowsHtml
   } catch (error) {
      console.log('에러발생 : ', error)
   }
}

getPlatingMovies(url)
