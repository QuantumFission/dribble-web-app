import {
  DocumentData,
  DocumentSnapshot,
  FieldValue,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import {
  FormState,
  ProjectInterface,
  UserDetails,
  projectMetadata,
} from "@/common.types";
import { toast } from "react-hot-toast";

const isProduction = process.env.NODE_ENV === "production";

export const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:3000";

// getUserDetails
export const getUserDetails = async (
  id: string
): Promise<UserDetails | null> => {
  const userCollectionRef = doc(db, "userCollection", id);
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
  const userRef = doc(db, "userCollection", userData.id);
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

// updateProject
export const updateProject = async (
  form: FormState,
  projectId: string,
  userId: string,
  timestamp: string | FieldValue
) => {
  const projectRef = doc(db, "projects", projectId);
  const images = await uploadImage(form.images);
  const updated_project = {
    ...form,
    id: projectId,
    images: images,
    userId: userId,
    timestamp: timestamp,
  };
  try {
    await updateDoc(projectRef, updated_project);
    toast.success("Project updated successfully.");
  } catch (error) {
    console.error("Error updating project:", error);
    toast.error("An error occurred while updating the project.");
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

// getLastProject
export const getLastProject = async (
  userId: string
): Promise<DocumentData | null> => {
  try {
    const projectRef = collection(db, "projects");
    const q = query(
      projectRef,
      where("userId", "==", userId),
      orderBy("timestamp", "desc")
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return null;
    } else {
      const data = querySnapshot.docs.map((doc) => doc.data());
      return data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// getProjectMetaData
export const getProjectMetadata = async (
  id: string
): Promise<projectMetadata | null> => {
  try {
    const projectRef = doc(db, "projects", id);
    const snapshot = await getDoc(projectRef);
    const project = snapshot.data() as ProjectInterface;
    const user = await getUserDetails(project?.userId);
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
