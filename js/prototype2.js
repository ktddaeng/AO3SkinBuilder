//Enables Tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

//Enables copy to clipboard
$(document).ready(function() {
  //enable clipboard
  var clipboard = new ClipboardJS('.btn');
})
//default strings
var default_image = "images/default_image.jpg";
var verified_string = '<span class="twVerified">✔</span>';
var verifiedEmbed_string = '<span class="twVerifiedEmbed">✔</span>';

//verify URL is a proper image URL
function checkImageURL(url, callBack){
  //not a valid image if it doesn't even have the accepted endings
  if (url.match(/\.(jpeg|jpg|gif|png)$/) == null) { callBack(false); }

  var img = new Image();
  img.src = url;
  img.onload = function() {
    callBack(true);
  };
  img.onerror = function() {
    callBack(false);
  }
}
function validateURLInput(inputID, validity){
  if (validity == true) {
    document.getElementById(inputID).classList.remove('is-invalid');
    document.getElementById(inputID).classList.add('is-valid');
  } else {
    document.getElementById(inputID).classList.remove('is-valid');
    document.getElementById(inputID).classList.add('is-invalid');
  }
}

//radio button like checkboxes
function checkboxShade(elementName) {
  var className = $(elementName).attr('name');
  if (className == null) {
    return;
  }
  $("input[name='" + className + "']").not(elementName).prop('checked', false);
  $("input[name='" + className + "']").not(elementName).parent().css("background", "transparent");
  $("input[name='" + className + "']").not(elementName).siblings().css("color", "#fff");
  if ($(elementName).is(':checked')){
    $(elementName).parent().css("background","#fff");
    $(elementName).siblings().css("color","#582630");
  } else {
    $(elementName).parent().css("background","transparent");
    $(elementName).siblings().css("color","#fff");
  }
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
/*GENERAL SETTINGS*/
/*Toggle night mode for the website*/
function toggleSiteNM() {
  document.body.classList.toggle("siteNM");
}
/* Hide Dummy Text */
function hideDummy() {
  $('.dummyText.collapse').collapse('toggle')
}
/*Changes the appearance of the Tweet (day/night/simple)*/
function editMode() {
  hideCode();
  //get value of radio button group
  var radioVal = $("input[name='twMode']:checked").val();
  //change Tweet appearance according to value
  switch(radioVal) {
    case "night":
      $(".tw").addClass("twNM");
      $(".tw").addClass("twBody");
      break;
    case "simple":
      $(".tw").removeClass("twBody");
      $(".tw").removeClass("twNM");
      break;
    default: //day
      $(".tw").addClass("twBody");
      $(".tw").removeClass("twNM");
  }
}

/*HEADER SETTINGS*/
/* if active, removes all elements and disables all boxes */
function hideUser(){
  hideCode();
  if (event.target.checked == true) {
    //disable all the inputs
    $('#inputAvatar').prop('disabled', true);
    $('#inputName').prop('disabled', true);
    $('#inputHandle').prop('disabled', true);
    $('#inputVerified').prop('disabled', true);
    //remove header
    $('.twUser').remove();
  } else {
    //enable all inputs
    $('#inputAvatar').prop('disabled', false);
    $('#inputName').prop('disabled', false);
    $('#inputHandle').prop('disabled', false);
    $('#inputVerified').prop('disabled', false);
    //recreate header
    if ($(".twUser")[0]){ return; }

    var newElement = document.createElement("div");
    newElement.classList.add("twUser");
    $('.tw').prepend(newElement);
    $('.twUser').append($("<img>", {src: default_image}).addClass("twAvatar"));
    $('.twUser').append($("<span>"));
    $('.twUser > span').append($("<span>").addClass("twName"));
    $('.twUser > span').append("</br>");
    $('.twUser > span').append($("<span>").addClass("twHandle"));

    //Call build functions
    buildAvatar();
    buildName();
    buildHandle();
    if (document.getElementById("inputVerified").checked == true) {
      $('.twName').after(verified_string);
    }
  }
}
/*add verified icon or remove it*/
function addVerified(){
  hideCode();
  if (event.target.checked == false) {
    //remove verified icon if exists
    $('.twVerified').remove();
  } else {
    if ($('.twVerified')[0]) { return; }
      $('.twName').after(verified_string);
  }
}
//builder functions for header
function buildAvatar(){
  hideCode();
  var newURL = DOMPurify.sanitize(document.getElementById("inputAvatar").value);

  checkImageURL(newURL, function(imageExists){
    if (imageExists == false) {
      //use default image if image doesn't work
      $(".twAvatar").attr("src", default_image);
      validateURLInput("inputAvatar", false);
    } else {
      $(".twAvatar").attr("src", newURL);
      validateURLInput("inputAvatar", true);
    }
  });
}
function buildName(){
  hideCode();
  var newText = DOMPurify.sanitize(document.getElementById("inputName").value);
  $(".twName").text(newText);
}
function buildHandle(){
  hideCode();
  var newText = DOMPurify.sanitize(document.getElementById("inputHandle").value);
  $(".twHandle").text("@" + newText);
}
/*CONTENT SETTINGS*/
/* Add replying tag*/
function addReply() {
  hideCode();
  $('#addReply').collapse('toggle');
  if (event.target.checked == false) {
    $('.twReply').remove();
  } else {
    // <div class="twReply"><span>replying to </span><span>@officialeuphemia</span></div>
    if($(".twReply")[0]){ return; }
    //build initial element
    var newElement = document.createElement("div");
    newElement.classList.add("twReply");

    //insert after header or make first child if no header
    if ($(".twUser").length) {
      $(".twUser").after(newElement);
    } else {
      $(".tw").prepend(newElement);
    }

    $(".twReply").append($("<span>").text("replying to "));
    $(".twReply").append($("<span>"));
    buildReply();
  }
}
/*changeReply on Input*/
function buildReply(){
  hideCode();
  var newText = DOMPurify.sanitize(document.getElementById("inputReplyHandle").value);
  $(".twReply span:last-child").text("@" + newText);
}

/*main function to add/remove media*/
function addMedia(){
  //disable all buttons while elements are being built
  $("input[name='addMedia']").prop('disabled',true);
  hideCode();
  console.log(event.target.value);
  checkboxShade(event.target);

  //remove all previous additional media (there can only be one or none at all)
  $(".twImage, .twuserEmbed, .twPoll, .twAPoll, .twPollStats").remove();
  //collapse all setting divs pertaining to said thing
  $("#" + event.target.value).collapse('toggle');

  if(event.target.checked == true) {
    if (event.target.value == "addPhoto"){
      $("#addQuote, #addPoll").collapse('hide');
      addPhoto();
    } else if (event.target.value == "addQuote") {
      $("#addPhoto, #addPoll").collapse('hide');
      addQuote();
    } else {
      $("#addPhoto, #addQuote").collapse('hide');
      addPoll();
    }
  }

  //enable buttons when event is finished
  $("input[name='addMedia']").prop('disabled',false);
}
function addPhoto(){
  // TODO: WIP
}
function addQuote(){
  // TODO: WIP
}
function addPoll(){
  // TODO: WIP
}

/*FOOTER SETTINGS*/
function hideFooter() {
  hideCode();
  if (event.target.checked == true) {
    //disable all the inputs
    $('#inputLikesCt').prop('disabled', true);
    $('#inputDate').prop('disabled', true);
    $('#inputComments').prop('disabled', true);
    //remove footer
    $('.twComments').remove();
  } else {
    //enable all inputs
    $('#inputLikesCt').prop('disabled', false);
    $('#inputDate').prop('disabled', false);
    if (document.getElementById("hideComments").checked){
      $('#inputComments').prop('disabled', true);
    }
    //recreate footer
    if ($(".twUser")[0]){ return; }

    if (!$(".twStats")[0]) {
      $(".tw").append($("<div>")).addClass("twStats");
    }
    $(".twStats").append($("<span>")).addClass("twLikes");
    $(".twStats").append($("<span>")).addClass("twTime");

    //Call build functions
    buildLikes();
    buildTime();
    hideComments();
  }
}
function hideComments(){
  hideCode();
  var commentsCheck = document.getElementById("hideComments").checked;
  $("#commentsBox").collapse('toggle');

  if (commentsCheck) {
    $(".twComments").remove();
    $("#inputComments").prop("disabled", true);
    $("input[name='addReplyMetric']").prop("disabled", true);
  } else {
    $("#inputComments").prop("disabled", false);
    $("input[name='addReplyMetric']").prop("disabled", false);
    if ($(".twComments")[0]) { return; }

    var newElement = document.createElement("div");
    newElement.classList.add("twComments");
    $(".tw").append(newElement);
    buildComments();
  }
}
function toggleStats(){
  console.log(event.target.name + " " + event.target.value);
  checkboxShade(event.target);
  if (event.target.name == "addLikesMetric") {
    buildLikes();
  } else {
    buildComments();
  }
}
function buildComments(){
  var count = parseFloat(document.getElementById("inputComments").value) || 0;
  console.log(count + " comments");
  // TODO: WIP
}
function buildLikes(){
  var count = parseFloat(document.getElementById("inputLikesCt").value) || 0;
  console.log(count + " likes");
  // TODO: WIP
}
