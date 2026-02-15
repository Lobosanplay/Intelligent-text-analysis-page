import supabase from "../../../config/supabase/supabase";
import type { SB_AudioTranscriptionModel } from "../../models/audio_transcriptions/audio_transcriptions.model";

class AudioTranscriptionsService {
  async create(data: Partial<SB_AudioTranscriptionModel>) {
    const { data: result, error } = await supabase
      .from("audio_transcriptions")
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return result as SB_AudioTranscriptionModel;
  }

  async getByDocument(documentId: string) {
    const { data, error } = await supabase
      .from("audio_transcriptions")
      .select("*")
      .eq("document_id", documentId)
      .maybeSingle();

    if (error) throw error;
    return data as SB_AudioTranscriptionModel | null;
  }

  async update(id: number, payload: Partial<SB_AudioTranscriptionModel>) {
    const { data, error } = await supabase
      .from("audio_transcriptions")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as SB_AudioTranscriptionModel;
  }
}

export const audioTranscriptionsService = new AudioTranscriptionsService();
