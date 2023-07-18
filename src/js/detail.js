import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick.min.js";
import $ from "jquery";
import { musics } from "./db";
// import "../css/global.css";

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

// get Api
const API_URL = "https://api-app-mu.vercel.app/musics";

// lấy dữ liệu từ api
async function getMusics(api) {
  try {
    let res = await fetch(api);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

const musicss = await getMusics(API_URL);
// console.log(musicss);
// render
const listAlbums = $(".list-albumsss1");
const renderAlbums = (items) =>
  items
    .map(
      (item) => `
         <div data-id="${item.id}" class="music-box ">
            <div class="wrapper-music-box ">
              <img
                class="img-music-box"
                src="${item.img}"
                alt="music box"
              />
              <i data-id="${item.id}" class="bi bi-play-circle icon-play-music-box"></i>
              <div class="bg-overlay"></div>
            </div>
            <div class="music-box-content mt-2">
              <a  class="name-music-box fs-20" 
                >${item.singername}</a
              >
              
            </div>
          </div>
  `
    )
    .join("");

$(() => {
  listAlbums.html(renderAlbums(musicss));
  listAlbums.slick({
    autoplay: true,
    autoplaySpeed: 6000,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    prevArrow:
      '<div class="slick-prev"><a class="bi bi-arrow-left-short"></a></div>',
    nextArrow:
      '<div class="slick-next"><a class="bi bi-arrow-right-short"></a></div>',
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
          centerMode: true,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 739,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "20px",
        },
      },
    ],
  });
});

//
const musicalbums = $(".music");
const renderMusicAlbums = (item) =>
  item
    .map(
      (item) => `
      <div class="first-music flex">
          <p class="number">${item.id}</p>
          <span class="songslist-play">
            <img src="./assets/img/play_songlist.svg" alt="" />
          </span>
          <div class="content-music flex">
            <img src="${item.img}" alt="" />
            <div class="info-musicc">
              <h2>${item.musicName}</h2>
              <p class="singger">${item.singername}</p>
            </div>
          </div>
          <span class="icon"><i class="bi bi-suit-heart"></i></span>
          <span class="music-time">4:20</span>
        </div>
      `
    )
    .join("");
    
$(() => {
  
  musicalbums.html(renderMusicAlbums(musicss.slice(0, 4)));
});
//
// const musicalbumss = $(".albumss");
// const renderMusicAlbumss = (item) =>
//   item
//     .map(
//       (item) => `
    
//         <img src="${item.img}" alt="" />
//         <div>
//           <div class="info-albumss">
//             <h2>${item.musicName}</h2>
//             <p>4 songs</p>
//             <p><span>Released:</span> September 20th, 2022</p>
//           </div>
//           <div class="list-buttonn">
//             <button class="playy-all">Play All</button>
//             <button class="add-to-queue">Add To Queue</button>
//           </div>
//         </div>
      
//       `
//     )
//     .join("");

// $(() => {
//   musicalbumss.html(renderMusicAlbumss(musicss.slice(0, 1)));
// });

//
//
/*Variable*/
const playclose = document.querySelector(".player-close");
const playwrapper = document.querySelector(".play-wrapper");
const downup = document.querySelector(".down-up");
const queue = document.querySelector(".button-queue");
const playlist = document.querySelector(".playlist-wrap");

/*sound bar*/
playclose.addEventListener("click", (event) => {
  playwrapper.classList.toggle("two-close");
  playclose.classList.toggle("down-up");
});

/*queue*/
queue.addEventListener("click", (event) => {
  playlist.classList.toggle("queue-on");
});

//HandlePLay
let currentSong = 0;

const RenderSongPlay = (currentSong) => {
  let songThumbnail = $(".song-thumbnail");
  let nameSong = $(".name-song");
  let nameSingleSong = $(".name-single-song");

  songThumbnail.attr("src", musicss[currentSong].img);
  nameSong.text(musicss[currentSong].musicName);
  nameSingleSong.text(musicss[currentSong].singername);
};

const play = document.querySelector(".btn-play");
const pause = document.querySelector(".btn-pause");
const audio = document.querySelector(".audio");
audio.src = musicss[currentSong].audio;

const handlePlay = () => {
  audio.play();
  if (audio.currentTime === audio.duration) {
    play.classList.remove("play-none");
  }
};

play.addEventListener("click", (event) => {
  play.classList.toggle("play-none");
  pause.classList.toggle("play-none");
});

play.addEventListener("click", handlePlay);

//handleStop

const handleStop = () => {
  pause.classList.toggle("play-none");
  play.classList.toggle("play-none");
  audio.pause();
};
//resetMusic
let isReload = false;
audio.onended = function resetMusic() {
  if (isReload) {
    reloatmusic();
  } else {
    pause.classList.add("play-none");
    play.classList.remove("play-none");
    playnext.click();
  }
};

pause.addEventListener("click", handleStop);
//next song
const playnext = document.querySelector(".btn-next-song");
const playprev = document.querySelector(".btn-prev-song");
let isRandom = false;
const PlayNextSong = () => {
  play.classList.add("play-none");
  pause.classList.remove("play-none");
  currentSong++;
  if (currentSong >= musicss.length) {
    currentSong = 0;
  }
  RenderSongPlay(currentSong);
  audio.src = musicss[currentSong].audio;
  audio.play();
};
playnext.addEventListener("click", () => {
  if (isRandom) {
    play.classList.add("play-none");
    pause.classList.remove("play-none");
    randommusic();
  } else {
    PlayNextSong();
  }
});

