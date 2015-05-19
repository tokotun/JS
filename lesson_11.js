"use strict";
function getPopulation (table, i) {
    return table.rows[i].cells[4].textContent;
}
function getName (table, i) {
    return table.rows[i].cells[2].textContent;
}

