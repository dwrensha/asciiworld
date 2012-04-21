
 var lines = new Array("                                                   ",
                       " SCORE: 100                                        ",
                       "                                                   ",
                       "                                                   ",
                       "                                                   ",
                       "                                                   ",
                       "                     WWWWWWWWWW                    ",
                       "                     W W      W                    ",
                       "                     W W      W                    ",
                       "                     W W      W                    ",
                       "                     W W    W W                    ",
                       "                     W      W W                    ",
                       "                     W      W W                    ",
                       "                     W      W W                    ",
                       "                     WWwWWWWWWW                    ",
                       "                                                   ",
                       "                                                   ",
                       "                                                   ",
                       "                                                   ",
                       "                                                   ",
                       "                                                   ",
                       "                                                   ",
                       "                                                   ",
                       "                                                   ",
                       "                                                   ",
                       "                    ARROW KEYS                     ",
                       "                                                   ",
                       "                      TO MOVE                      ",
                       "                                                   ",
                       "                                                   ")




 var worldwidth = 200
 var worldheight = 100

 var world = new Array(worldwidth)
 for (i = 0; i < world.length; i++) {
     world[i] = new Array(worldheight)
 }

 function addToWorld(stringarray, x, y) {
     true
 }

 addToWorld(new Array("WWWWWWWWWW",
                      "W W      W",
                      "W W      W",
                      "W W      W",
                      "W W    W W",
                      "W      W W",
                      "W      W W",
                      "W      W W",
                      "WWwWWWWWWW"),
            220,
            120)
 

 var viewportwidth = 50
 var viewportheight = 30

 var viewportx = 100
 var viewporty = 50

 var playerx = 110
 var playery = 60

 function render() {
   var e;
   for (i = 0; i < viewportheight; i++) {
     e = document.getElementById('line' + i);
     e.innerHTML = lines[i].replace(/ /g,'&nbsp');
   }

    e = document.getElementById('topbar' );
    e.innerHTML = "+---------------------------------------------------+";
    e = document.getElementById('botbar' );
    e.innerHTML = "+---------------------------------------------------+";

 }

function kpress(event) {
 if (event.which == null)
   char = String.fromCharCode(event.keyCode);
 else if (event.which != 0 && event.charCode != 0)
   char = String.fromCharCode(event.which);
 else {
   // default action.
   return true;
 }

 console.log("you pressed: " + char)
 var e = document.getElementById('a');
  if (char == ' ') char = '&nbsp'
  e.innerHTML = char;

//  periodicallyRerender();

 return true;
}

function kup(event) {
 console.log(event)
}

function kdown(event) {
   console.log(event)
}

window.onkeypress = kpress;
window.onkeyup = kup;
window.onkeydown = kdown;
