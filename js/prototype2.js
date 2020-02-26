//Enables Tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

//Enables copy to clipboard
$(document).ready(function() {
  var clipboard = new ClipboardJS('.btn');
})

function changeName(){
  hideCode();
  document.getElementsByClassName('twName')[0].innerText = document.getElementById('twNameF').value;
}

/* Collapses code generators if anything has been change in inputs*/
function hideCode(){
  $('.genCode').collapse('hide');
}

function generateCode(){
  /*Generate HTML Code*/
  var receivedHTML = document.getElementById('demonstration')
  document.getElementById('HTMLCode').value = receivedHTML.innerHTML.trim();
}
