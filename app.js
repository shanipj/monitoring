const fetch = require('node-fetch');

const url = 'https://api.tomorrow.io/v4/timelines?';

const locations = [
    { locationId: '60808cecfd319a0007cb7051', name: 'ORD' },
    { locationId: '60808cecfd319a0007cb7051', name: 'JFK' },
    { locationId: '60808cecfd319a0007cb7051', name: 'DFW' }
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
            if(json.data && json.data.timelines){
                if (json.data.timelines[0].intervals[0].values.temperature - json.data.timelines[0].intervals[1].values.temperature > 2) {
                    console.log('Temperature drop of at least 2°C in '+ item.name + " at " + json.data.timelines[0].intervals[1].startTime)
                } 
                
            }else{
              console.log('API ERROR');  
            }
        })
        .catch(err => console.error('error:' + err));
    })
}
checkTemperature();
setInterval(checkTemperature, 5000);
