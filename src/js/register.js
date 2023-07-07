// const { event } = require("jquery");

//Valiable
const formEl = document.querySelector(".form-main");
const userEl = document.querySelector("#user");
const emailEl = document.querySelector("#email");
const passwordEl = document.querySelector("#password");
const confirmEl = document.querySelector("#confirm");
const userErrorMsEl = document.querySelector("#user ~ .error-message");
const emailErrorMsgEl = document.querySelector("#email ~ .error-message");
const passwordErrorMsgEl = document.querySelector("#password ~ .error-message");
const confirmErrorMsEl = document.querySelector("#confirm ~ .error-message");

//functions

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  let formIsValid = true;

  //validate user
  if (userEl.value.trim().length === 0) {
    userErrorMsEl.textContent = "Vui lòng nhập User Name";
    formIsValid = false;
  } else {
    userErrorMsEl.textContent = "";
    formIsValid = true;
  }

  //validate email
  //   var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailEl.value.trim().length === 0) {
    emailErrorMsgEl.textContent = "Vui lòng nhập Email";
    formIsValid = false;
  } else {
    emailErrorMsgEl.textContent = "";
    formIsValid = true;
  }

  //   else if (emailEl.value.trim() != emailRegex) {
  //     emailErrorMsgEl.textContent = "Vui lòng nhập địa chỉ email hợp lệ";
  //     formIsValid = false;
  //   }

  // validate password
  if (passwordEl.value.length === 0) {
    passwordErrorMsgEl.textContent = "Vui lòng nhập mật khẩu    ";
    formIsValid = false;
  } else if (passwordEl.value.length < 6) {
    passwordErrorMsgEl.textContent = "Mật khẩu phải tối thiểu 6 ký tự ";
    formIsValid = false;
  } else {
    passwordErrorMsgEl.textContent = "";
    formIsValid = true;
  }
  if (confirmEl.value.length === 0) {
    confirmErrorMsEl.textContent = "Vui lòng nhập mật khẩu    ";
    formIsValid = false;
  } else if (confirmEl.value.length < 6) {
    confirmErrorMsEl.textContent = "Mật khẩu phải tối thiểu 6 ký tự ";
    formIsValid = false;
  } else {
    confirmErrorMsEl.textContent = "";
    formIsValid = true;
  }

  //điều kiện đăng kí
  if (passwordEl.value != confirmEl.value) {
    // Tạo một thông báo thành công
    Toastify({
      text: "Đăng kí không thành công !",
      duration: 3000, // Thời gian hiển thị (ms)
      close: false, // Hiển thị nút đóng
      gravity: "top", // Vị trí của thông báo ("top", "bottom", "center")
      backgroundColor: "linear-gradient(to right, #b06ab3, #b06ab3)", // Màu nền
    }).showToast();
    formIsValid = false;
  }

  if (formIsValid) {
    // gửi dữ liệu đi

    // Lấy mang hiện tại từ localStorage (nếu có)
    var storedData = localStorage.getItem("Users");

    // Kiểm tra xem mang đã tồn tại hay chưa
    var Users = storedData ? JSON.parse(storedData) : [];

    // Thêm obj mới vào mang

    var valueToCheck = emailEl.value;
    var keyToCheck = "email";

    //kiểm tra giá trị mới thêm vao da ton tai chua
    var isValueExists = Users.some(function (obj) {
      if (obj.hasOwnProperty(keyToCheck) && obj[keyToCheck] === valueToCheck) {
        return true;
      }
    });

    if (isValueExists) {
      // Tạo một thông báo thành công
      Toastify({
        text: "Email đã tồn tại !",
        duration: 3000, // Thời gian hiển thị (ms)
        close: false, // Hiển thị nút đóng
        gravity: "top", // Vị trí của thông báo ("top", "bottom", "center")
        backgroundColor: "linear-gradient(to right, #b06ab3, #b06ab3)", // Màu nền
      }).showToast();
    }

    if (!isValueExists) {
      var info = {
        username: userEl.value,
        email: emailEl.value,
        password: passwordEl.value,
        isLogin: false,
      };
      Users.push(info);
      // Tạo một thông báo thành công
      Toastify({
        text: "Đăng kí thành công",
        duration: 3000, // Thời gian hiển thị (ms)
        close: false, // Hiển thị nút đóng
        gravity: "top", // Vị trí của thông báo ("top", "bottom", "center")
        backgroundColor: "linear-gradient(to right, #b06ab3, #b06ab3)", // Màu nền
      }).showToast();
    }

    // Lưu mang đã cập nhật vào localStorage
    localStorage.setItem("Users", JSON.stringify(Users));

    formEl.reset();
  }
});
