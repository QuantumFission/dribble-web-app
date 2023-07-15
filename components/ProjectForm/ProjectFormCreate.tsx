import Image from "next/image";
import React, { ChangeEvent } from "react";
import { RxCross2 } from "react-icons/rx";
import FormField from "../FormField";
import { AiFillGithub } from "react-icons/ai";
import CustomMenu from "../CustomMenu";
import { categoryFilters } from "@/constants";
import { FormState } from "@/common.types";

type Props = {
  form: FormState;
  type: string;
  handleStateChange: (title: string, value: string[] | string) => void;
};

export default function ProjectFormCreate({
  form,
  type,
  handleStateChange,
}: Props) {
  // HandleChange
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;

    if (!files) {
      return;
    }

    const imageFiles = Array.from(files).filter((file) =>
      file.type.includes("image")
    );

    if (imageFiles.length === 0) {
      return alert("Please upload image files");
    }

    const readerPromises = imageFiles.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });
    });

    Promise.all(readerPromises)
      .then((results) => {
        const updatedImages = [...form.images, ...results];
        handleStateChange("images", updatedImages);
      })
      .catch((error) => {
        console.log("Error reading image files:", error);
      });
  };

  // Handle-Delete
  const handleDeleteImage = (index: number) => {
    const updatedImages = [...form.images];
    updatedImages.splice(index, 1);
    handleStateChange("images", updatedImages);
  };

  return (
    <>
      {form?.images.length === 0 ? (
        <label
          htmlFor='imageInput'
          className='w-full cursor-pointer flexCenter border-2 border-dashed'
        >
          <div className='w-full flexCenter flex-col py-[180px] px-4'>
            <div className=' w-full flexCenter'>
              <Image
                alt='picture.png'
                src='/picture-placeholder.png'
                width={60}
                height={60}
                className=' object-contain w-auto h-auto'
              />
            </div>
            <p>
              {" "}
              Drag and drop an image, or{" "}
              <span className=' text-rose-400'>Browse</span>
            </p>
            <p>
              Minimum 1600px width recommended. Max 10MB each (20MB for videos)
            </p>
            <input
              id='imageInput'
              type='file'
              multiple
              accept='image/*'
              required={type === "create"}
              className='hidden'
              onChange={handleChangeImage}
            />
          </div>
        </label>
      ) : (
        <div className='w-full flexStart flex-col gap-4'>
          <div className='w-full flexCenter flex-col gap-4'>
            <div
              className={
                form?.images.length === 1
                  ? "project_form-single-img"
                  : "project_form-multi-img"
              }
            >
              {form?.images.map((image, index) => (
                <div key={index} className=' relative'>
                  <div
                    className={`flex items-center justify-center ${
                      form?.images.length === 1 ? "h-full" : ""
                    }`}
                  >
                    <Image
                      alt={`selected-image-${index}`}
                      src={image}
                      width={1920}
                      height={1080}
                      priority
                      className='object-contain max-h-full'
                    />
                  </div>
                  <div
                    onClick={() => handleDeleteImage(index)}
                    className={`project_form-btn-cross ${
                      form?.images.length === 1
                        ? " bottom-[-50px] left-1/2 transform -translate-x-1/2"
                        : "top-2 right-2"
                    }`}
                  >
                    <RxCross2 size={20} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className=' w-full flex flex-col gap-4 mt-10'>
            <span className='flex justify-start items-center'>
              <label htmlFor='editedImg'>
                <p
                  className='p-3 bg-teal-400 text-white rounded-md mt-6 font-bold text-base
                   cursor-pointer hover:bg-teal-500 transition-all duration-200'
                >
                  Add image
                </p>
                <input
                  id='editedImg'
                  type='file'
                  multiple
                  accept='image/*'
                  required={type === "create"}
                  className='hidden'
                  onChange={handleChangeImage}
                />
              </label>
            </span>
            <FormField
              state={form.title}
              placeholder='Give me a name'
              setState={(value) => handleStateChange("title", value)}
              main
            />
            <FormField
              state={form.description}
              placeholder='Write what went into this design or add any details you’d like to mention.'
              isTextArea
              setState={(value) => handleStateChange("description", value)}
            />
            <FormField
              type='url'
              title='Website URL'
              state={form.liveSiteUrl}
              placeholder='https://example.com'
              setState={(value) => handleStateChange("liveSiteUrl", value)}
            />
            <FormField
              type='url'
              title='GitHub URL'
              icon={<AiFillGithub size={20} />}
              state={form.githubUrl}
              placeholder='https://github.com/QuantumFission'
              setState={(value) => handleStateChange("githubUrl", value)}
            />

            <CustomMenu
              title='Category'
              state={form.category}
              filters={categoryFilters}
              setState={(value) => handleStateChange("category", value)}
            />
          </div>
        </div>
      )}
    </>
  );
}
