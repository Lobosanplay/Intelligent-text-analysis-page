import { useQuery } from "@tanstack/react-query";
import { documentsService } from "./documents.service";

export function useRecentDocuments(userId: string, limit = 5) {
  return useQuery({
    queryKey: ["recent-documents", limit],
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
