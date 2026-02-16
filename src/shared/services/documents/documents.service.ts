import supabase from "../../../config/supabase/supabase";
import type { SB_DocumentModel } from "../../models/documents/documents.model";

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

  async getUserDocuments() {
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as SB_DocumentModel[];
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
}

export const documentsService = new DocumentsService();
