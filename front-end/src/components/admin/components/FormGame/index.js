import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Field from "../Field";
import Label from "../label";
import Input from "../input";
import UploadImage from "../uploadImage";

const schema = yup
  .object({
    booktitle: yup.string().required("Please enter the book title"),
  })
  .required();
const FormGame = () => {
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const handleSubmitForm = () => {};
  return (
    <div>
      <form className="px-[20px]" onSubmit={handleSubmit(handleSubmitForm)}>
        <Field>
          <div className="mb-[10px]">
            <Label htmlFor="author">Author</Label>
          </div>
          <Input
            type="text"
            name="author"
            control={control}
            id="author"
            placeholder="Please enter the author's name"
            className=""
          />
        </Field>
        <UploadImage id="mainImage" />
      </form>
    </div>
  );
};

export default FormGame;
