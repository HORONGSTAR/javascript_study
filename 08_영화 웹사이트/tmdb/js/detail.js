const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization:
         'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYjIwMzYyY2QzOWJlMDZhYmFmM2YzNDE1MDlmZjZmMiIsIm5iZiI6MTczMDA3NjA3Ni4wMTYwNjEsInN1YiI6IjY3MWFlOGM1YTRhYzhhNDMyYzVjMjEyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HXMgl5DUZN9JUZ9hEA8SH4ifWUdtxykDP0KHBEAjHy4',
   },
}

//현재 페이지의 url을 이용하여 URLSearchParams 객체 생성
const urlParams = new URLSearchParams(window.location.search)

// 특정 쿼리스트링 값 가져오기
const movieId = urlParams.get('movie_id')
const movieDetailUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`
const movieCreditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`
const mainContainer = document.querySelector('main .container')

// 1. 영화의 상세정보 바인딩
const getDetailMovies = async (movieDetailUrl) => {
   try {
      const response = await fetch(movieDetailUrl, options)
      const data = await response.json()

      const imgSrc = `https://image.tmdb.org/t/p/w300${data.poster_path}` //w->width
      const rowHtml = `
       <div class="row">
            <div class="col-sm-3" style="text-align:center";>
                <img src="${imgSrc}" alt="${data.title}" class="poster-detail" style="max-width:100%"/>
            </div>
            <div class="col-sm-9 movie-detail">
                <h2>${data.title}</h2>
                <ul class="movie-info">
                <li>개봉일 ${data.release_date}</li>
                <li>${data.genres.map((genre) => ' ' + genre.name)}</li>
                <li>${data.runtime}분</li>
                </ul>
                <p>${!data.vote_average ? '미반영' : data.vote_average.toFixed(1) + '점'}</p>
                <p>${data.overview}</p>
            </div>
        </div>`
      mainContainer.innerHTML += rowHtml
      await getCreditsMovies(movieCreditsUrl)
   } catch (error) {
      console.log('에러발생', error)
   }
}

// 2. 출연배우 데이터 바인딩

const getCreditsMovies = async (movieCreditsUrl) => {
   try {
      const response = await fetch(movieCreditsUrl, options)
      const data = await response.json()
      let castRowHtml = '<div class="row" style="margint-top:30px">'

      // 출연배우 6명 출력
      for (let i = 0; i < 6; i++) {
         // 카드가 6개 만들어져야 하므로 누적합산

         let profileImg = !data.cast[i].profile_path ? `./images/person.png` : `https://image.tmdb.org/t/p/w200${data.cast[i].profile_path}`
         // 출연배우의 이미지 정보 X -> null = false -> profile_path 대신 person.png를 대신 제공

         castRowHtml += `
            <div class="col-sm-2 p-3">
               <div class="card">
                  <img src="${profileImg}" alt="${data.cast[i].name}" class="card-img-top" />
                  <div class="card-body">
                     <div class="card-text">${data.cast[i].name}</div>
                  </div>
               </div>
            </div>`
      }
      castRowHtml += '</div>'
      // 기존에 영화 상세정보가 있기 때문에 누적합산을 해야한다.
      mainContainer.innerHTML += castRowHtml
   } catch (error) {
      console.log('에러발생', error)
   }
}

getDetailMovies(movieDetailUrl)
