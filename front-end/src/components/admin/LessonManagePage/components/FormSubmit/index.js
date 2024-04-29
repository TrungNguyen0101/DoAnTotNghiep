import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ChromePicker, SketchPicker } from "react-color";
import * as yup from "yup";
import Field from "../../../components/Field";
import Label from "../../../components/label";
import Input from "../../../components/input";
import UploadImage from "../../../components/uploadImage";
import FormSelect from "../FormSelect";
import { Button } from "antd";
import ButtonCustom from "../../../components/ButtonCustom";
import { FaTimes } from "react-icons/fa"; // Import icon from react-icons library
import { MdEdit } from "react-icons/md";
import axios from "axios";
import "./styled.css";
const schema = yup
  .object({
    answer: yup.string().required("Please enter answer"),
  })
  .required();
const FormSubmit = () => {
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    // resolver: yupResolver(schema),
    defaultValues: {},
  });
  const answerWatch = watch("answer");
  const [colorValue, setColorValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [imageValue, setImageValue] = useState("");

  const [colorError, setColorError] = useState("");
  const [selectError, setSelectError] = useState("");
  const [imageError, setImageError] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isFirstSubmit, setIsFirstSubmit] = useState(false);

  const [color, setColor] = useState("#ffffff");
  const [isColor, setIsColor] = useState(false);

  const handleChange = (pickedColor) => {
    setColor(pickedColor.hex);
  };
  const handleOnColor = () => {
    colorValue && setColor(colorValue);
    setIsColor(true);
  };
  const handleOffColor = () => {
    if (!colorValue) {
      setColorValue("");
    } else {
      setColorError("");
    }
    setIsColor(false);
  };

  const handleSubmitColor = () => {
    if (color) {
      setColorError("");
    }
    setColorValue(color);
    setIsColor(false);
  };
  const handleSubmitSelect = (value) => {
    setSelectValue(value);
    setSelectError("");
  };
  // const [content, setContent] = useState("");
  // const [conversation, setConversation] = useState([]); // Lưu trữ cuộc trò chuyện
  // const [summary, setSummary] = useState("");
  // // Give me a random Japanese word. Just write the word down, no phonetic transcription required
  // const summarize = async () => {
  //   try {

  //     const headers = {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${apiKey}`,
  //     };

  //     const data = {
  //       model: "gpt-3.5-turbo",
  //       messages: [
  //         ...conversation, // Thêm cuộc trò chuyện vào messages
  //         { role: "user", content }, // Truyền nội dung từ người dùng
  //       ],
  //     };

  //     const response = await axios.post(apiUrl, data, { headers });
  //     console.log("summarize ~ response:", response);
  //     const summary1 = response?.data.choices[0].message.content;

  //     // Lưu trữ cuộc trò chuyện mới
  //     setConversation([
  //       ...conversation,
  //       { role: "system", content: summary1 }, // Lưu trữ câu trả lời của chatbot
  //       { role: "user", content }, // Lưu trữ câu hỏi của người dùng
  //     ]);

  //     setSummary(summary1);
  //   } catch (error) {
  //     console.log("summarize ~ error:", error);
  //   }
  // };
  const handleSubmitForm = (values) => {
    if (colorValue === "") {
      setColorError("Please choose color");
    }
    if (selectValue === "") {
      setSelectError("Please choose type lesson");
    }

    if (imageValue.length === 0) {
      setImageError("Please choose image");
    }

    if (values.answer === "") {
      setError("answer", {
        type: "manual",
        message: "Please enter answer",
      });
    }
    setIsFirstSubmit(true);

    const newValue = {};
    newValue.text_image = values.answer;
    newValue.image = imageValue?.[0]?.url;
    newValue.color = colorValue;
    newValue.type = selectValue;
    if (isSubmit) {
      console.log("handleSubmitForm ~ newValue:", newValue);
    }
  };

  useEffect(() => {
    if (answerWatch === "") {
      setError("answer", {
        type: "manual",
        message: "Please enter answer",
      });
    }
  }, [answerWatch, setError]);
  useEffect(() => {
    if (
      colorError === "" &&
      selectError === "" &&
      imageError === "" &&
      errors?.answer === undefined &&
      isFirstSubmit === true
    ) {
      setIsSubmit(true);
    } else {
      setIsSubmit(false);
    }
  }, [colorError, errors?.answer, imageError, isFirstSubmit, selectError]);
  return (
    <form
      className="px-[20px] mt-[20px] gap-[20px] relative"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <div className="flex gap-[20px] flex-row">
        {/* type */}
        <Field>
          <div className="mb-[10px]">
            <Label htmlFor="Type">Type Lesson</Label>
          </div>
          <FormSelect
            setSelectValue={setSelectValue}
            onChange={handleSubmitSelect}
          />
          <p className="font-semibold text-xs text-red-700 h-[20px] py-1">
            {selectError !== "" && selectError}
          </p>
        </Field>

        {/* answer */}
        <Field>
          <div className="mb-[10px]">
            <Label htmlFor="answer">Answer</Label>
          </div>
          <Input
            type="text"
            name="answer"
            control={control}
            id="answer"
            placeholder="Please enter the answer"
          />
          <p className="font-semibold text-xs text-red-700 h-[20px] py-1">
            {errors.answer && errors.answer.message}
          </p>
        </Field>

        {/* color */}
        <Field>
          <div className="mb-[10px]">
            <Label htmlFor="Type">Color</Label>
          </div>
          {!isColor && (
            <>
              {colorValue ? (
                <div className="flex items-center gap-1">
                  <input
                    className={`w-[40px] h-[40px]  rounded-full  text-center`}
                    style={{
                      // color: "black",
                      backgroundColor: colorValue || "#ffffff",
                    }}
                    disabled={true}
                  ></input>
                  <MdEdit
                    className="cursor-pointer"
                    color="black"
                    size={20}
                    onClick={handleOnColor}
                  />
                </div>
              ) : (
                <>
                  <ButtonCustom
                    text="Chose color"
                    className="h-[40px] text-black p-[5px] w-[150px]"
                    onClick={handleOnColor}
                  ></ButtonCustom>
                  <p className="font-semibold text-xs text-red-700 h-[20px] py-1">
                    {colorError !== "" && colorError}
                  </p>
                </>
              )}
            </>
          )}
          {isColor && (
            <div className="absolute top-[35px]">
              <div className="relative bg-white p-[15px] rounded-lg flex justify-center items-center flex-col test">
                <FaTimes
                  onClick={handleOffColor}
                  className="absolute top-0 right-0 z-50"
                  color="black"
                />
                <ChromePicker color={color} onChange={handleChange} />
                <ButtonCustom
                  text="Submit"
                  className="h-[40px] text-white p-[5px] w-[150px] mt-[20px] bg-black"
                  onClick={handleSubmitColor}
                ></ButtonCustom>
              </div>
            </div>
          )}
        </Field>
      </div>
      <Field>
        <div className="mb-[10px]">
          <Label htmlFor="Image">Image</Label>
        </div>
        <UploadImage
          setImageValue={setImageValue}
          setImageError={setImageError}
        />
        <p className="font-semibold text-xs text-red-700 h-[20px] py-1">
          {imageError !== "" && imageError}
        </p>
      </Field>
      {/* 
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Nhập câu hỏi của bạn vào đây..."
        rows={6}
        cols={60}
        className="text-black"
      />
      <br />
      <button onClick={summarize}>Gửi câu hỏi</button>
      <br />
      <textarea
        value={summary}
        placeholder="Kết quả sẽ xuất hiện ở đây..."
        rows={6}
        cols={60}
        className="text-black"
        readOnly
      /> */}
      <ButtonCustom
        text="Submit"
        type="submit"
        typeCustom="submit"
        className="h-[40px] w-[100px] mt-[50px]"
        onClick={handleSubmitForm}
      ></ButtonCustom>
    </form>
  );
};

export default FormSubmit;
