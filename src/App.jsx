import React, { useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const FileCompressor = () => {
  const [files, setFiles] = useState([]);

  // Xử lý khi chọn file
  const handleFileChange = (event) => {
    setFiles([...event.target.files]);
  };

  // Nén file thành ZIP
  const handleZipFiles = async () => {
    const zip = new JSZip();

    // Thêm từng file vào file ZIP
    files.forEach((file) => {
      zip.file(file.name, file);
    });

    // Tạo file ZIP và tải xuống
    const zipContent = await zip.generateAsync({
      type: "blob",
      streamFiles: true,
      compression: "DEFLATE",
      compressionOptions: { level: 9 },
      mimeType: "application/zip",
    });
    saveAs(zipContent, "files.zip");
  };

  return (
    <div>
      <h1>File Compressor</h1>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleZipFiles} disabled={files.length === 0}>
        Nén thành ZIP
      </button>

      <ul>
        {files.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FileCompressor;
