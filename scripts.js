console.log('javascript connected!');
    
const carousel = new bootstrap.Carousel('#homeCarousel', {
    interval: 5000,
    pause: false
})

const carouselButton = document.getElementById('carouselButton');
const faIcon = document.getElementById('faButton');

carouselButton.addEventListener('click', function () {
    if (faIcon.classList.contains('fa-pause')) {
        faIcon.classList.remove('fa-pause');
        faIcon.classList.add('fa-play');
        carousel.pause();
    } else {
        faIcon.classList.remove('fa-play');
        faIcon.classList.add('fa-pause');
        carousel.cycle();
    }
}) 

async function fetchWeather() {
    const apiKey = process.env.OPEN_WEATHER_API_KEY; 
    const city = "Dallas";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    try {
        const response = await fetch(url);
        const data = await response.json(); 
        console.log(data);
        displayWeather(data); 
    } catch (error) {
        console.error("There was an error!", error); 
    }
}

fetchWeather();

function displayWeather(object) {
    const img = document.createElement('img');
    img.src = `https://openweathermap.org/img/w/${object.weather[0].icon}.png`;
    document.getElementById("weather-icon").appendChild(img);
    document.getElementById("weather-temp").textContent = `${object.main.temp}\u00B0 | Feels Like: ${object.main.feels_like}\u00B0`
    document.getElementById("weather-description").textContent = `${object.weather[0].description}`
}