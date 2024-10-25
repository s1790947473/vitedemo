import axiosDR from "@/utils/axios/axiosDR";
import axios from "axios";

// 获取单个文章
const getById = (id) => {
  const result = axiosDR.get(`/api/article/getById?id=${id}`);
  return result;
};

// 获取文章列表-分页
const getByList = (page, pageSize) => {
  const result = axiosDR.get(
    `/api/article/pageList?page=${page}&pageSize=${pageSize}`
  );
  return result;
};

// 添加文章
const add = (data) => {
  const result = axiosDR.post("/api/article/add", data);
  return result;
};

// 编辑
const edit = (data) => {
  const result = axiosDR.post("/api/article/edit", data);
  return result;
};

// 删除
const del = (id) => {
  const result = axiosDR.post("/api/article/del", { id: id });
  return result;
};

// 上传图片
const upoloadImg = (img) => {
  const result = axiosDR.postFile("/api/article/uploadImg", img);
  return result;
};

// 上传图片-wangEditor
const editorUploadImg = (img) => {
  const result = axiosDR.post("/api/article/wangEditor/uploadImg", img);
  return result;
};

// ES6导出
export default {
  getById,
  getByList,
  add,
  edit,
  del,
  upoloadImg,
  editorUploadImg,
};
