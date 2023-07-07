// Change Account

//lấy dữ liệu từ trong local
var storedUser = localStorage.getItem("Users");
// console.log(storedUser);
if (storedUser) {
  var Users = JSON.parse(storedUser);
  const btnchange = document.querySelector(".btn-change-info-account");
  const user = document.getElementById("user-name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const formaccount = document.getElementById("account-form");
  const btnsave = document.querySelector(".btn-save-info-account");
  //   console.log(user, email, password);
  for (var i = 0; i < Users.length; i++) {
    (function () {
      var obj = Users[i];

      if (obj.isLogin == true) {
        user.value = obj.username;
        email.value = obj.email;
        password.value = obj.password;

        btnchange.addEventListener("click", function (event) {
          event.preventDefault();
          // Cho phép chỉnh sửa thông tin tài khoản
          user.disabled = false;
          password.disabled = false;

          btnchange.classList.add("display-btn");
          btnsave.classList.remove("display-btn");
          // console.log(obj);
        });
        // console.log(obj);

        // Bắt sự kiện khi nhấn vào nút "Lưu"
        btnsave.addEventListener("click", function (event) {
          // event.preventDefault(); // Ngăn form submit lại và làm mất dữ liệu

          //lấy thông tin tài khoản cũ
          const oldaccount = obj;
          console.log(oldaccount);
          // Lấy thông tin tài khoản mới từ các ô input
          const newAccount = Object.assign({}, oldaccount, {
            username: user.value,

            password: password.value,
          });
          console.log(newAccount);
          obj = newAccount;
          console.log(obj);
          const index = Users.indexOf(oldaccount);
          if (index !== -1) {
            //xóa mảng cũ
            Users.splice(index, 1);
            // thêm mảng mới vào
            Users.splice(index, 0, obj);
          }
          // Users.push(obj);
          console.log(Users);
          btnchange.classList.remove("display-btn");
          btnsave.classList.add("display-btn");
          // Lưu mảng mới vào localStorage
          localStorage.setItem("Users", JSON.stringify(Users));

          // Vô hiệu hóa chỉnh sửa thông tin tài khoản
          user.disabled = true;
          email.disabled = true;
          password.disabled = true;
        });

        // Vô hiệu hóa chỉnh sửa thông tin tài khoản
        user.disabled = true;
        email.disabled = true;
        password.disabled = true;
      }
    })();
  }
  const btnlogout = document.querySelector(".btn-logout");
  btnlogout.addEventListener("click", (event) => {
    user.value = "";
    email.value = "";
    password.value = "";
  });
}

//Lấy dữ liệu danh sách bài hát yêu thích
var storedData = localStorage.getItem("Playlist");
if (storedData) {
  var Playlist = JSON.parse(storedData);
  const notemess = document.querySelector(".note-message");
  console.log(Playlist);
  if (Playlist.length == []) {
    notemess.classList.remove("display-btn");
  } else {
    const playmusic = $(".playlist-music");
    const RenderPlaylist = (item) =>
      item
        .map(
          (item) => `
        
          <div class="song">
            <div class="song-sanbox flex">
              <div class="wrapper-song-box">
                <img
                  src="${item.img}"
                />
                <i data-id="0" class="bi bi-play-circle icon-play-song-box"></i>
                <div class="bg-overlay"></div>
              </div>

              <div class="info-song">
                <h5>${item.musicname}</h5>
                <p>${item.singgername}</p>
                <button>Play</button>
                <button data-id="${item.id}" class="btn-close-music"><i class="bi bi-x"></i></button>
              </div>
            </div>
          </div>
  `
        )
        .join("");
    $(() => {
      playmusic.html(RenderPlaylist(Playlist));
    });
  }
}

//Xóa  bài hát  yêu thích theo yêu cầu

$(document).ready(function () {
  // Xử lý sự kiện click vào nút btn-close-music
  function handleRemoveMusic() {
    var storedData = localStorage.getItem("Playlist");
    if (storedData) {
      const notemess = document.querySelector(".note-message");
      var Playlist = JSON.parse(storedData);

      var itemId = $(this).attr("data-id");
      for (var i = 0; i < Playlist.length; i++) {
        var obj = Playlist[i];
        if (obj.id === itemId) {
          const index = Playlist.indexOf(obj);
          console.log(index);
          if (index !== -1) {
            Playlist.splice(index, 1);
            console.log(Playlist);
          }
          Toastify({
            text: "Xóa bài hát thành công",
            duration: 1000, // Thời gian hiển thị (ms)
            close: false, // Hiển thị nút đóng
            gravity: "top", // Vị trí của thông báo ("top", "bottom", "center")
            backgroundColor: "linear-gradient(to right,#b06ab3, #b06ab3)", // Màu nền
          }).showToast();
          localStorage.setItem("Playlist", JSON.stringify(Playlist));
          if (Playlist.length === 0) {
            notemess.classList.remove("display-btn");
            $(".playlist-music").html(""); // Xóa giao diện danh sách bài hát
          } else {
            const playmusic = $(".playlist-music");
            const RenderPlaylist = (item) =>
              item
                .map(
                  (item) => `
                
                  <div class="song">
                    <div class="song-sanbox flex">
                      <div class="wrapper-song-box">
                        <img
                          src="${item.img}"
                        />
                        <i data-id="0" class="bi bi-play-circle icon-play-song-box"></i>
                        <div class="bg-overlay"></div>
                      </div>
          
                      <div class="info-song">
                        <h5>${item.musicname}</h5>
                        <p>${item.singgername}</p>
                        <button>Play</button>
                        <button data-id="${item.id}" class="btn-close-music"><i class="bi bi-x"></i></button>
                      </div>
                    </div>
                  </div>
          `
                )
                .join("");
            playmusic.html(RenderPlaylist(Playlist));

            // Gắn kết lại sự kiện click cho nút btn-close-music
            $(".btn-close-music").click(handleRemoveMusic);
          }
          break;
        }
      }
    }
  }

  // Gắn kết sự kiện click cho nút btn-close-music ban đầu
  $(".btn-close-music").click(handleRemoveMusic);
});

//Khi click logou thì mảng Playlist sẽ về rỗng
const logout = document.querySelector(".btn-logout");
var storedData = localStorage.getItem("Playlist");
if (storedData) {
  var Playlist = JSON.parse(storedData);

  const logoutclick = () => {
    var playlist = [];
    localStorage.setItem("Playlist", JSON.stringify(playlist));
    setTimeout(function () {
      // Điều hướng tới URL khác
      window.location.href = "index.html";
    }, 1500); // 5000ms = 5 giây
  };

  logout.addEventListener("click", logoutclick);
}
