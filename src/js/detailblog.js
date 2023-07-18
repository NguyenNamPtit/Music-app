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
console.log(urlParams)
const blogId = urlParams.get("id");

// Hàm lấy thông tin chi tiết sản phẩm từ API
function getProductDetails(blogId) {
  fetch(` https://api-app-mu.vercel.app/blogs/${blogId}`)
    .then(response => response.json())
    .then(data => {
      // Hiển thị thông tin sản phẩm trong giao diện người dùng
      displayProductDetails(data);
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
}
function displayProductDetails (data){
  const blogContainer = document.querySelector('.big-blog');

  const blogItem = document.createElement('div');
  blogItem.classList.add('blog');

  blogItem.innerHTML = `
  <img src="${data.img}" alt="" />
  <div class="time-blog flex">
    <div class="person">
      <i class="bi bi-person-fill"></i>
      <span>Templatemonster</span>
    </div>
    <div class="time">
      <i class="bi bi-table"></i>
      <span>${data.releasedate}</span>
    </div>
  </div>
  <div class="info-blog">
    <h2>${data.title}</h2>
    <p>
    ${data.Content}
    </p>
  </div>
  `;

  blogContainer.appendChild(blogItem);


}
getProductDetails(blogId)




  