//prevsong
const PlayPrevSong = () => {
  play.classList.add("play-none");
  pause.classList.remove("play-none");
  currentSong--;
  if (currentSong < 0) {
    currentSong = musicss.length - 1;
  }

  RenderSongPlay(currentSong);
  audio.src = musicss[currentSong].audio;
  audio.play();
};

playprev.addEventListener("click", PlayPrevSong);

//rendermusicplay

const ListSongPlay = $(".music-bar");

$(() => {
  RenderSongPlay(currentSong);
});

// Xử lý Time
const progressBar = document.querySelector(".play-bar");

const TimeProgress = () => {
  var duration = audio.duration;
  var currentTime = audio.currentTime;
  if (audio.duration) {
    const progressPercent = Math.floor((currentTime / duration) * 100);
    progressBar.style.width = progressPercent + "%";
    console.log(progressBar.style.width);
  }
};

audio.addEventListener("timeupdate", TimeProgress);

// render currentTime and duration
//duration
const timeend = document.querySelector(".duration");

audio.addEventListener("loadedmetadata", () => {
  const duration = formatTime(audio.duration);
  timeend.innerHTML = ` ${duration}`;
});

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

//currTime

const timestart = document.querySelector(".current-time");

const interval = setInterval(() => {
  const time = formatTime(audio.currentTime);
  timestart.innerHTML = time;
}, 1000);

//tua nhac
const seekBar = document.querySelector(".seek-bar");

seekBar.addEventListener("click", function (e) {
  var pos = (e.pageX - seekBar.offsetLeft) / seekBar.offsetWidth;
  audio.currentTime = pos * audio.duration;
});

//random music
const randombtn = document.querySelector(".random-sound-bar");
const randomicon = document.querySelector(".random");

randombtn.addEventListener("click", () => {
  isRandom = !isRandom;
  if (isRandom) {
    randomicon.classList.add("color-icon");
  } else {
    randomicon.classList.remove("color-icon");
  }
});
const randommusic = () => {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * musicss.length);
  } while (newIndex === currentSong);
  currentSong = newIndex;
  console.log(currentSong);
  RenderSongPlay(currentSong);
  audio.src = musicss[currentSong].audio;
  audio.play();
};

//reload music
const reloadbtn = document.querySelector(".reloat-sound-bar");
const reloadicon = document.querySelector(".reloat");
reloadbtn.addEventListener("click", (event) => {
  isReload = !isReload;
  if (isReload) {
    reloadicon.classList.add("color-icon");
  } else {
    reloadicon.classList.remove("color-icon");
  }
});

const reloatmusic = () => {
  audio.currentTime = 0;
  audio.play();
};

//volume music
const volumebtn = document.querySelector(".volume-sound-bar");
const volumeicon = document.querySelector(".volume");
const volumemute = document.querySelector(".volume-mute");
volumebtn.addEventListener("click", () => {
  volumeicon.classList.toggle("play-none");
  volumemute.classList.toggle("play-none");
  volumemute.classList.toggle("color-icon");
  audio.muted = !audio.muted;
});

//iconclickplaymusic
listAlbums.on("click", "i", function () {
  const itemId = $(this).attr("data-id");
  currentSong = itemId;
  RenderSongPlay(currentSong);
  audio.src = musicss[currentSong].audio;
  audio.play();
  playwrapper.classList.remove("two-close");
  playclose.classList.remove("down-up");
  play.classList.add("play-none");
  pause.classList.remove("play-none");
  // console.log("test", itemId);
  // console.log($(this));
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




//lấy id thông tin sản phẩm và hiển thị
// Lấy tham số id từ URL
const urlParams = new URLSearchParams(window.location.search);
console.log(urlParams)
const musicId = urlParams.get("id");

// Hàm lấy thông tin chi tiết sản phẩm từ API
function getProductDetails(musicId) {
  fetch(` https://api-app-mu.vercel.app/musics/${musicId}`)
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
  const musicContainer = document.querySelector('.albumss');

  const musicItem = document.createElement('div');
  musicItem.classList.add('albumsss');

  musicItem.innerHTML = `
  <img src="${data.img}" alt="" />
        <div>
          <div class="info-albumss">
            <h2>${data.musicName}</h2>
            <p>4 songs</p>
            <p><span>Released:</span> September 20th, 2022</p>
          </div>
          <div class="list-buttonn">
            <button class="playy-all">Play All</button>
            <button class="add-to-queue">Add To Queue</button>
          </div>
        </div>
  `;

  musicContainer.appendChild(musicItem);


}
getProductDetails(musicId)



// chuyển sang trang daital
const musiclist = document.querySelector(".list-albumsss1");

musiclist.addEventListener("click", (e) => {
  const target = e.target;

  //kiểm tra xem bút được click có phải read more hay không
  if (target.classList.contains("name-music-box")) {
     // Lấy phần tử cha chứa thuộc tính data-id
     const musicItem = target.closest(".music-box");

     // Kiểm tra xem blogItem có tồn tại và có thuộc tính data-id không
     if (musicItem && musicItem.dataset.id) {
       const musicId = musicItem.dataset.id;
       console.log(musicId);
       // Điều hướng đến trang chi tiết sản phẩm
       redirectToProductDetail(musicId);
     }
  }
});

// Hàm điều hướng đến trang chi tiết sản phẩm
function redirectToProductDetail(musicId) {
  // Định dạng URL của trang chi tiết dựa trên productId
  const detailUrl = `detailalbums.html?id=${musicId}`;

  // Chuyển hướng đến trang chi tiết
  window.location.href = detailUrl;
  console.log(detailUrl);
}