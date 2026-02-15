export interface SB_AnalysisResultModel {
  id: number;
  created_at: string;
  document_id: string | null;
  summary: string | null;
  sentiment: JSON | null;
  model_version: string | null;
  topics: JSON | null;
}
