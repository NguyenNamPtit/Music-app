import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick.min.js";
import $ from "jquery";
import { musics } from "./db";
import "../css/global.css";

$(".list-albumsss").slick({
  autoplay: true,
  autoplaySpeed: 6000,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  prevArrow:
    '<div class="slick-prev"><i class="bi bi-arrow-left-short"></i></div>',
  nextArrow:
    '<div class="slick-next"><i class="bi bi-arrow-right-short"></i></i></div>',
});

//Logout

// Lấy thông tin đăng nhập từ local storage
var storedUser = localStorage.getItem("Users");

const iconUser = document.querySelector(".icon-user");
const logout = document.querySelector(".btn-logout");
const register = document.querySelector(".btn-register");
const login = document.querySelector(".btn-login");
//
if (storedUser) {
  var Users = JSON.parse(storedUser);
  //ham check

  for (var i = 0; i < Users.length; i++) {
    var obj = Users[i];
    if (obj.isLogin == true) {
      iconUser.classList.remove("button-none");
      logout.classList.remove("button-none");
      register.classList.add("button-none");
      login.classList.add("button-none");
    }
  }

  //hàm logout
  var keyToModify = "isLogin";
  var newValue = false;
  const Logout = () => {
    for (var i = 0; i < Users.length; i++) {
      var obj = Users[i];
      obj[keyToModify] = newValue;

      iconUser.classList.add("button-none");
      logout.classList.add("button-none");
      register.classList.remove("button-none");
      login.classList.remove("button-none");
    }
    // Tạo một thông báo thành công
    Toastify({
      text: "Đã đăng xuất thành công!",
      duration: 1000, // Thời gian hiển thị (ms)
      close: false, // Hiển thị nút đóng
      gravity: "top", // Vị trí của thông báo ("top", "bottom", "center")
      backgroundColor: "linear-gradient(to right,#b06ab3, #b06ab3)", // Màu nền
    }).showToast();
    // Lưu mảng mới vào localStorage
    localStorage.setItem("Users", JSON.stringify(Users));
  };
  logout.addEventListener("click", Logout);
}
