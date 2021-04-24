const fetch = require('node-fetch');

const url = 'https://api.tomorrow.io/v4/timelines?';
const interval = 900000;

const locations = [
    { locationId: '60809ca688a6a60007947ca2', name: 'ORD' },
    { locationId: '60809ca688a6a60007947ca2', name: 'JFK' },
    { locationId: '60809ca688a6a60007947ca2', name: 'DFW' }
];

function checkTemperature() {
    locations.forEach((item) => {
        fetch(url + new URLSearchParams({
            apikey: 'HVIwYjZHra24Ah3uihus6Oh5pYRh6fXQ',
            location: item.locationId,
            fields: 'temperature',
            timesteps: '15m',
            units: 'metric'
        }))
        .then(res => res.json())
        .then(json => {
                let currentTemperature = json.data.timelines[0].intervals[0].values.temperature;
                let nextTemperature = json.data.timelines[0].intervals[1].values.temperature;

                if (currentTemperature - nextTemperature > 2) {
                    console.log('Temperature drop of at least 2°C in '+ item.name + " at " + nextTemperature);
                }
        })
        .catch(err => console.error('error:' + err));
    })
}
checkTemperature();
setInterval(checkTemperature, interval);
