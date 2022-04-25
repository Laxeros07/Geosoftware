/**
* Musterlösung zu Aufgabe 1, Geosoft 1, SoSe 2022
* @author {Name der studierenden Person}   matr.Nr.: {Matrikelnummer}
*/

//JShint configs
// jshint esversion: 10
// jshint browser: true
// jshint node: true
// jshint -W097
"use strict";

//declaration of global variables
var cities;
var point;

/**
* @function main the main function
*/
function main(){

  let sortedCoordinates = sortByDistance(point, cities);
  for(let i =0; i < sortedCoordinates.length; i++){
    let distance = twoPointDistance(point, sortedCoordinates[i]) / 1000;
    insertValues(i, sortedCoordinates[i], distance);
  }
}


//##############################################################################
//## FUNCTIONS
//##############################################################################

/**
* @function insertValues
* @desc takes values for bearing and directions and inserts them in the site
* @param index of the point
* @param distance distance of the point to be inserted
* @param coordinates of the point to be inserted
*/
function insertValues(index, coordinates, distance){
  document.getElementById("coordinates" + index).innerHTML = coordinates;
  document.getElementById("distance" + index).innerHTML = distance;
}

/**
* @function sortByDistance
* @desc takes a point and an array of points and sorts them by distance ascending
* @param point array of [lon, lat] coordinates
* @returns Array with cooidinates
*/
function sortByDistance(point, pointArray){
  let output = [];

  for(let i = 0; i<pointArray.length; i++){
    let distance = twoPointDistance(point, pointArray[i]);
    let j=0;
    while(j < output.length && distance > twoPointDistance(point, output[j])){
      console.log(distance);
      console.log(twoPointDistance(point, output[j]));
      j++;
    }
    output.splice(j, 0, pointArray[i]);
  }
  return output;
}

/**
* @function twoPointDistance
* @desc takes two geographic points and returns the distance between them. Uses the Haversine formula (http://www.movable-type.co.uk/scripts/latlong.html, https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula)
* @param start array of [lon, lat] coordinates
* @param end array of [lon, lat] coordinates
* @returns the distance between 2 points on the surface of a sphere with earth's radius
*/
function twoPointDistance(start, end){
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
  phi1        = toRadians(start[1]); //latitude at starting point. in radians.
  phi2        = toRadians(end[1]); //latitude at end-point. in radians.
  deltaLat    = toRadians(end[1]-start[1]); //difference in latitude at start- and end-point. in radians.
  deltaLong   = toRadians(end[0]-start[0]); //difference in longitude at start- and end-point. in radians.

  a = Math.sin(deltaLat/2)*Math.sin(deltaLat/2) + Math.cos(phi1)*Math.cos(phi2)*Math.sin(deltaLong/2)*Math.sin(deltaLong/2);
  c = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
  distance = earthRadius*c;

  return distance;
}

/**
* @function toRadians
* @desc helping function, takes degrees and converts them to radians
* @returns a radian value
*/
function toRadians(degrees){
  var pi = Math.PI;
  return degrees * (pi/180);
}

/**
* @function toDegrees
* @desc helping function, takes radians and converts them to degrees
* @returns a degree value
*/
function toDegrees(radians){
  var pi = Math.PI;
  return radians * (180/pi);
}
