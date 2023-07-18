import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick.min.js";

import $ from "jquery";
import { musics } from "./db";
// import "../css/global.css";
import { API_URL, getApi } from "../utils/utils";

const loadApi = async () => {
  const blogs = await getApi(API_URL);
  // console.log(blogs);

  //in ra UI
  const bloggs = $(".Blog-bigg");
  const RenderBlog = (items) =>
    items
      .map(
        (items) => `

<div data-id="${items.id}" class="big-blog col-xl-6 col-lg-12 col-md-12 col-sm-12 col-xs-12">
<div class="blog">
<img src="${items.img}" alt="" />
<div class="time-blog flex">
  <div class="person">
    <i class="bi bi-person-fill"></i>
    <span>Templatemonster</span>
  </div>
  <div class="time">
    <i class="bi bi-table"></i>
    <span>${items.releasedate}</span>
  </div>
</div>
<div class="info-blog">
  <h2>${items.title}</h2>
  <p>
    ${items.Content}
  </p>
  <p ><a  class="readmore"  >Read More...</a></p>
</div>
</div>
        </div>
`
      )
      .join("");
  $(() => {
    bloggs.html(RenderBlog(blogs.slice(0, 4)));
  });

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

  // Tạp phân trang cho trang web

  const itemsPerPage = 4; // Số phần tử hiển thị trên mỗi trang
  let currentPage = 1;

  // Hàm lấy dữ liệu từ API và khởi tạo phân trang
  function fetchDataFromAPI() {
    displayPage(currentPage);
    createPagination();
  }

  // Hàm hiển thị phần từ trên trang hiện tại
  function displayPage(pageNumber) {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const slicedData = blogs.slice(startIndex, endIndex);

    const container = document.querySelector(".Blog-bigg");
    container.innerHTML = ""; // Xóa nội dung container cũ

    const blogItems = RenderBlogs(slicedData);
    container.innerHTML = blogItems;

    markCurrentPage(); // Đánh dấu trang hiện tại
  }

  // Hàm tạo phân trang
  function createPagination() {
    const totalPages = Math.ceil(blogs.length / itemsPerPage);
    const paginationDiv = document.getElementById("pagination");
    paginationDiv.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const pageLink = document.createElement("button");
      pageLink.classList.add("page");
      pageLink.href = "#blogs";
      pageLink.textContent = i;
      pageLink.addEventListener("click", () => {
        currentPage = i;
        displayPage(currentPage);
        window.scrollTo(0, 0); // Cuộn trang lên đầu khi chuyển trang
        markCurrentPage(); // Đánh dấu trang hiện tại
      });

      paginationDiv.appendChild(pageLink);
    }

    markCurrentPage(); // Đánh dấu trang hiện tại sau khi tạo phân trang
  }

  // Đánh dấu trang hiện tại bằng lớp active
  function markCurrentPage() {
    const pages = document.getElementsByClassName("page");

    for (let i = 0; i < pages.length; i++) {
      if (i + 1 === currentPage) {
        pages[i].classList.add("active");
      } else {
        pages[i].classList.remove("active");
      }
    }
  }

  // Hàm render các mục blog
  function RenderBlogs(items) {
    return items
      .map(
        (item) => `
    <div data-id="${item.id}" class="big-blog col-xl-6 col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <div class="blog">
        <img src="${item.img}" alt="" />
        <div class="time-blog flex">
          <div class="person">
            <i class="bi bi-person-fill"></i>
            <span>Templatemonster</span>
          </div>
          <div class="time">
            <i class="bi bi-table"></i>
            <span>${item.releasedate}</span>
          </div>
        </div>
        <div class="info-blog">
          <h2>${item.title}</h2>
          <p>${item.Content}</p>
          <p ><a class="readmore">Read More...</a></p>
        </div>
      </div>
    </div>
    `
      )
      .join("");
  }
  // Gọi hàm để lấy dữ liệu từ API và khởi tạo phân trang
  fetchDataFromAPI();

  // chuyển sang trang daital
  const bloglist = document.querySelector(".Blog-bigg");

  bloglist.addEventListener("click", (e) => {
    const target = e.target;

    //kiểm tra xem bút được click có phải read more hay không
    if (target.classList.contains("readmore")) {
      // Lấy phần tử cha chứa thuộc tính data-id
      const blogItem = target.closest(".big-blog");

      // Kiểm tra xem blogItem có tồn tại và có thuộc tính data-id không
      if (blogItem && blogItem.dataset.id) {
        const blogId = blogItem.dataset.id;
        console.log(blogId);
        // Điều hướng đến trang chi tiết sản phẩm
        redirectToProductDetail(blogId);
      }
    }
  });

  // Hàm điều hướng đến trang chi tiết sản phẩm
  function redirectToProductDetail(blogId) {
    // Định dạng URL của trang chi tiết dựa trên productId
    const detailUrl = `detailblog.html?id=${blogId}`;

    // Chuyển hướng đến trang chi tiết
    window.location.href = detailUrl;
    console.log(detailUrl);
  }
};

loadApi();
