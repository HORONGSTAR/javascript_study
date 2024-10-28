google.charts.load('current', { packages: ['corechart'] })
google.charts.setOnLoadCallback(getSheetData)
function getSheetData() {
   const sheetId = '1O9pFJkBVJMAkpYvwuTF3scylDvNe7VsIGgLMLJCrpR4'
   const sheetGid = 'gid=0'
   var query = new google.visualization.Query(`https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?${sheetGid}`)
   query.send(DataQuery)
}

function DataQuery(response) {
   const mainContainer = document.querySelector('main > .container')
   var originData = response.getDataTable()
   let datas = originData.Wf

   datas = datas
      .map((data) => data.c)
      .map((data) => data.filter((dt) => dt))
      .map((data) => data.map((dt) => dt.v))

   let content = ''

   datas.forEach((data) => {
      content += `<div>`
      data.forEach((dt) => {
         content += `
         <span>${dt}</span>
      `
      })
      content += `</div>`
   })

   mainContainer.innerHTML += content
}

function arrDivide(arr, num) {
   var newArr = []
   for (let i = 0; i < arr.length; i += num) {
      let value
      value = arr.slice(i, i + num)
      newArr.push(value)
   }
   return newArr
}
