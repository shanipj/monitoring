const fetch = require('node-fetch');
const constants = require('./utils/constants');

async function fetchLocations() {
  try {
    const res = await fetch(constants.locationsApi + new URLSearchParams({
      apikey: constants.key
    }));
    const locationsData = await res.json();
    const locationData = locationsData.data.locations

    for (let item of locationData) {
      let locationId = item.id;
      fetchTemperature(locationId);
    }
  } catch (error) {
    console.log('Api Error: ' + error);
  }
}
async function fetchTemperature(locationId) {
  try {
    const resp = await fetch(constants.temperatureApi + new URLSearchParams({
      apikey: constants.key,
      location: locationId,
      fields: 'temperature',
      timesteps: '15m',
      units: 'metric'
      }))   
    const tempData = await resp.json();

    let currentTemperature = tempData.data.timelines[0].intervals[0].values.temperature;
    let nextTemperature = tempData.data.timelines[0].intervals[1].values.temperature;

    if (currentTemperature - nextTemperature > 2) {
      console.log('Temperature drop of at least 2°C in ' + item.name + " at " + nextTemperature);
    }else{
      console.log( 'currentTemperature: '+ currentTemperature + 'nextTemperature: ' +nextTemperature)
    }
  } catch (error) {
    console.log('Api Error: ' + error);
  }
}

fetchLocations();
