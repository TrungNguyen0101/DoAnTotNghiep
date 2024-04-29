import React, { useEffect, useState } from "react";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import axios from "axios";

import "./styled.css";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UploadImage = ({ setImageValue, setImageError }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const [loading, setLoading] = useState(false);

  const [fileList, setFileList] = useState([]);

  /* cancel preview */
  const handleCancel = () => setPreviewOpen(false);

  /* preview */
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  /* remove */
  const handleRemove = (e) => {
    const index = fileList?.findIndex((f) => f?.uid === e?.uid);
    const copyList = fileList.slice();
    copyList.splice(index, 1);
    setFileList([...copyList]);
    setImageValue([...copyList]);
    if (copyList.length === 0) {
      setImageError("Please choose image");
      // dispatch(saveErrorMainImage("*Please upload a main image"));
    }
  };

  /* upload image with cloudinary */
  const uploadProfileImg = async (formData) => {
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dsrvia1wu/image/upload",
        formData
      );
      const { url, asset_id, etag } = res.data;
      return { url, asset_id, etag };
    } catch (err) {
      console.log(err);
    }
  };
  /* Upload image with local */
  const upLoadImage = async (e) => {
    try {
      if (e.file) {
        setLoading(true);

        const formData = new FormData();
        formData.append("file", e.file);
        formData.append("upload_preset", "nguyenGMO");
        const image = await uploadProfileImg(formData);

        /* etag : check image upload trùng nếu cần */
        setFileList((prevImagePaths) => [
          ...prevImagePaths,
          {
            url: image?.url,
          },
        ]);
        setImageValue((prevImagePaths) => [
          ...prevImagePaths,
          {
            url: image?.url,
          },
        ]);
        setLoading(false); // Tải lên hoàn thành
        setImageError("");
        // dispatch(saveErrorMainImage(""));
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Upload
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        listType="picture-card"
        fileList={fileList}
        maxCount={1}
        onPreview={handlePreview}
        onRemove={(e) => handleRemove(e)}
        customRequest={(e) => upLoadImage(e)}
        className="123"
      >
        {fileList.length >= 1 ? null : (
          <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
              style={{
                marginTop: 8,
              }}
            >
              Upload
            </div>
          </div>
        )}
      </Upload>

      <Modal
        open={previewOpen}
        footer={null}
        onCancel={handleCancel}
        className="max-w-[700px] max-h-[450px] top-[20px]"
      >
        <img
          alt="example"
          style={{
            width: "100%",
            height: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};
export default UploadImage;
