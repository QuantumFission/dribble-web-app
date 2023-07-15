"use client";

import { FormState, ProjectInterface, SessionInterface } from "@/common.types";
import { ChangeEvent, useEffect, useState } from "react";
import Button from "../Button";
import { createNewProject, fetchToken, updateProject } from "@/lib/actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ProjectFormCreate from "./ProjectFormCreate";
import ProjectFormEdit from "./ProjectFormEdit";

type Props = {
  type: string;
  session: SessionInterface;
  project?: ProjectInterface;
};

export default function ProjectForm({ session, type, project }: Props) {

  const [submitting, setSubmitting] = useState<boolean>(false);

  // FORM
  const [form, setForm] = useState<FormState>({
    title: project?.title || "",
    description: project?.description || "",
    images: project?.images || [],
    liveSiteUrl: project?.liveSiteUrl || "",
    githubUrl: project?.githubUrl || "",
    category: project?.category || "",
  });
  
  const router = useRouter();

  // Handle-Submit
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const { token } = await fetchToken();

    try {
      if (type === "create") {
        await createNewProject(form, session?.user?.id, token);
        toast.success("New Project Created !");
        router.push("/");
      } else {
        await updateProject(form, project?.id as string, token)
        toast.success("Project updated successfully !");
        router.push("/")
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };


  const handleStateChange = (fieldName: string, value: string[] | string) => {
    setForm((prevState) => ({ ...prevState, [fieldName]: value }));
  };

  return (
    <div className=' w-full flex flex-col gap-4 px-5 pb-10'>
      <div className=' w-full py-4 flex items-center justify-between'>
        <Button
          title='Cancel'
          handleClick={() => {
            if (type === "create") router.back();
            else router.push("/");
          }}
          className='text-c-dark border-2 border-gray-200/70 hover:border-gray-200 font-semibold'
        />
        <div className='flex transition-all duration-150 items-center gap-4'>
          <Button
            title='Save as draft'
            className='text-c-dark bg-gray-100 hover:bg-gray-200 font-semibold'
            notAllowed={!form.title}
          />
          <Button
            title={
              submitting
                ? type === "create"
                  ? "Publishing..."
                  : "Updating"
                : type === "create"
                ? "Publish now"
                : "Update now"
            }
            className='text-white bg-rose-500/90 hover:bg-rose-400 font-semibold'
            notAllowed={submitting ? submitting : !form.title}
            handleClick={handleFormSubmit}
          />
        </div>
      </div>
      {/* rest  */}
      <div className='flex-col w-full flexCenter gap-8 md:px-10 lg:px-[100px] xl:px-[150px]'>
        <h1 className='modal-head-text'>
          {type === "create"
            ? `What have you been working on ${session?.user?.name} ?`
            : `What you want to edit ${session?.user?.name} ?`}
        </h1>
        <form
          onSubmit={handleFormSubmit}
          className='flexStart w-full flex flex-col gap-4'
        >
          <div className='w-full'>
            {type === "create" ? (
              <ProjectFormCreate
                form={form}
                type={type}
                handleStateChange={handleStateChange}
              />
            ) : (
              <ProjectFormEdit
                type={type}
                form={form}
                handleStateChange={handleStateChange}
              />
            )}
          </div>
          {form.title && (
            <div className=' w-full flexCenter mt-8'>
              <Button
                title={
                  submitting
                    ? type === "create"
                      ? "Publishing..."
                      : "Updating"
                    : type === "create"
                    ? "Publish now"
                    : "Update now"
                }
                className='text-white bg-rose-500/90 hover:bg-rose-400 font-semibold'
                notAllowed={submitting ? submitting : !form.title}
                handleClick={handleFormSubmit}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
