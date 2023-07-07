import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick.min.js";

import $ from "jquery";
import { musics } from "./db";
// import "../css/global.css";
//Mobile
const menumoble = document.querySelector(".menu-moble");
const overlay = document.querySelector(".nav-overlay");
const iconmenu = document.querySelector(".icon-menu-moble");
const closemenu = document.querySelector(".close-menu-moble");
const btnclicknavbar = document.querySelector(".click-navbar");
btnclicknavbar.addEventListener("click", (event) => {
  iconmenu.classList.toggle("play-moble-none");
  closemenu.classList.toggle("play-moble-none");
  overlay.classList.toggle("play-moble-none");
  menumoble.classList.toggle("play-moble-close");
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

//lấy id thông tin sản phẩm và hiển thị
// Lấy tham số id từ URL
const urlParams = new URLSearchParams(window.location.search);
const blogId = urlParams.get("id");

// Hàm lấy thông tin chi tiết sản phẩm từ API
function getProductDetail(blogId) {
  // Địa chỉ URL của API và tham số productId
  const apiUrl = `https://api.example.com/products/${blogId}`;

  // Gửi yêu cầu GET đến API và nhận kết quả trả về dưới dạng JSON
  return fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Trả về thông tin chi tiết của sản phẩm
      return data;
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

// Hàm hiển thị thông tin chi tiết sản phẩm lên trang
function displayProductDetail(productDetail) {
  // Lấy các phần tử trên trang
  const detailTitle = document.getElementById("detail-title");
  const detailDescription = document.getElementById("detail-description");

  // Hiển thị thông tin chi tiết lên trang
  detailTitle.textContent = productDetail.title;
  detailDescription.textContent = productDetail.description;
  // Các thông tin chi tiết khác cũng có thể được hiển thị tương tự

  // Cập nhật nội dung trên trang tùy theo thông tin sản phẩm
}

getProductDetail(blogId);
console.log(blogId);
