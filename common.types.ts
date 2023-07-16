
export type UserDetails = {
  id: string;
  name: string;
  email: string;
  description: string | null;
  image: string;
  githubUrl: string | null;
  linkedInUrl: string | null;
}

export type SessionInterface = {
  user: {
    id: string
    name: string
    email: string
    image: string
  }
}

export type FormState = {
  title: string;
  description: string;
  images: string[];
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
};

export interface ProjectInterface {
  title: string;
  description: string;
  images: string[];
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
  id: string;
  createdBy: {
    name: string;
    email: string;
    avatarUrl: string;
    id: string;
  };
}

export interface ProjectForm {
  title: string;
  description: string;
  images: string[];
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
}
