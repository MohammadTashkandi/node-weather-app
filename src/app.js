const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocodeUtils = require('./utils/geocodeUtils')
const weatherUtils = require('./utils/weatherUtils')

const app = express()
const port = process.env.PORT || 5000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mohammad Tashkandi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mohammad Tashkandi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'About Me',
        name: 'Mohammad Tashkandi',
        message: 'If you need any help look into the skies'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }

    geocodeUtils.geocode(req.query.address, (error, geoData) => {
        if (error) {
            return res.send({error})
        }
    
        weatherUtils.forecast(geoData.longitude, geoData.latitude, (error, weatherData) => {
            if (error) {
                return res.send({error})
            }
    
            res.send({
                forecast: weatherData,
                location: geoData.placeName,
                address: req.query.address
            })
        })
    
    })
})

app.get('/help/*', (req, res) => {
    res.render('notfound', {
        title: '404',
        name: 'Mohammad Tashkandi',
        message: 'Help page not found'
    })
})

app.get('*', (req, res) => {
    res.render('notfound', {
        title: '404',
        name: 'Mohammad Tashkandi',
        message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up and running on port '+port)
})