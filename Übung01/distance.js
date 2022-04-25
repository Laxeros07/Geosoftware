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
 * Berechnung der Distanz zw. 2 Punkten in WGS84
 *
 * @param {*} Punkt1
 * @param {*} Punkt2
 *
 */

function berechneDistanz(Punkt1, Punkt2) {
  let lon1 = Punkt1[0]; //Längengrad
  let lat1 = Punkt1[1]; //und Breitengrad von Punkt 1
  let lon2 = Punkt2[0]; //Längengrad
  let lat2 = Punkt2[1]; //und Breitengrad von Punkt 2

  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // in metres
  return d;
}
