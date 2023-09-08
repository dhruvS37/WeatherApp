const apiKey = '72ab4aa84a1d990c71f91a41a22159d8'

let inputBox = document.getElementById('search')
let search = document.querySelector('.searchIcon')
let weatherIcon = document.querySelector('.img')
let temp = document.querySelector('.temp')
let cityTag = document.querySelector('.city')
let detailVal = document.querySelectorAll('.info h2')
let detailBox = document.querySelectorAll('.box')

console.log(weatherIcon);
inputBox.addEventListener('keypress', (e)=>{
    if(e.key === 'Enter')
        search.click()
})
search.onclick = () => {
    let cityName = inputBox.value.trim()
    fetchWeather(cityName)
    inputBox.value = ""
}

function fetchWeather(city='surat'){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(res=>res.json())
    .then((data)=>{
        if(data.cod==200){
            temp.classList.remove('deactivated')
            for (const b of detailBox) {
                b.classList.remove('deactivated') 
            }
            prepareData(data)
        }else{
            weatherIcon.src = 'images/404-error.png'
            temp.classList.add('deactivated')
            for (const b of detailBox) {
                b.classList.add('deactivated') 
            }
            cityTag.innerHTML = 'City Not Found'
        }
    })
}

function prepareData(data) {
    
    weatherIcon.src = `images/${data.weather[0].main}.png`
    temp.innerHTML = Math.round(data.main.temp - 273.15) + '&#8451;'
    cityTag.innerHTML = data.name
    detailVal[0].innerHTML = data.main.humidity + '%'
    detailVal[1].innerHTML = data.wind.speed + 'km/h'

    let date = new Date(data.sys.sunrise)
    detailVal[2].innerHTML = date.getHours() + ':' + date.getMinutes()
    date = new Date(data.sys.sunset)
    console.log(date);
    detailVal[3].innerHTML = date.getHours() + ':' + date.getMinutes()
}

fetchWeather()

