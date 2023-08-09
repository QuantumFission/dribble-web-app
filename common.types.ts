import { FieldValue } from "firebase/firestore";

export type UserDetails = {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string | null;
  image: string;
  provider: string;
  description: string | null;
  githubUrl: string | null;
  linkedInUrl: string | null;
};

export type SignUpFormState = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export type AuthFormState = {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
};

export type SessionInterface = {
  user: {
    name: string;
    email: string;
    image: string;
    id: string;
  };
  accessToken: string;
};

export type FormState = {
  title: string;
  description: string;
  images: string[];
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
};

export interface ProjectInterface {
  id: string;
  userId: string;
  title: string;
  description: string;
  images: string[];
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
  timestamp: string | FieldValue;
}

export interface ProjectForm {
  title: string;
  description: string;
  images: string[];
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
}

export type projectMetadata = {
  projectTitle: string;
  createdBy: string;
};
