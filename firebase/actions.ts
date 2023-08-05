import {
  DocumentSnapshot,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { ProjectInterface, UserDetails, projectMetadata } from "@/common.types";
import { toast } from "react-hot-toast";
import { motion as m } from "framer-motion";

const isProduction = process.env.NODE_ENV === "production";

export const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:3000";

// getUserDetails
export const getUserDetails = async (
  email: string
): Promise<UserDetails | null> => {
  const userCollectionRef = doc(db, "userCollection", email);
  const userSnapshot: DocumentSnapshot = await getDoc(userCollectionRef);
  if (userSnapshot.exists()) {
    const userData = userSnapshot.data() as UserDetails;
    return userData;
  } else {
    return null;
  }
};

// createNewUser
export const createNewUser = async (userData: UserDetails) => {
  const userRef = doc(db, "userCollection", userData.email);
  await setDoc(userRef, userData);
};

// createNewProject
export const createNewProject = async (project: ProjectInterface) => {
  const projectRef = doc(db, "projects", project.id);
  const images = await uploadImage(project.images);
  const updated_project = { ...project, images: images };
  await setDoc(projectRef, updated_project);
  toast.success("Project created successfully .");
};

// uploadImage
export const uploadImage = async (images: string[]) => {
  try {
    const response = await fetch(`${serverUrl}/api/upload`, {
      method: "POST",
      body: JSON.stringify({ paths: images }),
    });

    return response.json();
  } catch (error) {
    throw error;
  }
};

// getAllProjects
export const getAllProjects = async () => {
  try {
    const projectRef = collection(db, "projects");
    const querySnapshot = await getDocs(projectRef);
    const Projects = querySnapshot.docs.map((doc) => doc.data());
    return Projects;
  } catch (error) {
    console.log(error);
  }
};

// getProjectMetaData
export const getProjectMetadata = async (
  id: string
): Promise<projectMetadata | null> => {
  try {
    const projectRef = doc(db, "projects", id);
    const snapshot = await getDoc(projectRef);
    const project = snapshot.data();
    const user = await getUserDetails(project?.email);
    const metadata = {
      projectTitle: project?.title,
      createdBy: user?.name,
    } as projectMetadata;
    return metadata;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// getProjectDetails
export const getProjectDetails = async (
  id: string
): Promise<ProjectInterface | null> => {
  try {
    const projectRef = doc(db, "projects", id);
    const snapshot = await getDoc(projectRef);
    const project = snapshot.data() as ProjectInterface;
    return project;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// deleteProject
export const deleteProject = async (id: string): Promise<any> => {
  try {
    const projectRef = doc(db, "projects", id);
    await deleteDoc(projectRef);
    toast.success("Successfully deleted");
  } catch (error) {
    console.error(error);
  }
};
