function createMap()
{
    var map = L.map('map').setView([38.79, -106.53], 3);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    function getRandomInRange(from, to, fixed) 
    {
        return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
        // .toFixed() returns string, so ' * 1' is a trick to convert to number 
    }
      const locations = [
        { lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-90, -100, 3) },
        { lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-90, -100, 3) },
        { lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-90, -100, 3) }
    ];

    locations.forEach((marker, index) => {
        L.marker([marker.lat, marker.lon]).addTo(map)

        let coordinates= document.getElementById('coordinates');
        let markerInfo = document.createElement('div');
        markerInfo.className = 'marker-info';
        markerInfo.innerHTML = `<h2>Marker ${index + 1}: Latitude ${marker.lat}, Longitude ${marker.lon}</h2>`;

        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${marker.lat}&longitude=${marker.lon}&localityLanguage=en`)
            .then(res => res.json())
            .then(data => {
                markerInfo.innerHTML += `<h3>Locality: ${data.locality}</h3>`;
            })
        coordinates.appendChild(markerInfo);
    });
}

window.onload = createMap
