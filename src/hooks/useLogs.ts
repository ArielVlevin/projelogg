import { Log } from "@/types/Log";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Fetch logs from the API
const fetchLogs = async (): Promise<Log[]> => {
  const { data } = await axios.get("/api/logs");
  return data.logs;
};

// Add a new log to the API
const postLog = async (newLog: Omit<Log, "_id">) => {
  try {
    const { data } = await axios.post("/api/logs", newLog);
    return data;
  } catch (error) {
    console.error("error: ", error);
    throw new Error("error in postLog");
  }
};

// Delete a log from the API
const deleteLogById = async (id: string) => {
  await axios.delete(`/api/logs/${id}`);
};

// Hook for managing logs
export function useLogs() {
  const queryClient = useQueryClient();

  // Query to get logs
  const {
    data: logs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["logs"],
    queryFn: fetchLogs,
  });

  // Mutation to add a new log
  const addLogMutation = useMutation({
    mutationFn: postLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logs"] });
    },
  });

  // Mutation to delete a log
  const deleteLogMutation = useMutation({
    mutationFn: deleteLogById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logs"] });
    },
  });

  return {
    logs,
    isLoading,
    isError,
    addLog: addLogMutation.mutate,
    isAdding: addLogMutation.isPending,
    deleteLog: deleteLogMutation.mutate,
    isDeleting: deleteLogMutation.isPending,
  };
}
