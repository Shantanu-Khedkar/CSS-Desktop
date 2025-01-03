const clamp = (num, min, max) => Math.min(Math.max(num, min), max)
let active_app
setTimeout(show_system_date, 10)

function show_system_date(){
    var now = new Date(Date.now());
    var options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
    var formattedDate = now.toLocaleString('en-US', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, ...options });
    document.getElementById("system-date").innerText= formattedDate;
}

function open_app(app_name, icon_handler){
    active_app = app_name

    Array.from(document.getElementsByClassName("selected-icon")).forEach((icon)=>icon.classList.remove("selected-icon"))
    icon_handler.children[0].classList.add("selected-icon")
}

setInterval(show_system_date, 1000);


dragElement(document.getElementById("window-1"));

function dragElement(elmnt) {
  
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    desktop_width = document.getElementById("Desktop").getBoundingClientRect().width
    desktop_height = document.getElementById("Desktop").getBoundingClientRect().height
    var cursor_y = clamp(e.clientY, 35+17.5, desktop_height)
    var cursor_x = clamp(e.clientX, 0, desktop_width)


    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:

    pos1 = pos3 - cursor_x;
    pos2 = pos4 - cursor_y;
    pos3 = cursor_x;
    pos4 = cursor_y;


    

    console.log(desktop_height, desktop_width)
    clamped_top = elmnt.offsetTop - pos2
    clamped_left = elmnt.offsetLeft - pos1
    // set the element's new position:
    console.log(clamped_top, clamped_left)
    elmnt.style.top = (clamped_top) + "px";
    elmnt.style.left = (clamped_left) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
