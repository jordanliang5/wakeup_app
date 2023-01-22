function padZero(x) {
    if (x < 10) {
        x = "0" + x;
    }
    return x;
}

function displayTime(){
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    var session = "AM";

    if (h == 0){
        h = 12;
    }
    if (h > 12){
        h-=12;
        session = "PM";
    }
    h = padZero(h);
    m = padZero(m);
    s = padZero(s);

    var time = h + ":" + m + ":" + s + " " + session;
    document.getElementById("time").innerText = time;
    document.getElementById("time").textContent= time;

    setTimeout(displayTime, 1000);
}

function displayDate() {
    var date = new Date();
    var day = date.getDate();
    var month = date.toLocaleString('en-US', { month: 'long'});
    var year = date.getFullYear();

    day = padZero(day);
    var date = day + " " + month + " " + year;
    document.getElementById("date").innerText = date;
    document.getElementById("date").textContent= date;

    setTimeout(displayDate, 86400);
}

function changeBackground() {
    var img = document.getElementById('banner-img').src;
    if (img.indexOf('bg-morn.jpg') != -1) {
        document.getElementById('banner-img').src = 'images/bg-night.jpg';
    } else {
        document.getElementById('banner-img').src = 'images/bg-morn.jpg';
    }
}

const body = document.querySelector('body');
const toggle = document.getElementById('theme-toggle');
toggle.onclick = function() {
    toggle.classList.toggle('dark-mode');
    body.classList.toggle('dark-mode');
    changeBackground();
}

function fetchWeather() {
    window.addEventListener('load', () => {
        let long;
        let lat;

        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                long = position.coords.longitude;
                lat = position.coords.latitude;
                
            /*const proxy= "https://cors-anywhere.herokuapp.com/";*/
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=e3ff84a656705c100f73bd767d0e12f9`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data =>{
                    console.log(data);
                    
                    const weatherwidget = document.querySelector("#weather-widget");
                    const timezonename = data.name;
                    const weatherstats = data.main;
                    const weatherdesc = data.weather[0];

                    // Weather location
                    const location = document.createElement('div')
                    location.classList.add('weather-location');
                    
                    // Location
                    const location_timezone = document.createElement('h2');
                    location_timezone.classList.add('location-timezone');
                    location_timezone.innerText = timezonename;
                    location.appendChild(location_timezone);
                    weatherwidget.appendChild(location);

                    // Weather Condition
                    const condition = document.createElement('div');
                    condition.classList.add('weather-condition');

                    // Temperature
                    const temperature = document.createElement('div');
                    temperature.classList.add('weather-temperature');

                    const temp_num = document.createElement('div');
                    temp_num.classList.add('deg-num');

                    // Convert to celcius
                    let temp = Math.round((weatherstats.temp - 273.15) * 10) / 10;
                    
                    temp_num.innerText = temp;
                    temperature.appendChild(temp_num);

                    const tempmeasure = document.createElement('span');
                    tempmeasure.classList.add('deg-measure');
                    tempmeasure.innerText = "\u00B0C";
                    temperature.appendChild(tempmeasure);

                    condition.appendChild(temperature);

                    // Weather icon
                    const weather_icon = document.createElement('img');
                    weather_icon.classList.add('weather-icon');
                    let iconUrl = "http://openweathermap.org/img/wn/" + weatherdesc.icon + ".png";
                    weather_icon.setAttribute('src', iconUrl);
                    condition.appendChild(weather_icon);

                    // Description
                    const description = document.createElement('div');
                    description.classList.add('weather-description');
                    description.innerText = weatherdesc.description;
                    condition.appendChild(description);

                    weatherwidget.appendChild(condition);

                });
            });
        }
    });
}


function fetchNews() {
    window.addEventListener('load', () => {       
        const api = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=c6106ae1be3e4ff6a90f7760e8ac501a`;
        fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data =>{
                console.log(data);
                const newswidget = document.querySelector(".news-widget");
                const headlinecontainer = document.createElement('div');
                headlinecontainer.classList.add('headline-container');
                newswidget.appendChild(headlinecontainer);

                data.articles.forEach(article => {
                    const headline = document.createElement('div');
                    headline.classList.add('headline');

                    const title = document.createElement('a');
                    title.classList.add('headline-title');
                    title.setAttribute('href', article.url);
                    title.setAttribute('target', '_blank');
                    title.textContent = article.title;
                    headline.appendChild(title);

                    const image = document.createElement('img');
                    image.classList.add('headline-image');
                    image.setAttribute('src', article.urlToImage);
                    headline.appendChild(image);

                    const details = document.createElement('div');
                    details.classList.add('headline-details');
                    details.innerText = article.description;
                    headline.appendChild(details);

                    headlinecontainer.appendChild(headline);         
                });
            });
    });
}

fetchNews();
fetchWeather();
displayTime();
displayDate();
