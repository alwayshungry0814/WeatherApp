const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js')
const argv = yargs
    .options({
    a: {
        demand: true,
        alias: 'address',
        describe: 'Address to fetch weather for ',
        string: true
    }
})
.help()
.alias('help', 'h')
.argv;



geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(results.address);
        weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}.`)
                weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
                    if (weatherResults.apparentTemperature < 60){
                        console.log('jacket weather');
                    } else if (weatherResults.apparentTemperature > 60 && weatherResults.apparentTemperature < 75) {
                        console.log('sweater weather');
                    } else {
                        console.log('t-shirt weather');
                    }
                })
            }
        });
    }
});


