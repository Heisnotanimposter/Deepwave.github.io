<script>
document.addEventListener('DOMContentLoaded', function() {
    const width = 960, height = 600;

    const svg = d3.select("#map").append("svg")
        .attr("width", width)
        .attr("height", height);

    const path = d3.geoPath();

    d3.json("custom.geo.json", function(error, world) {
        if (error) throw error;

        svg.selectAll("path")
            .data(topojson.feature(world, world.objects.countries).features)
            .enter().append("path")
            .attr("d", path)
            .attr("fill", "#ccc")
            .attr("stroke", "#fff")
            .on("click", function(d) {
                alert("You clicked on " + d.properties.name);
                // Alternatively, open a new page:
                // window.location.href = 'details.html?country=' + d.properties.name;
            });
    });
});
    var map = L.map('map').setView([20, 0], 2); // Set the initial view of the map (latitude, longitude, zoom level)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add GeoJSON data for countries
    fetch('path/to/countries.geojson').then(function(response) {
        return response.json();
    }).then(function(data) {
        L.geoJson(data, {
            onEachFeature: function (feature, layer) {
                layer.on('click', function () {
                    openPopup(feature.properties.name);
                });
            }
        }).addTo(map);
    });

    function openPopup(countryName) {
        var popupContent = '<div>Country: ' + countryName + '</div><a href="country-detail.html?country=' + countryName + '" target="_blank">View Details</a>';
        L.popup()
            .setLatLng(map.getCenter())
            .setContent(popupContent)
            .openOn(map);
    }
</script>
