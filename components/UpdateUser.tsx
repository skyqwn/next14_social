"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import Image from "next/image";
import { User } from "@prisma/client";
import { MdAddPhotoAlternate } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

import { Button } from "./ui/button";
import { getUploadUrl, updateProfile } from "@/lib/actions";

interface UpdateUserProps {
  user: User;
}

const UpdateUser = ({ user }: UpdateUserProps) => {
  const [open, setOpen] = useState(false);
  const [uploadUrl, setUploadUrl] = useState("");
  const [imageId, setImageId] = useState("");
  const [preview, setPreview] = useState("");

  const onChangeCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setImageId(id);
    }
  };

  const interceptAction = async (_: any, formData: FormData) => {
    const file = formData.get("cover");
    if (!file) {
      return;
    }
    const cloudflareForm = new FormData();
    cloudflareForm.append("file", file);

    console.log(uploadUrl);

    const response = await fetch(uploadUrl, {
      method: "POST",
      body: cloudflareForm,
    });

    if (response.status !== 200) {
      return;
    }
    const coverUrl = `https://imagedelivery.net/aftWKlzuslfUHtBxHBEzVw/${imageId}`;

    formData.set("cover", coverUrl);
    setOpen(false);
    return updateProfile(_, formData);
  };

  const [state, action] = useFormState(interceptAction, null);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <span
        className="text-blue-500 text-xs cursor-pointer"
        onClick={() => setOpen(true)}
      >
        Update
      </span>
      {open && (
        <div className="absolute w-screen h-screen top-0 left-0 bg-black bg-opacity-65 flex items-center justify-center z-50">
          <form
            action={action}
            className="p-12 bg-white rounded-lg shadow-md flex flex-col gap-2 w-full md:w-1/2 xl:w-1/3 relative"
          >
            <h2>프로파일 업데이트</h2>
            <div className="mt-4 text-xs text-gray-500">
              유저네임 또는 아바타변경은 오른쪽 상단 아이콘을 클릭해주세요.
            </div>
            <div className="flex flex-col gap-4 my-4">
              <label htmlFor="">커버 사진</label>
              <div className="flex items-center gap-2 cursor-pointer">
                <Image
                  src={`${user.cover}/avatar` ?? "/noCover.png"}
                  alt=""
                  width={40}
                  height={32}
                  className="size-20 rounded-md object-cover"
                />
                <div className="flex items-center gap-4 mt-4 ">
                  <div className="flex items-center gap-2 ">
                    <label htmlFor="cover" className="flex">
                      <MdAddPhotoAlternate
                        size={22}
                        className="text-blue-500 cursor-pointer"
                      />
                      <span className="text-gray-400">Cover</span>
                    </label>
                    <input
                      onChange={onChangeCover}
                      type="file"
                      id="cover"
                      name="cover"
                      className="hidden"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-between gap-2 xl:gap-4">
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  자기소개
                </label>
                <input
                  type="text"
                  placeholder={user.description || "세상은 아름답습니다."}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  name="description"
                />
              </div>
              {/* Input */}
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  지역
                </label>
                <input
                  type="text"
                  placeholder={user.city || "서울"}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  name="city"
                />
              </div>
              {/* Input */}
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  학교
                </label>
                <input
                  type="text"
                  placeholder={user.school || "서울대학교"}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  name="school"
                />
              </div>
              {/* Input */}
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  직장
                </label>
                <input
                  type="text"
                  placeholder={user.work || "Apple Inc."}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  name="work"
                />
              </div>
              {/* Input */}
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  홈페이지
                </label>
                <input
                  type="text"
                  placeholder={user.website || "www.apple.com"}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  name="website"
                />
              </div>
            </div>
            <Button label="업데이트" className="mt-3" />
            <IoMdClose
              size={26}
              className="absolute top-3 right-3 text-lg cursor-pointer text-red-500  hover:text-red-300 transition-colors"
              onClick={handleClose}
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
