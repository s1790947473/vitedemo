<template>
  <div>
    <h2>文件切片上传 (JSON/Excel)</h2>
    <input type="file" @change="handleFileChange" />
    <button @click="uploadFile" :disabled="!file">上传文件</button>
    <p v-if="uploadProgress > 0">上传进度: {{ uploadProgress }}%</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const file = ref(null);
const uploadProgress = ref(0);

// 存储在file对象中
const handleFileChange = (event) => {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    file.value = selectedFile;
  }
};

// 切片函数
const sliceFile = (file, chunkSize = 5 * 1024 * 1024) => {
  const totalChunks = Math.ceil(file.size / chunkSize);
  const chunks = [];

  for (let i = 0; i < totalChunks; i++) {
    const chunk = file.slice(i * chunkSize, (i + 1) * chunkSize);
    chunks.push({ chunk, index: i });
  }

  return chunks;
};

// 上传函数
const uploadFile = async () => {
  if (!file.value) return;

  const chunkSize = 5 * 1024 * 1024; // 每个切片5MB
  const chunks = sliceFile(file.value, chunkSize);        // 文件变味了chunks
  const totalChunks = chunks.length;
  let uploadedChunks = 0;

  for (let { chunk, index } of chunks) {
    const formData = new FormData();                       // file对象添加到formdata对象中
    formData.append('file', chunk);
    formData.append('index', index);
    formData.append('fileName', file.value.name);

    await axios.post('http://localhost:5000/upload', formData, {     // 向后端上传
      onUploadProgress: (progressEvent) => {                         // 上传进度
        const percentCompleted = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        uploadProgress.value = Math.round((uploadedChunks / totalChunks) * 100 + percentCompleted / totalChunks);
      }
    });

    uploadedChunks += 1;
  }

  // 上传完成后请求合并文件
  await axios.post('http://localhost:5000/merge', {
    fileName: file.value.name,
    totalChunks: totalChunks
  });

  alert('文件上传成功！');
  uploadProgress.value = 0;  // 重置进度
};
</script>

<style scoped>
h2 {
  margin-bottom: 16px;
}
input {
  margin-bottom: 12px;
}
button {
  margin-top: 12px;
}
</style>
