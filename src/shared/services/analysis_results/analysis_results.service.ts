import supabase from "../../../config/supabase/supabase";
import type { SB_AnalysisResultModel } from "../../models/analysis_results/analysis_results.model";

class AnalysisResultsService {
  async create(data: Partial<SB_AnalysisResultModel>) {
    const { data: result, error } = await supabase
      .from("analysis_results")
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return result as SB_AnalysisResultModel;
  }

  async getByDocument(documentId: string) {
    const { data, error } = await supabase
      .from("analysis_results")
      .select("*")
      .eq("document_id", documentId)
      .maybeSingle();

    if (error) throw error;
    return data as SB_AnalysisResultModel | null;
  }

  async update(id: number, payload: Partial<SB_AnalysisResultModel>) {
    const { data, error } = await supabase
      .from("analysis_results")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as SB_AnalysisResultModel;
  }
}

export const analysisResultsService = new AnalysisResultsService();
