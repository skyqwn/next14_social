"use client";

import Image from "next/image";
import { useState } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";
import { uploadPost } from "@/lib/actions";

const AddPost = () => {
  const [preview, setPreview] = useState("");
  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;
    if (!files) return;
    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);
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
        <form action={uploadPost} className="flex gap-4">
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
      </div>
    </div>
  );
};

export default AddPost;
