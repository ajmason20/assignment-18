import $ from 'jquery';

var forEach = function(arr, func){
    for(var i = 0 ; i < arr.length; i++){
        func(arr[i], i, arr)
    }
}

function renderActiveTab(theCurrentRoute){
    var previousTabEl = document.querySelector('[class="tabcontent__tab active"]')
    previousTabEl.classList.remove('active')

    var currentTabEl = document.querySelector(`[data-route="${theCurrentRoute}"]`)
    currentTabEl.classList.add('active')
}

var appContainerEl = document.querySelector('#app-container')
var factPageEl = document.querySelector('.fact-page');
var currentRoute = window.location.hash.slice(1);


function controllerRouter() {
  var currentRoute = window.location.hash.slice(1);

  if(currentRoute.length === 0){ currentRoute = 'home' }
  console.log('yah ok')
  renderActiveTab(currentRoute)


  if(currentRoute === 'concerts'){
    $.getJSON('http://apis.is/concerts').then(function(serverRes){
      var htmlTemplate = createConcertPageTemplate( serverRes.results, "Concerts" );
      appContainerEl.innerHTML = htmlTemplate;
      console.log(serverRes.results)
      })
      // return

      function createConcertPageTemplate(dataArray, title){
        var bigHTMLStr = ``

      	forEach(dataArray, function(pageObj){

          if(currentRoute  === 'concerts' ) {
          	bigHTMLStr += `
            <div class="fact-page">
              <div class="col-sm-6 col-md-4">
                <div class="thumbnail">
                  <img src="${pageObj.imageSource}">
                  <div class="caption">
                    <h4>${pageObj.name}</h4>
                    <p>${pageObj.eventHallName}</p>
                    <p>${pageObj.dateOfShow}</p>
                  </div>
                </div>
              </div>
            </div>
        		`
            return '<div class="row">' + bigHTMLStr + '</div>';
          }
        })
        return `
          <h1 class="">${title}</h1>

          <div class="facts-page-container">
            ${bigHTMLStr}
          </div>
        `
      }

    }

  if(currentRoute === 'flight'){
    function createArrivalPageTemplate(dataArray, title){

        var bigHTMLStr = `
                    
                        <div class="flight-column">
                            <div class="panel panel-default">
                              <table class="table">
                              <tbody>
                              <thead>
                                <tr>
                                  <th>Date</th>
                                  <th>Arrival Time</th>
                                  <th>Origin</th>
                                  <th>Airline</th>
                                </tr>
                              </thead>
                                `

        forEach(dataArray, function(pageObj){

            if(currentRoute  === 'flight' ) {
              bigHTMLStr += `
                        <tr>
                          <td>${pageObj.date}</td>
                          <td>${pageObj.plannedArrival}</td>
                          <td>${pageObj.from}</td>
                          <td>${pageObj.airline}</td>
                        </tr>

              `
            }
            return bigHTMLStr + `</tbody></table></div></div></div>`
            })
            return `
            <h1 class="">${title}</h1>
              ${bigHTMLStr}
            `
            }
      $.getJSON('http://apis.is/flight?language=en&type=arrivals').then(function(serverRes){
        var htmlTemplate = createArrivalPageTemplate(serverRes.results, "Flights");
        appContainerEl.innerHTML = htmlTemplate;
        console.log(serverRes.results, 'heheh')
      })


      function createDeparturePageTemplate(dataArray, title){
        console.log("ehhhy")

          var bigHTMLStr2 = `

                        <div class="flight-column2">
                            <div class="panel panel-default">
                              <table class="table">
                              <tbody>
                              <thead>
                                <tr>
                                  <th>Date</th>
                                  <th>Departure Time</th>
                                  <th>Destination</th>
                                  <th>Airline</th>
                                </tr>
                              </thead>
                                `

          forEach(dataArray, function(pageObj){
              console.log(pageObj, 'table data')
              if(currentRoute  === 'flight' ) {
                bigHTMLStr2 += `
                          <tr>
                            <td>${pageObj.date}</td>
                            <td>${pageObj.plannedArrival}</td>
                            <td>${pageObj.to}</td>
                            <td>${pageObj.airline}</td>
                          </tr>
                `
              }
              return bigHTMLStr2 + `</tbody></table></div></div><>/div></div>`
              })
              return `
                ${bigHTMLStr2}
              </div>
              `
              }

      $.getJSON('http://apis.is/flight?language=en&type=departures').then(function(serverRes){
        console.log('ehyyy', serverRes)
        var htmlTemplate = createDeparturePageTemplate(serverRes.results, "Flights");
        appContainerEl.innerHTML += htmlTemplate;
        })



      }

  if(currentRoute === 'rides/samferda-drivers/'){
      $.getJSON('http://apis.is/rides/samferda-drivers/').then(function(serverRes){
        var htmlTemplate = createRidesPageTemplate( serverRes.results, "Carpools" );
        appContainerEl.innerHTML = htmlTemplate;
        console.log(serverRes.results)
        })
        return

        function createRidesPageTemplate(dataArray, title){
          var bigHTMLStr = `<div class="fact-page">
                              <div class="panel panel-default">
                                <table class="table">
                                  <tbody>
                                    <thead>
                                      <tr>
                                        <th>Time of Departure</th><th>From</th><th>To</th>
                                      </tr>
                                    </thead>`

        	forEach(dataArray, function(pageObj){

            if(currentRoute  === 'rides/samferda-drivers/' ) {
          		bigHTMLStr += `
                          <tr>
          								<td>${pageObj.time}</td>
          								<td>${pageObj.from}</td>
                          <td>${pageObj.to}</td>
                          </tr>
          		`
              return bigHTMLStr + `</tbody></table></div></div>`;
            }
          })
          return `
            <h1 class="">${title}</h1>

            <div class="facts-page-container">
              ${bigHTMLStr}
            </div>
          `
        }
      }





    console.log('yoo')

}




var tabContainerEl = document.querySelector('.tabcontent__list')

tabContainerEl.addEventListener('click', function(evt){
	var clickedTabEl = evt.target
	var route = clickedTabEl.dataset.route
	window.location.hash = route
})

controllerRouter()
window.addEventListener('hashchange', controllerRouter )
