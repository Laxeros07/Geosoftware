/**
 * Hauptfunktion
 */
var entfernungen = [];
cities.forEach((element) => {
  entfernungen.push(berechneDistanz(point, element));
});

entfernungen.sort(function (a, b) {
  return a - b;
});
entfernungen.forEach((element) => {
  document.getElementById("berechnen").innerHTML += "<p>" + element + "</p>";
});

/**
 * @function twoPointDistance
 * @desc takes two geographic points and returns the distance between them. Uses the Haversine formula (http://www.movable-type.co.uk/scripts/latlong.html, https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula)
 * @param start array of [lon, lat] coordinates
 * @param end array of [lon, lat] coordinates
 * @returns the distance between 2 points on the surface of a sphere with earth's radius
 */
function berechneDistanz(start, end) {
  //variable declarations
  var earthRadius; //the earth radius in meters
  var phi1;
  var phi2;
  var deltaLat;
  var deltaLong;

  var a;
  var c;
  var distance; //the distance in meters

  //function body
  earthRadius = 6371e3; //Radius
  phi1 = toRadians(start[1]); //latitude at starting point. in radians.
  phi2 = toRadians(end[1]); //latitude at end-point. in radians.
  deltaLat = toRadians(end[1] - start[1]); //difference in latitude at start- and end-point. in radians.
  deltaLong = toRadians(end[0] - start[0]); //difference in longitude at start- and end-point. in radians.

  a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(deltaLong / 2) *
      Math.sin(deltaLong / 2);
  c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  distance = earthRadius * c;

  return distance;
}
/**
 * @function toRadians
 * @desc helping function, takes degrees and converts them to radians
 * @returns a radian value
 */
function toRadians(degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}

/**
 * @function toDegrees
 * @desc helping function, takes radians and converts them to degrees
 * @returns a degree value
 */
function toDegrees(radians) {
  var pi = Math.PI;
  return radians * (180 / pi);
}
