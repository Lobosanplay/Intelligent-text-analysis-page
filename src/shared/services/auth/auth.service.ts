import supabase from "../../../config/supabase/supabase";
import type { AuthResponse } from "../../types/auth.types";

class AuthService {
  async signUp(email: string, password: string): Promise<AuthResponse> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    return {
      user: data.user,
      session: data.session,
    };
  }

  async signIn(email: string, password: string): Promise<AuthResponse> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return {
      user: data.user,
      session: data.session,
    };
  }

  async signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;
  }

  async getSession() {
    const { data, error } = await supabase.auth.getSession();

    if (error) throw error;

    return data.session;
  }

  async getUser() {
    const { data, error } = await supabase.auth.getUser();

    if (error) throw error;

    return data.user;
  }

  async sendPasswordReset(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) throw error;
  }

  async updatePassword(password: string) {
    const { data, error } = await supabase.auth.updateUser({
      password,
    });

    if (error) throw error;

    return data.user;
  }
}

export const authService = new AuthService();
