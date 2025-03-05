import { Project } from "@/types/Project";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

/**
 * Fetches the list of projects from the API.
 *
 * @returns {Promise<Project[]>} - A promise resolving to an array of projects.
 * @throws {Error} - Throws an error if the request fails.
 */
async function fetchProjects(): Promise<Project[]> {
  try {
    const { data } = await axios.get("/api/projects");
    return data.projects;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    throw new Error("Error fetching projects. Please try again.");
  }
}

/**
 * Sends a new project to the API for creation.
 *
 * @param {Omit<Project, "_id">} newProject - The project object without the `_id` field.
 * @returns {Promise<Project>} - A promise resolving to the created project.
 * @throws {Error} - Throws an error if the request fails.
 */
async function postProject(newProject: Omit<Project, "_id">): Promise<Project> {
  try {
    const response = await axios.post("/api/projects", newProject);
    return response.data.project;
  } catch (error) {
    console.error("Failed to create project:", error);
    throw new Error("Error creating project. Please try again.");
  }
}

/**
 * A custom React hook that provides project management functions.
 * It fetches projects from the API and allows adding new projects using React Query.
 *
 * @returns {{
 *   projects: Project[] | undefined;
 *   isLoading: boolean;
 *   isError: boolean;
 *   addProject: (newProject: Omit<Project, "_id">) => Promise<Project>;
 *   isSubmitting: boolean;
 * }} - The project state and functions for managing projects.
 */
export function useProjects() {
  const queryClient = useQueryClient();

  // Fetch project list
  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    staleTime: 1000 * 60 * 5, // Cache projects for 5 minutes
    retry: 2, // Retry failed requests twice before showing an error
  });

  // Mutation for adding a new project
  const addProjectMutation = useMutation({
    mutationFn: postProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error) => {
      console.error("Project creation error:", error);
    },
  });

  /**
   * Adds a new project and returns a promise that resolves on success.
   * Provides better error handling for async/await usage.
   *
   * @param {Omit<Project, "_id">} newProject - The project to add.
   * @returns {Promise<Project>} - A promise resolving to the created project.
   */
  function addProjectAsync(newProject: Omit<Project, "_id">): Promise<Project> {
    return new Promise((resolve, reject) => {
      addProjectMutation.mutate(newProject, {
        onSuccess: (created) => resolve(created),
        onError: (err) => reject(err),
      });
    });
  }

  return {
    projects,
    isLoading,
    isError,
    addProject: addProjectAsync,
    isSubmitting: addProjectMutation.isPending, // Indicates if a new project is being added
  };
}
