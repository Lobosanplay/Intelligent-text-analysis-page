export interface SB_DocumentModel {
  id: string;
  created_at: string;
  user_id: string | null;
  type: string | null;
  original_filename: string | null;
  storage_path: string | null;
  file_hash: string | null;
  status: string;
}
