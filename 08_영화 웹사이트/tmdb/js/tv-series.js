const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization:
         'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYjIwMzYyY2QzOWJlMDZhYmFmM2YzNDE1MDlmZjZmMiIsIm5iZiI6MTczMDA3NjA3Ni4wMTYwNjEsInN1YiI6IjY3MWFlOGM1YTRhYzhhNDMyYzVjMjEyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HXMgl5DUZN9JUZ9hEA8SH4ifWUdtxykDP0KHBEAjHy4',
   },
}

const url = 'https://api.themoviedb.org/3/tv/popular?language=ko-KR&page=1'

const getTVseries = async (url) => {
   try {
      const response = await fetch(url, options)
      const date = await response.json()
      const results = date.results

      console.log(results)

      const container = document.querySelector('main .container')
      let rowsHtml = ''
      for (let i = 0; i < 20; i += 2) {
         let rowHtml = '<div class="row series">'
         for (let j = 0; j < 2; j++) {
            const index = i + j
            if (index >= results.length) break
            const series = results[index]
            const imgSrc = `https://image.tmdb.org/t/p/w300${series.poster_path}`
            rowHtml += `
            <div class="col-sm-6 my-1">
            <a href="./tv-detail.html?series_id=${series.id}">
            <div class="card">
               <div class="row" style="height:100%;">
                  <div class="col-md-6 img-box" style="text-align:center">
                  <img src="${imgSrc}" alt="${series.name}" class="rounded img-fluid"/>
                  </div>
                  <div class="col-md-6 text-box">
                     <div class="card-body">
                     <h5 class="card-title">${series.name}</h5>
                     <p class="card-text ellipsis">${!series.overview ? '...' : series.overview}</p>
                     <p class="card-text">평점 ${!series.vote_average ? '미반영' : series.vote_average.toFixed(1) + '점'}</p>
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
