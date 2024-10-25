// 一般axios的封装都写在utils中

import axios from "axios";
// 创建 Axios 实例
const axiosInstance = axios.create({
  // baseURL: "http://127.0.0.1:8008",
  baseURL: import.meta.env.VITE_API_URL, // 动态获取 API URL
  timeout: 5000, // 设置请求超时时间为 5000 毫秒
});

// 封装 GET 请求   提取data部分
const get = (url, data = {}) => {
  return axiosInstance
    .get(url, { params: data })
    .then((response) => response.data);
};

// 封装 POST 请求
const post = (url, data = null) => {
  return axiosInstance.post(url, data).then((response) => response.data);
};

// 封装post表单请求
const postForm = (url, data = null) => {
  return axiosInstance
    .post(url, data, {
      headers: {
        // "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((response) => response.data);
};

// post文件请求
const postFile = (url, data = null) => {
  return axiosInstance
    .post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
};

// post带有Authorization
const postToken = (url, token, data = null) => {
  return axiosInstance
    .post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
};

export default { get, post, postForm, postFile, postToken };
