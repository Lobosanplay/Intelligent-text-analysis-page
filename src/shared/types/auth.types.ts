import type { User, Session } from "@supabase/supabase-js";
import type SB_subscriptionModel from "../models/subscritions/subscritions.model";
import type { NavigateFunction } from "react-router-dom";

export interface AuthResponse {
  user: User | null;
  session: Session | null;
}

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  username: string;
  current_period_end: string | null;
  status: string;
  plan_id: string;
  signUp: (
    navigate: NavigateFunction,
    email: string,
    password: string,
    username: string,
  ) => Promise<void>;
  signIn: (
    navigate: NavigateFunction,
    email: string,
    password: string,
  ) => Promise<{
    user: User;
    session: Session | null;
    subscriptionData: SB_subscriptionModel;
  }>;
  signOut: (navigate: NavigateFunction) => Promise<void>;
}
