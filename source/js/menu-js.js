var mainNavElements = document.querySelectorAll(".mobile-menu");
var navToggle = document.querySelector(".main-nav__toggle");

showMenu(false);

navToggle.addEventListener("click", function() {
  showMenu(!isMenuOpened());
});

function isMenuOpened() {
  var isOpened = true;

  for (var i = 0; i < mainNavElements.length; i++) {
    isOpened = isOpened && mainNavElements[i].classList.contains("mobile-menu-open");
  };
  return isOpened;

}

function showMenu(show) {
  if(show) {
    for (var i = 0; i < mainNavElements.length; i++) {
      mainNavElements[i].classList.remove("mobile-menu-closed");
      mainNavElements[i].classList.add("mobile-menu-open");
      navToggle.classList.contains("main-nav__toggle--close");
      navToggle.classList.remove("main-nav__toggle--close");
      navToggle.classList.add("main-nav__toggle--open");
    }
  } else {
    for (var i = 0; i < mainNavElements.length; i++) {
      mainNavElements[i].classList.remove("mobile-menu-open");
      mainNavElements[i].classList.add("mobile-menu-closed");
      navToggle.classList.contains("main-nav__toggle--open");
      navToggle.classList.remove("main-nav__toggle--open");
      navToggle.classList.add("main-nav__toggle--close");
    }
  }
};
