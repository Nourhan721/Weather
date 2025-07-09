console.log('hello')
let apiKey = 'e5045134471d42deaf0223411250707'
let cityInp = document.getElementById('info')
let weatherCard = document.querySelector('.weather-card')



async function getWeather() {
    let city =  cityInp.value.trim()
    try {
    let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
    let data = await response.json()
    console.log(data)

    let condition = data.current.condition.text.toLowerCase()
    creating(data)

    switch (condition) {
    case 'clear':
     case 'sunny':
        document.body.style.background ='linear-gradient(to top right, #fceabb, #f8b500)'
                createWeatherImage('imgs/sunny.png', 'Sunny');
                console.log('Drink your water ')
        break;
    case 'windy':
        document.body.style.background = 'linear-gradient(to right, #74ebd5, #acb6e5)';
                createWeatherImage('imgs/windy.png', 'Windy');

        break;
    case 'snowy':
      case 'partly cloudy':
        case 'cloudy':
        case 'snow':
        document.body.style.background = 'linear-gradient(to right, #d7d2cc, #304352)'
                createWeatherImage('imgs/cloudy.png', 'Cloudy');

        break;
    case 'rainy':
        case 'rain':
        case 'light rain':
        document.body.style.background = 'linear-gradient(to bottom, #4b79a1, #283e51)';
                createWeatherImage('imgs/storm.png', 'Rainy');

        break;
    default:
        console.log('no theme')
        break;
    }

} catch (error) {
    console.log(error)
}

}
function creating(data){
    weatherCard.innerHTML=''
    weatherCard.append(cityInp)
    let newElement = document.createElement('div')
    newElement.setAttribute('class','news')
    newElement.innerHTML=`
    <p>${data.current.condition.text}</p>
    <p>${data.current.temp_c}°C</p>
    `
   weatherCard.append(newElement)
}
function createWeatherImage(src, alt) {
    let img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.classList.add('weather-img');
    weatherCard.append(img);
}


let debounceTimer;

cityInp.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        getWeather();
    }, 700);}
)
getWeather()
