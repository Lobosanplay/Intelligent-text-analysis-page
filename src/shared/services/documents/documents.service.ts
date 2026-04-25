import supabase from "../../../config/supabase/supabase";
import type {
  SB_DocumentModel,
  DocumentModalModel,
  UploadedDocumentLastDays,
} from "../../models/documents/documents.model";

class DocumentsService {
  async create(data: Partial<SB_DocumentModel>) {
    const { data: result, error } = await supabase
      .from("documents")
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return result as SB_DocumentModel;
  }

  async getById(id: string) {
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data as SB_DocumentModel;
  }

  async getUserDocuments(userId: string) {
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as SB_DocumentModel[];
  }

  async getRecentDocuments(userId: string, limit = 5) {
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;

    return data;
  }

  async getUploadsPerDay(userId: string) {
    const { data, error } = await supabase.rpc("documents_uploaded_per_day", {
      p_user_id: userId,
    });

    if (error) throw error;

    return data;
  }

  async getDocumentsByType(userId: string) {
    const { data, error } = await supabase.rpc("documents_by_type", {
      p_user_id: userId,
    });

    if (error) throw error;

    return data;
  }

  async getDocumentsLastDays(
    userId: string,
    limint: number = 7,
  ): Promise<UploadedDocumentLastDays[]> {
    const { data, error } = await supabase.rpc("documents_last_days", {
      p_user_id: userId,
      p_days: limint,
    });

    if (error) throw error;

    return data;
  }

  async updateStatus(id: string, status: string) {
    const { data, error } = await supabase
      .from("documents")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as SB_DocumentModel;
  }

  async delete(id: string) {
    const { error } = await supabase.from("documents").delete().eq("id", id);

    if (error) throw error;
  }

  async getDocumentFullData(id: string) {
    const { data, error } = await supabase.rpc("get_document_full_data", {
      p_document_id: id,
    });

    if (error) throw error;
    return data as DocumentModalModel;
  }

  async deleteDocumentFull(id: string) {
    const doc = await this.getById(id);

    if (doc.storage_path) {
      const { error: storageError } = await supabase.storage
        .from("documents")
        .remove([doc.storage_path]);

      if (storageError) throw storageError;
    }

    const { error } = await supabase.rpc("delete_document_full", {
      p_document_id: id,
    });

    if (error) throw error;
  }
}

export const documentsService = new DocumentsService();
