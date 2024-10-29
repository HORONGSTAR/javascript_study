const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization:
         'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYjIwMzYyY2QzOWJlMDZhYmFmM2YzNDE1MDlmZjZmMiIsIm5iZiI6MTczMDA3NjA3Ni4wMTYwNjEsInN1YiI6IjY3MWFlOGM1YTRhYzhhNDMyYzVjMjEyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HXMgl5DUZN9JUZ9hEA8SH4ifWUdtxykDP0KHBEAjHy4',
   },
}

const genresOptions = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization:
         'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYjIwMzYyY2QzOWJlMDZhYmFmM2YzNDE1MDlmZjZmMiIsIm5iZiI6MTczMDA5OTY3OS45MzMwOTksInN1YiI6IjY3MWFlOGM1YTRhYzhhNDMyYzVjMjEyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.589QDGrUBOiA-rnZTs5my4ebZy0bGac9o5GBDnKMkDs',
   },
}

const url = 'https://api.themoviedb.org/3/tv/popular?language=ko-KR&page=1'
const genresUrl = 'https://api.themoviedb.org/3/genre/tv/list?language=ko'

const getTVseries = async (url) => {
   try {
      const response = await fetch(url, options)
      const genresResponse = await fetch(genresUrl, genresOptions)
      const date = await response.json()
      const genresDate = await genresResponse.json()
      const results = date.results
      const genres = genresDate.genres

      const container = document.querySelector('main .container')
      let rowsHtml = ''
      for (let i = 0; i < 20; i += 2) {
         let rowHtml = '<div class="row series">'
         for (let j = 0; j < 2; j++) {
            const index = i + j

            if (index >= results.length) break
            const series = results[index]
            const imgSrc = `https://image.tmdb.org/t/p/w300${series.poster_path}`
            const genreIds = series.genre_ids
            let genreNames = []

            for (let genre of genres) {
               for (let genreId of genreIds) {
                  if (genre.id == genreId) {
                     genreNames.push(`<button type="button " class="btn btn-outline-secondary" >#${genre.name}</button> `)
                  }
               }
            }
            genreNames = String(genreNames).replaceAll(',', ' ')

            rowHtml += `
            <div class="col-sm-5 my-2">
            <a href="./tv-detail.html?series_id=${series.id}">
            <div class="card">
               <div class="row" style="height:100%;">
                  <div class="col-md-4 img-box" style="text-align:center">
                  <img src="${imgSrc}" alt="${series.name}" class="rounded-start img-fluid"/>
                  </div>
                  <div class="col-md-8 text-box ">
                     <div class="card-body ">
                     <h6 class="card-title">${series.name}</h6>
                     <p class="card-text ellipsis"> ${!series.overview ? '<i>등록된 정보가 없습니다.</i>' : series.overview}</p>
                     <p class="card-text">평점 ${!series.vote_average ? '미반영' : series.vote_average.toFixed(1) + '점'}</p>
                     <p class="card-text hashtag-ellipsis">${genreNames}</p>
                     </div>
                  </div>
               </div>
            </a>
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

getTVseries(url)
