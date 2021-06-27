// MIT License
// Copyright (c) 2020 Luis Espino

function reflex_agent(location, state) {
  if (state == "DIRTY") { return "CLEAN"; }
  else if (location == "A") { return "RIGHT"; }
  else if (location == "B") { return "LEFT"; }
}

function test(states) {
  var location = states[0];
  var state = states[0] == "A" ? states[1] : states[2];
  check_state(states);  //VERIFICAR Y MARCAR EL ESTADO VISITADO 
  var action_result = reflex_agent(location, state);
  if (action_result == "CLEAN") {
    if (location == "A") states[1] = "CLEAN";
    else if (location == "B") states[2] = "CLEAN";
  }
  else if (action_result == "RIGHT") states[0] = "B";
  else if (action_result == "LEFT") states[0] = "A";

  if (check_complete(complete_states)) {  //VERIFICO SI TODOS LOS ESTADOS SON VISITADOS
    document.getElementById("log").innerHTML += "<br> Todos los estados visitados: ".concat(state);
  }
  else { //SINO SE HA COMPLETADO IMPRIMO EN PANTALLA Y VUELVO A EJECUTAR LA FUNCIÓN 
    document.getElementById("log").innerHTML += "<br> <b> Location: ".concat(location).concat(" | Action: ").concat(action_result) + "</b>";
    setTimeout(function () { test(states); }, 200);
  }
}

//FUNCION PARA VERIFICAR SI YA SE VISITARON TODOS LOS ESTADOS 
function check_complete(complete_states) {  
  for (var i = 0; i < complete_states.length; i++) {
    if (!complete_states[i]) return false;  //ALGÚN ESTADO NO SE HA VISITADO
  }
  return true;  //TODOS LOS ESTADOS VISITADOS
}

//FUNCION PARA VERIFICAR EN QUE ESTADO SE ENCUENTRA
function check_state(states) {
  var state;
  if (states[0] == "A") {
    if (states[1] == "DIRTY" && states[2] == "DIRTY") state = 0;
    else if (states[1] == "CLEAN" && states[2] == "DIRTY") state = 1;
    else if (states[1] == "DIRTY" && states[2] == "CLEAN") state = 2;
    else if (states[1] == "CLEAN" && states[2] == "CLEAN") state = 3
  } else if (states[0] == "B") {
    if (states[1] == "DIRTY" && states[2] == "DIRTY") state = 4;
    else if (states[1] == "CLEAN" && states[2] == "DIRTY") state = 5;
    else if (states[1] == "DIRTY" && states[2] == "CLEAN") state = 6;
    else if (states[1] == "CLEAN" && states[2] == "CLEAN") state = 7;
  }  
  if (!complete_states[state]) {  //VERIFICA QUE NO SE HAYA VISITADO YA EL ESTADO
    document.getElementById("log").innerHTML += "<br> Estado visitado: ".concat(state); //IMPRIMO EN PANTALLA EL ESTADO VISITADO
    complete_states[state] = true; // LO MARCA COMO VISITADO
  }
}

//FUNCIÓN PARA ENSUCIAR RANDOM
function random_dirty() { 
  var estados = ['CLEAN', 'DIRTY']
  if (states[1] == 'CLEAN') {
    states[1] = estados[Math.floor(Math.random() * 2)];
  }
  if (states[2] == 'CLEAN') {
    states[2] = estados[Math.floor(Math.random() * 2)];
  }
}
var complete_states = [false, false, false, false, false, false, false, false];  //MATRIZ DE ESTADOS
var states = ["A", "DIRTY", "DIRTY"]; 
setInterval(function () { random_dirty(); }, 600);   //RANDOM PARA ENSUCIAR CADA 600
test(states);