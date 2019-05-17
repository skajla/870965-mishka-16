var cartItems = document.querySelectorAll(".cart-link");
var cartPopup = document.getElementById("modal-cart__wrapper");

for (index = 0; index < cartItems.length; index++) {
  cartItems[index].addEventListener("click", function (evt) {
    evt.preventDefault();
    cartPopup.classList.add("modal-show");
  });
}

cartPopup.addEventListener("click", function (evt) {
  if (evt.target.id == "modal-cart__wrapper"){
  evt.preventDefault();
  cartPopup.classList.remove("modal-show");}
});

window.addEventListener("keyup", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (cartPopup.classList.contains("modal-show")) {
      cartPopup.classList.remove("modal-show");
    }
  }
});
