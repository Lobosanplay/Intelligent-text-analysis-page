import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { documentsService } from "./documents.service";
import type { RecentDocument } from "../../models/documents/documents.model";

export function useRecentDocuments(userId: string, limit = 5) {
  return useQuery({
    queryKey: ["recent-documents"],
    queryFn: async () => {
      const data = await documentsService.getRecentDocuments(userId, limit);

      return data.map((doc) => ({
        id: doc.id,
        name: doc.original_filename,
        created_at: doc.created_at,
        type: doc.type,
      }));
    },
  });
}

export function useUploadStats(userId: string, days = 7) {
  return useQuery({
    queryKey: ["upload-stats", days],
    queryFn: async () => {
      const data = await documentsService.getDocumentsLastDays(userId, days);

      return data.map((item) => ({
        date: item.day,
        count: Math.round(Number(item.total)),
      }));
    },
  });
}

export function useDeleteFile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => documentsService.deleteDocumentFull(id),
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({
        queryKey: ["recent-documents"],
      });

      const previousFiles = queryClient.getQueryData<RecentDocument[]>([
        "recent-documents",
      ]);

      queryClient.setQueriesData(
        { queryKey: ["recent-documents"] },
        (old: RecentDocument[] = []) => old.filter((doc) => doc.id !== id),
      );

      return { previousFiles };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousFiles) {
        queryClient.setQueryData(["recent-documents"], context.previousFiles);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["recent-documents"],
      });
    },
  });
}
