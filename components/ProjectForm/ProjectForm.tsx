"use client";

import { FormState, ProjectInterface, SessionInterface } from "@/common.types";
import { useState, useEffect } from "react";
import Button from "../Button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ProjectFormCreate from "./ProjectFormCreate";
import ProjectFormEdit from "./ProjectFormEdit";
import {
  createNewProject,
  getProjectDetails,
  updateProject,
} from "@/firebase/actions";
import { v4 as uuidv4 } from "uuid";
import { FieldValue, serverTimestamp } from "firebase/firestore";

type Props = {
  type: string;
  session: SessionInterface;
  projectId?: string;
  title?: string;
  description?: string;
  images?: string[];
  liveSiteUrl?: string;
  githubUrl?: string;
  category?: string;
  timestamp?: string | FieldValue;
};

export default function ProjectForm({
  session,
  type,
  title,
  description,
  images,
  liveSiteUrl,
  githubUrl,
  category,
  projectId,
  timestamp,
}: Props) {
  const [submitting, setSubmitting] = useState<boolean>(false);

  // FORM
  const [form, setForm] = useState<FormState>({
    title: title || "",
    description: description || "",
    images: images || [],
    liveSiteUrl: liveSiteUrl || "",
    githubUrl: githubUrl || "",
    category: category || "",
  });

  const router = useRouter();

  // Handle-Submit
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (type === "create") {
        const id = uuidv4();
        const updatedForm = {
          ...form,
          id: id,
          userId: session?.user?.id,
          timestamp: serverTimestamp(),
        };
        await createNewProject(updatedForm);
        setSubmitting(false);
        router.prefetch("/");
        router.push("/");
      } else {
        if (projectId && timestamp) {
          await updateProject(form, projectId, session.user.id, timestamp);
        }
        router.prefetch("/");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStateChange = (fieldName: string, value: string[] | string) => {
    setForm((prevState) => ({ ...prevState, [fieldName]: value }));
  };

  return (
    <div className=" w-full flex flex-col gap-4 px-5 pb-10">
      <div className=" w-full py-4 flex items-center justify-between">
        <Button
          title="Cancel"
          handleClick={() => {
            if (type === "create") router.back();
            else router.push("/");
          }}
          className="text-c-dark border-2 border-gray-200/70 hover:border-gray-200 font-semibold"
        />
        <div className="flex transition-all duration-150 items-center gap-4">
          <Button
            title="Save as draft"
            className="text-c-dark bg-gray-100 hover:bg-gray-200 font-semibold"
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
            className="text-white bg-rose-500/90 hover:bg-rose-400 font-semibold"
            notAllowed={submitting ? submitting : !form.title}
            handleClick={handleFormSubmit}
          />
        </div>
      </div>
      {/* rest  */}
      <div className="flex-col w-full flexCenter gap-8 md:px-10 lg:px-[100px] xl:px-[150px]">
        <h1 className="modal-head-text">
          {type === "create"
            ? `What have you been working on ${session?.user?.name} ?`
            : `What you want to edit ${session?.user?.name} ?`}
        </h1>
        <form
          onSubmit={handleFormSubmit}
          className="flexStart w-full flex flex-col gap-4"
        >
          <div className="w-full">
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
            <div className=" w-full flexCenter mt-8">
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
                className="text-white bg-rose-500/90 hover:bg-rose-400 font-semibold"
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
