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
const mainContainer = document.querySelector('.series-detail')
const addContents = document.querySelector('.add-seasons')

const getDetailSeries = async (seriesDetailUrl) => {
   try {
      const response = await fetch(seriesDetailUrl, options)
      const data = await response.json()

      let getYear = new Date(data.first_air_date)
      const imgSrc = `https://image.tmdb.org/t/p/w300${data.poster_path}` //w->width
      let rowHtml = `
       <div class="row m-3 seriesDetail">
            <div class="col-sm-3" style="text-align:center";>
                <img src="${imgSrc}" alt="${data.name}" class="poster-detail rounded" style="max-width:100%"/>
            </div>
            <div class="col-sm-9 ">
                <h2>${data.name}(${getYear.getFullYear()})</h2>
                <ul>
                <li>원제 ${data.original_name}, ${data.origin_country}(${data.original_language})</li>
                <li>평점 ${!data.vote_average ? '미반영' : data.vote_average.toFixed(1) + '점'}</li>
                <li>최근 방영일 ${data.last_air_date}</li>
                <li>처음 방영일 ${data.first_air_date}</li>
                </ul>
                <hr>
                <p>${!data.overview ? '<i>등록된 정보가 없습니다.</i>' : data.overview}</p>
            </div>
        </div>`

      const seasons = data.seasons
      console.log(seasons)
      rowHtml += '<div class="row justify-content-start m-3">'
      for (let i = 0; i < seasons.length; i++) {
         rowHtml += `<div class="col-sm-3 my-2"><a href="#">
         <div class="card text-bg-light " style="text-align:center">
         <div class="card-body">
            <h6 class="card-title">${data.name}<span class="badge text-bg-secondary mx-2"> ${seasons[i].name} </span></h6>
            <p class="card-text m-1">평점  ${!seasons[i].vote_average ? '- 미반영' : +seasons[i].vote_average.toFixed(1) + '점'}</p>
            <p class="card-text">  ${!seasons[i].air_date ? '<i>등록된 정보가 없습니다.</i>' : seasons[i].air_date + ' 방영'}</p>
         </div>
         <ul class="list-group list-group-flush">
            <li class="list-group-item">
            보러가기
           </li>
         </ul></div></a></div>
           `
      }
      rowHtml += '</div>'
      mainContainer.innerHTML += rowHtml
   } catch (error) {
      console.log('에러발생', error)
   }
}

getDetailSeries(seriesDetailUrl)
