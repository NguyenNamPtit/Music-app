// const { event } = require("jquery");

//Valiable
let formIsValid;
const formEl = document.querySelector(".form");
const emailEl = document.querySelector("#email");
const passwordEl = document.querySelector("#password");
const emailErrorMsgEl = document.querySelector("#email ~ .error-message");
const passwordErrorMsgEl = document.querySelector("#password ~ .error-message");

//functions
formEl.addEventListener("submit", (event) => {
  event.preventDefault();

  // Lấy thông tin đăng nhập từ local storage
  var storedUser = localStorage.getItem("Users");

  //Xử lý đăng nhập
  // Kiểm tra xem thông tin đăng nhập có tồn tại trong local storage hay không
  if (storedUser) {
    var Users = JSON.parse(storedUser);

    // So sánh thông tin đăng nhập

    var isUserExist = Users.some(function (obj) {
      return obj.email === emailEl.value && obj.password === passwordEl.value;
    });

    if (isUserExist) {
      // Tạo một thông báo thành công
      Toastify({
        text: "Đăng nhập thành công",
        duration: 1000, // Thời gian hiển thị (ms)
        close: false, // Hiển thị nút đóng
        gravity: "top", // Vị trí của thông báo ("top", "bottom", "center")
        backgroundColor: "linear-gradient(to right, #b06ab3, #b06ab3)", // Màu nền
      }).showToast();

      setTimeout(function () {
        // Điều hướng tới URL khác
        window.location.href = "index.html";
      }, 2000); // 5000ms = 5 giây

      // Khóa và giá trị mới
      var keyToModify = "isLogin";
      var newValue = true;

      for (var i = 0; i < Users.length; i++) {
        var obj = Users[i];
        if (obj.email === emailEl.value) {
          obj[keyToModify] = newValue;
          // Nếu chỉ cần sửa một tài khoản duy nhất, bạn có thể dừng vòng lặp ở đây.
        } else {
          obj[keyToModify] = false;
        }
      }

      // Lưu mảng mới vào localStorage
      localStorage.setItem("Users", JSON.stringify(Users));
    } else {
      // Tạo một thông báo thành công
      Toastify({
        text: "Email hoặc mật khẩu không hợp lệ",
        duration: 3000, // Thời gian hiển thị (ms)
        close: false, // Hiển thị nút đóng
        gravity: "top", // Vị trí của thông báo ("top", "bottom", "center")
        backgroundColor: "linear-gradient(to right, #b06ab3, #b06ab3)", // Màu nền
      }).showToast();
    }
  }

  //validate email
  if (emailEl.value.trim().length === 0) {
    emailErrorMsgEl.textContent = "Vui lòng nhập Email";
    formIsValid = false;
  } else {
    emailErrorMsgEl.textContent = "";
  }

  //validate password
  if (passwordEl.value.length === 0) {
    passwordErrorMsgEl.textContent = "Vui lòng nhập mật khẩu    ";
    formIsValid = false;
  } else if (passwordEl.value.length < 6) {
    passwordErrorMsgEl.textContent = "Mật khẩu phải tối thiểu 6 ký tự ";
    formIsValid = false;
  } else {
    passwordErrorMsgEl.textContent = "";
  }

  //reset
  // window.location.href = "index.html";
  // formEl.reset();
});
