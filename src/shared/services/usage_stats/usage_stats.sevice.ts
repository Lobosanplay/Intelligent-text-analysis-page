import supabase from "../../../config/supabase/supabase";

class UsageStatsService {
  async getUsageStats(userId: string) {
    const { data, error } = await supabase
      .from("usage_stats")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) throw error;

    return data;
  }
}

export const usageStatsService = new UsageStatsService();
