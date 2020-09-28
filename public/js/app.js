console.log('Javascript file')

const fetchForecast = (address) => {
    fetch(`http://localhost:5000/weather?address=${address}`)
        .then((res) => {
            res.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error
                    messageTwo.textContent = ''
                } else {
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                }
            })
        })
}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#msg-1')
const messageTwo = document.querySelector('#msg-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageTwo.textContent = ''
    messageOne.textContent = 'Loading...'

    const address = search.value
    fetchForecast(address)
})