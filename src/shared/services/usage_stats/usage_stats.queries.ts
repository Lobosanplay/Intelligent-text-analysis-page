import { useQuery } from "@tanstack/react-query";
import { usageStatsService } from "./usage_stats.sevice";

export function useUsageStats(userId: string) {
  return useQuery({
    queryKey: ["usage-stats"],
    queryFn: async () => usageStatsService.getUsageStats(userId),
  });
}
