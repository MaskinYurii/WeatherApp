const _apiKey = "b2b9b06f32655cc328ac1fe3882498ba";
const _apiUrl = "https://api.openweathermap.org/data/2.5/weather?&limit=5&units=metric&q=";
const searchBtn = document.querySelector('.search__button'),
    searchInput = document.querySelector('.search__input'),
    weatherBlock = document.querySelector('.weather'),
    errorBlock = document.querySelector('.error');
    weatherImg = document.querySelector('.weather__image');

if(sessionStorage.getItem('city')) {
    const city = sessionStorage.getItem('city');
    searchInput.value = city;
    checkCity(city);
}

async function checkCity(city) {
    const response = await fetch(_apiUrl + city + `&appid=${_apiKey}`);
    let data = await response.json();
    console.log(data)

    if(data.cod === 200){
        document.querySelector('.weather__temp').innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector('.weather__city').innerHTML = data.name;
        document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
        document.querySelector('.wind').innerHTML = data.wind.speed + "km/h";

        weatherImg.src = `images/${data.weather[0].main.toLowerCase()}.png`;

        errorBlock.style.display = "none";
        weatherBlock.style.display = 'block';


        sessionStorage.setItem('city', searchInput.value);
    } else{
        weatherBlock.style.display = 'none'
        errorBlock.style.display = 'block';
    }
}
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    checkCity(searchInput.value)
})
