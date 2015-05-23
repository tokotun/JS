"use strict";
function getPopulation (table, i) {
    return table.rows[i].cells[4].textContent;
}
function getName (table, i) {
    return table.rows[i].cells[2].textContent;
}
function sortFunction(a, b) {
  if (a.population > b.population)
     return -1;
  if (a.population < b.population)
     return 1;
  return 0;
}


