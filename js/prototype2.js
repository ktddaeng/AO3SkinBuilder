//Enables Tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

//Enables copy to clipboard
$(document).ready(function() {
  //enable clipboard
  var clipboard = new ClipboardJS('.btn');

  //for radio-like checkboxes
  $('.addMedia').click(function() {
      $('.addMedia').not(this).prop('checked', false);
  });
})

function changeName(){
  hideCode();
  document.getElementsByClassName('twName')[0].innerText = document.getElementById('twNameF').value;
}

/* Collapses code generators if anything has been change in inputs*/
function hideCode(){
  $('.genCode').collapse('hide');
}

/*Generate HTML Code*/
function generateCode(){
  var receivedHTML = document.getElementById('demonstration');
  document.getElementById('HTMLCode').value = receivedHTML.innerHTML.trim();
}

// $(document).ready(function () {
//     $('#sidebarCollapse').on('click', function () {
//         $('#sidebar').toggleClass('active');
//     });
// });

/*JS variable settings for mobile screen sizes*/
var media_query = window.matchMedia("(max-width: 700px)");

/*Sidenav drawer interactions*/
function openNav() {
  hideCode();
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

/*Toggle night mode for the website*/
function toggleSiteNM() {
  document.body.classList.toggle("siteNM");
}

/* Hide Dummy Text */
function hideDummy() {
  $('.dummyText.collapse').collapse('toggle')
}
