const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization:
         'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYjIwMzYyY2QzOWJlMDZhYmFmM2YzNDE1MDlmZjZmMiIsIm5iZiI6MTczMDA5OTY3OS45MzMwOTksInN1YiI6IjY3MWFlOGM1YTRhYzhhNDMyYzVjMjEyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.589QDGrUBOiA-rnZTs5my4ebZy0bGac9o5GBDnKMkDs',
   },
}

const urlParams = new URLSearchParams(window.location.search)
const seriesId = urlParams.get('series_id')

const seriesDetailUrl = `https://api.themoviedb.org/3/tv/${seriesId}?language=ko-KR`
const mainContainer = document.querySelector('main .container')

const getDetailSeries = async (seriesDetailUrl) => {
   try {
      const response = await fetch(seriesDetailUrl, options)
      const data = await response.json()

      let getYear = new Date(data.first_air_date)
      const imgSrc = `https://image.tmdb.org/t/p/w300${data.poster_path}` //w->width
      let rowHtml = `
       <div class="row">
            <div class="col-sm-3" style="text-align:center";>
                <img src="${imgSrc}" alt="${data.name}" class="poster-detail" style="max-width:100%"/>
            </div>
            <div class="col-sm-9 series-detail">
                <h2>${data.name}(${getYear.getFullYear()})</h2>
                <ul class="series-info">
                <li>원제 ${data.original_name}, (${data.original_language})</li>
                <p> 평점 ${!data.vote_average ? '미반영' : data.vote_average.toFixed(1) + '점'}</p>
                <li>최근 방영일 ${data.last_air_date}</li>
                <li>처음 방영일 ${data.first_air_date}</li>
                <li class="ellipsis">줄거리 ${!data.overview ? '...' : data.overview}</li>
            </div>
        </div>`

      const seasons = data.seasons

      for (let i = 0; i < seasons.length; i++) {
         rowHtml += `<div>
           ${seasons[i].name}  ${!seasons[i].vote_average ? '' : '(평점' + seasons[i].vote_average.toFixed(1) + '점)'}
           <a href="#">보러가기 ${!seasons[i].air_date ? '' : seasons[i].air_date + '방영'} </div>
           `
      }

      mainContainer.innerHTML += rowHtml
   } catch (error) {
      console.log('에러발생', error)
   }
}

getDetailSeries(seriesDetailUrl)
