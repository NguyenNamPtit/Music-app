import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick.min.js";
import $ from "jquery";
import { musics } from "./db";
import { API_URL, getApi } from "../utils/utils";

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

const loadApi = async () => {
  const musicss = await getApi(API_URL);
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

  const listAlbumss = $(".list-albumsss2");
  const renderAlbumss = (item) =>
    item
      .map(
        (item) => `
        <div data-id="${item.id}" class="music-box">
              <div class="wrapper-music-box">
                <img
                  class="img-music-box"
                  src="${item.img}"
                  alt="music box"
                />
                <i data-id="${item.id}" class="bi bi-play-circle icon-play-music-box"></i>
                <div class="bg-overlay"></div>
              </div>
              <div class="music-box-content mt-2">
                <a class="name-music-box fs-20" 
                  >${item.singername}</a
                >
                
              </div>
            </div>
        `
      )
      .join("");

  const listsong = $(".list-song");
  const renderSong = (item) =>
    item
      .map(
        (item) => `
            <div data-id="${item.id}" class="song  col-lg-4 col-md-6 col-sm-12  col-xs-12 ">
              <div class="song-sanbox flex">
              <div class="wrapper-song-box">
                  <img src="${item.img}" />
                  <i data-id="${item.id}" class="bi bi-play-circle icon-play-song-box"></i>
                  <div class="bg-overlay"></div>
                </div>
      
                <div class="info-song" >
                  <h5><a class="name-music" >${item.musicName}</a></h5>
                  <p>${item.singername}</p>
                  <button>Play</button>
                  <button data-id="${item.id}" class="btn-icon-heart"><a  class="bi bi-suit-heart icon-heart"></a></button>
                </div>
              </div>
            </div>
            
            `
      )
      .join("");

  $(() => {
    listsong.html(renderSong(musicss.slice(0, 6)));
  });
  //RenderAlbums
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
  $(() => {
    listAlbumss.html(renderAlbumss(musicss));
    listAlbumss.slick({
      autoplay: true,
      autoplaySpeed: 6000,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      prevArrow:
        '<div class="slick-prev"><a class="bi bi-arrow-left-short"></a></div>',
      nextArrow:
        '<div class="slick-next"><a class="bi bi-arrow-right-short"></a></i></div>',
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
  listAlbumss.on("click", "i", function () {
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

  listsong.on("click", "i", function () {
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

  // Thêm bài hát vào playlist

  $(document).ready(function () {
    $(".info-song").on("click", ".btn-icon-heart", function () {
      var infoSongElement = $(this).closest(".info-song");

      var storedUser = localStorage.getItem("Users");
      if (storedUser) {
        var Users = JSON.parse(storedUser);
        var isLoggedIn = false;

        for (var i = 0; i < Users.length; i++) {
          var obj = Users[i];
          if (obj.isLogin == true) {
            isLoggedIn = true;
            break;
          }
        }

        if (isLoggedIn) {
          handleIconHeartClick(infoSongElement);
        } else {
          showToast("Bạn cần đăng nhập để thêm bài hát");
        }
      } else {
        showToast("Bạn cần đăng nhập để thêm bài hát");
      }
    });
  });

  function handleIconHeartClick(infoSongElement) {
    if (localStorage.getItem("Playlist") === null) {
      const itemId = infoSongElement.find(".btn-icon-heart").attr("data-id");
      currentSong = itemId;
      var playlist = [];
      var Music = {
        id: currentSong,
        img: musicss[currentSong].img,
        musicname: musicss[currentSong].musicName,
        singgername: musicss[currentSong].singername,
      };
      playlist.push(Music);
      showToast("Thêm bài hát thành công");
      localStorage.setItem("Playlist", JSON.stringify(playlist));
    } else {
      var storedData = localStorage.getItem("Playlist");
      var playlist = storedData ? JSON.parse(storedData) : [];

      const itemId = infoSongElement.find(".btn-icon-heart").attr("data-id");
      currentSong = itemId;

      var valueToCheck = currentSong;
      var keyToCheck = "id";
      var isValueExists = playlist.some(function (obj) {
        if (
          obj.hasOwnProperty(keyToCheck) &&
          obj[keyToCheck] === valueToCheck
        ) {
          return true;
        }
      });

      if (isValueExists) {
        showToast("Bài hát đã tồn tại");
      } else {
        var Music = {
          id: currentSong,
          img: musicss[currentSong].img,
          musicname: musicss[currentSong].musicName,
          singgername: musicss[currentSong].singername,
        };
        playlist.push(Music);
        showToast("Thêm bài hát thành công");
        localStorage.setItem("Playlist", JSON.stringify(playlist));
      }
    }
  }

  function showToast(message) {
    Toastify({
      text: message,
      duration: 1000,
      close: false,
      gravity: "top",
      backgroundColor: "linear-gradient(to right, #b06ab3, #b06ab3)",
    }).showToast();
  }

  //Khi click logou thì mảng Playlist sẽ về rỗng

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

  // chuyển sang trang daital
  const musiclistt = document.querySelector(".list-albumsss2");

  musiclistt.addEventListener("click", (e) => {
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
        redirectToProductDetaill(musicId);
      }
    }
  });

  // Hàm điều hướng đến trang chi tiết sản phẩm
  function redirectToProductDetaill(musicId) {
    // Định dạng URL của trang chi tiết dựa trên productId
    const detailUrl = `detailalbums.html?id=${musicId}`;

    // Chuyển hướng đến trang chi tiết
    window.location.href = detailUrl;
    console.log(detailUrl);
  }

  // chuyển sang trang daital
  const musiclisttttt = document.querySelector(".list-song");

  musiclisttttt.addEventListener("click", (e) => {
    const target = e.target;

    //kiểm tra xem bút được click có phải read more hay không
    if (target.classList.contains("name-music")) {
      // Lấy phần tử cha chứa thuộc tính data-id
      const musicItem = target.closest(".song");

      // Kiểm tra xem blogItem có tồn tại và có thuộc tính data-id không
      if (musicItem && musicItem.dataset.id) {
        const musicId = musicItem.dataset.id;
        console.log(musicId);
        // Điều hướng đến trang chi tiết sản phẩm
        redirectToProductDetailllll(musicId);
      }
    }
  });

  // Hàm điều hướng đến trang chi tiết sản phẩm
  function redirectToProductDetailllll(musicId) {
    // Định dạng URL của trang chi tiết dựa trên productId
    const detailUrl = `detailmusic.html?id=${musicId}`;

    // Chuyển hướng đến trang chi tiết
    window.location.href = detailUrl;
    console.log(detailUrl);
  }
};

loadApi();
