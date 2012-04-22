 var worldrows = 100
 var worldcolumns = 200

 var world = new Array(worldrows)
 for (var ii = 0; ii < world.length; ++ii) {
     world[ii] = new Array(worldcolumns)
 }

 var turn = 0;

 var objectsThatAct = new Array();

 function Thing(char) {
     this.renderChar = char
   
     switch (char) {
     case "C" :  // cannon
         objectsThatAct.push(this);
         this.act =
             (function() {
                 if (turn % 10 == 0) {
                     console.log("boom")
                 }
             })
                     
         break;
     default : 
         
     }

 }

 function addToWorld(stringarray, row, col) {
     for(var i = 0; i < stringarray.length; ++i){
         for(var j = 0; j < stringarray[i].length; ++j) {
             world[i + row][j + col] = new Thing(stringarray[i].charAt(j))
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
            59,
            122);
            
 addToWorld(Array("ARROW KEYS",
                  "          ",
                  "  TO MOVE "),
            76, 123);

 addToWorld(Array("SCORE:"),
             51, 101);
 

 var viewportrows = 30;
 var viewportcolumns = 50;

 var viewporti = 50;
 var viewportj = 100;

 function Player() {
     this.renderChar = "@"
 }

 var playeri = 60;
 var playerj = 110;

 world[playeri][playerj] = new Player()

 function subarrayToString(arr, start, end) {
     var res = "";
     for (var j = start; j < end; ++j) {
         if (arr[j] !== undefined) {
             res += arr[j].renderChar;
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

 function takeTurn() {
     for (var i = 0; i < objectsThatAct.length; ++i){
         var o = objectsThatAct[i];
         o.act();
     }
     ++turn;

 }

function kpress(event) {
 console.log(event)
}

function kup(event) {
 console.log(event)
}

function kdown(event) {
    console.log(event);
    if (event.which != 0)
        switch (event.keyCode) {
        case 37 : // LEFT
            viewportj -= 1;
            break;
        case 38 : // UP
            viewporti -= 1;
            break;
        case 39 : // RIGHT
            viewportj += 1;
            break;
        case 40 : // DOWN
            viewporti += 1;
            break;
        default:
        }
    else {
        // default action.
        return true;
    }

    takeTurn();
    render();

    return true;
}

window.onkeypress = kpress;
window.onkeyup = kup;
window.onkeydown = kdown;
