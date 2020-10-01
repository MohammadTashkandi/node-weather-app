const request = require('request')

const forecast = (lon, lat, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=dd396ff3322b2d9febd7feae325420ef&query=${lat},${lon}`

    request({ url, json: true }, (err, res) => {
        if (err) {
            callback('Couldnt connect to weather services', undefined)
        } else if (res.body.error) {
            console.log(res.body.error)
            callback('Please provide valid info', undefined)
        } else {
            callback(undefined, `${res.body.current.weather_descriptions[0]}. It is currently ${res.body.current.temperature}, it feels like ${res.body.current.feelslike}. The humidity is ${res.body.current.humidity}%`)
        }
    })
}

module.exports = {
    forecast
}