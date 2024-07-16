"use client";

import Image from "next/image";
import { useState } from "react";
import { getUploadUrl, uploadPost } from "@/lib/actions";
import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { IoMdClose } from "react-icons/io";
import { MdAddPhotoAlternate } from "react-icons/md";
import { postSchema, PostType } from "@/types/schema";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const AddPost = () => {
  const [preview, setPreview] = useState("");
  const [uploadUrl, setUploadUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PostType>({
    resolver: zodResolver(postSchema),
  });

  const clearImage = () => {
    setPreview("");
  };

  const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;
    if (!files) return;
    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);
    setFile(file);
    const { success, result } = await getUploadUrl();
    if (success) {
      const { id, uploadURL } = result;
      setUploadUrl(uploadURL);
      setValue(
        "photo",
        `https://imagedelivery.net/aftWKlzuslfUHtBxHBEzVw/${id}`
      );
    }
  };

  const onSubmit = handleSubmit(async (data: PostType) => {
    if (!file) {
      return;
    }
    const cloudfloreForm = new FormData();
    cloudfloreForm.append("file", file);
    const response = await fetch(uploadUrl, {
      method: "POST",
      body: cloudfloreForm,
    });
    if (response.status !== 200) {
      return;
    }
    const formData = new FormData();
    formData.append("desc", data.desc);
    formData.append("photo", data.photo);
    return uploadPost(formData);
  });

  const onVliad = async () => {
    await onSubmit();
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between">
      {/* AVATAR */}
      <Image
        src="https://images.pexels.com/photos/19968907/pexels-photo-19968907.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
        width={48}
        height={48}
        alt=""
        className="size-12 object-cover rounded-full"
      />
      {/* POST */}
      <div className="flex-1">
        {/* TEXT INPUT */}
        <form action={onVliad} className="flex gap-4 items-center">
          <div className="flex flex-col flex-1">
            <textarea
              {...register("desc")}
              placeholder="게시물을 입력해주세요!"
              className="bg-slate-100 rounded-lg flex-1 p-2"
            />
            {/* POST OPTIONS */}
            <div className="flex items-center gap-4 mt-4 ">
              <div className="flex items-center gap-2 ">
                <label htmlFor="photo" className="flex">
                  <MdAddPhotoAlternate
                    size={22}
                    className="text-blue-500 cursor-pointer"
                  />
                  <span className="text-gray-400">Photo</span>
                </label>
                <input
                  onChange={onImageChange}
                  type="file"
                  id="photo"
                  name="photo"
                  className="hidden"
                />
              </div>
            </div>
          </div>
          <Button size={"sm"} label={"게시하기"} />
        </form>
        {preview && (
          <div className="relative aspect-square size-40 mt-4">
            <Image src={preview} alt="" fill />
            <IoMdClose
              color="red"
              className="absolute top-0 right-1"
              size={24}
              onClick={clearImage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPost;
