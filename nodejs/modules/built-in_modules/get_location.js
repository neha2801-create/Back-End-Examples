import { get } from 'http'
const url = 'http://dev.virtualearth.net/REST/v1/Locations?countryRegion=US&locality=fortwayne&adminDistrict=in&key=AvNrmf9CFjzvO_oSIp3qCrNusN7cD0vCV1lt9bfn25get0MySWIaMJ6-Rgb0DqH9'

get(url, (response) => {
  let result = ''

  response.on('data', (chunk) => { 
    result += chunk
  })
  
  response.on('end', () => {
    try {
      const data = JSON.parse(result)
      const coordinates = data.resourceSets[0].resources[0].geocodePoints[0].coordinates
      
      console.log(JSON.stringify(data, null, 2)) // spacing level = 2 
      console.log("state: " + data.resourceSets[0].resources[0].name);
      console.log("lat: " + coordinates[0])
      console.log("lng: " + coordinates[1])
    } catch (e) {
      console.error(e.message)
    }
  })
}).on('error', (error) => {
  console.error(`Got error: ${error.message}`)
})
