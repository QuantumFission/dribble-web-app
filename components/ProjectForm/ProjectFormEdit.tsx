import Image from "next/image";
import React, { ChangeEvent } from "react";
import { RxCross2 } from "react-icons/rx";
import FormField from "../FormField";
import { FormState } from "@/common.types";
import { AiFillGithub } from "react-icons/ai";
import CustomMenu from "../CustomMenu";
import { categoryFilters } from "@/constants";
import Button from "../Button";

type Props = {
  type: string;
  form: FormState;
  handleStateChange: (title: string, value: string[] | string) => void;
};

export default function ProjectFormEdit({
  type,
  form,
  handleStateChange
}: Props) {

  
  const newImages = Object.values(form?.images || []);

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
        const updatedImages = [...newImages, ...results];
        handleStateChange("images", updatedImages);
      })
      .catch((error) => {
        console.log("Error reading image files:", error);
      });
  };

  // Handle-Delete
  const handleDeleteImage = (index: number) => {
    const updatedImages = [...newImages];
    updatedImages.splice(index, 1);
    handleStateChange("images", updatedImages);
  };

  return (
    <>
      <div className='w-full flexStart flex-col gap-4'>
        <div className='w-full flexCenter flex-col gap-4'>
          <div
            className={
              newImages.length === 1
                ? "project_form-single-img"
                : "project_form-multi-img"
            }
          >
            {form &&
              newImages.map((image, index) => (
                <div key={index} className=' relative'>
                  <div
                    className={`flex items-center justify-center ${
                      newImages.length === 1 ? "h-full" : ""
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
                      newImages.length === 1
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
                required={type === "edit"}
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
    </>
  );
}
