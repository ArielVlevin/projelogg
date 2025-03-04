import { Project } from "@/types/Project";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// GET
async function fetchProjects(): Promise<Project[]> {
  const { data } = await axios.get("/api/projects");

  return data.projects;
}

// POST
async function postProject(newProject: Omit<Project, "_id">): Promise<Project> {
  try {
    const resoponse = await axios.post("/api/projects", newProject);
    return await resoponse.data.project;
  } catch (error) {
    console.error("error: ", error);
    throw new Error("error in post Project");
  }
}

export function useProjects() {
  const queryClient = useQueryClient();

  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const addProjectMutation = useMutation({
    mutationFn: postProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  function addProjectAsync(newProject: Omit<Project, "_id">): Promise<Project> {
    return new Promise((resolve, reject) => {
      addProjectMutation.mutate(newProject, {
        onSuccess: (created) => {
          resolve(created);
        },
        onError: (err) => {
          reject(err);
        },
      });
    });
  }

  return {
    // ערך המוחזר
    projects, // Array<{ name: string }>
    isLoading, // טעינה
    isError, // שגיאה
    addProject: addProjectAsync,
    isAdding: addProjectMutation.isPending,
  };
}
