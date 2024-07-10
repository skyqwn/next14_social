"use client";

import Image from "next/image";
import { useState } from "react";
import { getUploadUrl, uploadPost } from "@/lib/actions";
import { useFormState } from "react-dom";

import { IoMdClose } from "react-icons/io";
import { MdAddPhotoAlternate } from "react-icons/md";

const AddPost = () => {
  const [preview, setPreview] = useState("");
  const [uploadUrl, setUploadUrl] = useState("");
  const [photoId, setPhotoId] = useState("");

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
    const { success, result } = await getUploadUrl();
    if (success) {
      const { id, uploadURL } = result;
      setUploadUrl(uploadURL);
      setPhotoId(id);
    }
  };

  const interceptAction = async (_: any, formData: FormData) => {
    // upload image to cloudflare
    const file = formData.get("photo");
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
    const photoUrl = `https://imagedelivery.net/aftWKlzuslfUHtBxHBEzVw/${photoId}`;
    formData.set("photo", photoUrl);
    return uploadPost(_, formData);
    // replace photo in formData

    // call upload product.
  };

  const [state, action] = useFormState(interceptAction, null);
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
        <form action={action} className="flex gap-4">
          <textarea
            name="desc"
            placeholder="게시물을 입력해주세요!"
            className="bg-slate-100 rounded-lg flex-1 p-2"
          ></textarea>
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
          <button>send</button>
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
