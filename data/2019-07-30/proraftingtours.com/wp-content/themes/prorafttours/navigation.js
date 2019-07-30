var navigationDictionary={};
var navigationKeys=[];
// allows for a sort of Dictionary keys so we can search
// from smallest to largest
var logoDictionary = {};
// allows for a sort of logoKeys so we can search
// from smallest to largest
var logoKeys= [];

function setNavigation()
{
  var windowWidth = $(window).width();
  var navLen = navigationKeys.length;
  var navAvailable =false; //
  var nav;
  $('.custom-navigation').addClass('hideNav');
  // checks for a nav that is smaller than the current window size
  // if no nav is small enough setNavigation() will default to the biggest
  // navigation that the user has set.
  for (var j in navigationKeys)
  {
    if (windowWidth <= navigationKeys[j])
    {
      navAvailable = true;
      nav = navigationDictionary[navigationKeys[j]];
      break;
    }
  }

  if (navAvailable)
  {
    $(nav).removeClass('hideNav');
  }

  else
  {
    // largest nav is found in the last index in the dictionary
    $(navigationDictionary[navigationKeys[navLen-1]]).removeClass('hideNav');
  }
}
function windowResize(){
  if ($(window).width() >= 768){
    $(".menu-item-a").removeClass("btn btn-design dropdown").removeAttr("data-toggle");
  }

  else {
    $(".menu-item-a").addClass("btn btn-design ");
    $(".dropdown-owner").addClass("dropdown").attr("data-toggle","dropdown");
  }
}

function setLogo()
{
  var windowWidth = $(window).width();
  var len = logoKeys.length;
  var logoAvailable =false; //
  var logo;
  // checks for a nav that is smaller than the current window size
  // if no nav is small enough setNavigation() will default to the biggest
  // navigation that the user has set.
  for (var j in logoKeys)
  {
    if (windowWidth <= logoKeys[j])
    {
      logoAvailable = true;
      logo = logoDictionary[logoKeys[j]];
      break;
    }
  }

  if (logoAvailable)
  {
    $("#navbarLogo img").attr("src", logo );
  }

  else
  {
    // largest logo is found in the last index in the dictionary
    $("#navbarLogo img").attr("src", logoDictionary[logoKeys[len-1]] );
  }
}
