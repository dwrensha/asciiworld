
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




 var worldrows = 100
 var worldcolumns = 200

 var world = new Array(worldrows)
 for (var ii = 0; ii < world.length; ++ii) {
     world[ii] = new Array(worldcolumns)
 }

 function addToWorld(stringarray, row, col) {
     for(var i = 0; i < stringarray.length; ++i){
         for(var j = 0; j < stringarray[i].length; ++j) {
             world[i + row][j + col] = stringarray[i].charAt(j)
         }
     }
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
            55,
            105)
 

 var viewportrows = 30;
 var viewportcolumns = 50;

 var viewporti = 50;
 var viewportj = 100;

 var playeri = 60;
 var playerj = 110;

 function subarrayToString(arr, start, end) {
     var res = "";
     for (var j = start; j < end; ++j) {
         if (arr[j] !== undefined) {
             res += arr[j];
         } else {
             res += '&nbsp'
         }
     }

     return res.replace(/ /g,'&nbsp');
 }

 function render() {
   var e;
   for (var i = 0; i < viewportrows; ++i) {
       e = document.getElementById('line' + i);
       e.innerHTML = subarrayToString(world[i + viewporti], viewportj, viewportj + viewportcolumns)
   }

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
