// get Api
export const API_URL = "https://api-app-mu.vercel.app/musics";

export const API_BLOG_URL = "https://api-app-mu.vercel.app/blogs";

// lấy dữ liệu từ api
export const getApi = async (api) => {
  try {
    let res = await fetch(api);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}