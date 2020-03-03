/*JS variable settings for mobile screen sizes*/
var media_query = window.matchMedia("(max-width: 700px)");

/*Sidenav drawer interactions*/
function openNav() {
  if (media_query.matches){
    document.getElementById("mySidenav").style.width = "100%";
  } else {
    document.getElementById("mySidenav").style.width = "350px";
  document.getElementById("main").style.marginLeft = "350px";
  }
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}
