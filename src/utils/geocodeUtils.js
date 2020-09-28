const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibW9oYW1tYWR0YXNoa2FuZGkiLCJhIjoiY2tmYXd5aWd6MTBnYjJybWFyY3V5aWs2YSJ9.qZt32t8PaXTz5jGe75txkQ&limit=1`

    request({ url, json: true }, (err, res) => {
        if (err) {
            callback('Couldnt connect to geocoding services', undefined)
        } else if (res.body.message || res.body.features.length === 0) {
            callback('Please provide valid info', undefined)
        } else {
            const longitude = res.body.features[0].center[0]
            const latitude = res.body.features[0].center[1]
            const placeName = res.body.features[0].place_name
            callback(undefined, {
                latitude,
                longitude,
                placeName
            })
        }
    })
}

module.exports = {
    geocode
}