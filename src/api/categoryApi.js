import axiosDR from "@/utils/axios/axiosDR";

//获取单条记录
const getById = (id) => {
  return axiosDR.get(`/api/category/getById?id=${id}`);
};

//获取列表
const getListByParentId = (parent_id) => {
  return axiosDR.get(`/api/category/getListByParentId?parent_id=${parent_id}`);
};

//获取列表 - all
const getAllById = (id) => {
  return axiosDR.get(`/api/category/list?id=${id}`);
};

//添加
const add = (data) => {
  return axiosDR.post("/api/category/add", data);
};

//编辑
const edit = (data) => {
  return axiosDR.post("/api/category/edit", data);
};

//删除
const del = (id) => {
  return axiosDR.post("/api/category/del", { id: id });
};

// 默认导出
export default { getById, getListByParentId, getAllById, add, edit, del };
