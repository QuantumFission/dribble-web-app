import { ProjectForm } from "@/common.types";
import {
  getUserQuery,
  createProjectMutation,
  createUserMutation,
  projectsQuery,
  deleteProjectMutation,
  getProjectByIdQuery,
  getProjectsOfUserQuery,
  updateProjectMutation,
} from "@/graphql";
import { GraphQLClient } from "graphql-request";

const isProduction = process.env.NODE_ENV === "production";


const apiUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ""
  : "http://127.0.0.1:4000/graphql";

const apiKey = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ""
  : "1234";

export const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:3000";

const client = new GraphQLClient(apiUrl);

// makeGraphQLClient
const makeGraphQLRequest = async (query: string, variables = {}) => {
  try {
    return await client.request(query, variables);
  } catch (error) {
    throw error;
  }
};

// getUser
export const getUser = (email: string) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getUserQuery, { email });
};

// createUser
export const createUser = (name: string, email: string, avatarUrl: string) => {
  client.setHeader("x-api-key", apiKey);

  const variables = {
    input: {
      name,
      email,
      avatarUrl,
    },
  };

  return makeGraphQLRequest(createUserMutation, variables);
};

// fetchToken
export const fetchToken = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/auth/token`);
    return response.json();
  } catch (error) {
    throw error;
  }
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

// createNewProject
export const createNewProject = async (
  form: ProjectForm,
  creatorId: string,
  token: string
) => {
  const imageObj = await uploadImage(form.images);

  console.log(imageObj);
  
  // converting imageArray to object
  const resultsObject = imageObj.reduce(
    (obj: Record<string, string>, url: string, index: number) => {
      obj[`image${index + 1}`] = url;
      return obj;
    },
    {}
  );

  if (resultsObject) {
    client.setHeader("Authorization", `Bearer ${token}`);

    const variables = {
      input: {
        ...form,
        images: resultsObject,
        createdBy: {
          link: creatorId,
        },
      },
    };

    return makeGraphQLRequest(createProjectMutation, variables);
  }
};

// updateProject
export const updateProject = async (
  form: ProjectForm,
  projectId: string,
  token: string
) => {

  const imageObj = await uploadImage(form?.images);
  
  // converting imageArray to object
  const resultsObject = imageObj.reduce(
    (obj: Record<string, string>, url: string, index: number) => {
      obj[`image${index + 1}`] = url;
      return obj;
    },
    {}
  );


  if (resultsObject) {
    const updatedForm = { ...form, images: resultsObject };
    client.setHeader("Authorization", `Bearer ${token}`);
    
    const variables = {
      id: projectId,
      input: updatedForm
    };

    return makeGraphQLRequest(updateProjectMutation, variables);
  }
};

// fetchAllProjects
export const fetchAllProjects = async (
  category?: string,
  endcursor?: string
) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(projectsQuery, { category, endcursor });
};

// getProjectDetails
export const getProjectDetails = (id: string) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getProjectByIdQuery, { id });
};

// getUserProjects
export const getUserProjects = (id: string, last?: number) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getProjectsOfUserQuery, { id, last });
};

// deleteProject
export const deleteProject = (id: string, token: string) => {
  client.setHeader("Authorization", `Bearer ${token}`);
  return makeGraphQLRequest(deleteProjectMutation, { id });
};
