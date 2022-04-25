let element = document.getElementById("standort");

var x = document.getElementById("demo");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
function showPosition(position) {
  x.innerHTML =
    "Latitude: " +
    position.coords.latitude +
    "<br>Longitude: " +
    position.coords.longitude;

  let input = document.getElementById("textfeld");

  input.value = JSON.stringify({
    type: "Feature",
    properties: {
      shape: "Marker",
      name: "Botanischer Garten",
      category: "default",
    },
    geometry: {
      type: "Point",
      coordinates: [position.coords.longitude, position.coords.latitude],
    },
  });
}
function berechneAbstand() {
  var poiCoordinates = [];

  poi.features.forEach((element) => {
    poiCoordinates.push(element.geometry.coordinates);
  });
  console.log(poiCoordinates);
}
