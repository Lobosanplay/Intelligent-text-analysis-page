import type { Session, User } from "@supabase/supabase-js";
import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import { authService } from "../services/auth/auth.service";
import supabase from "../../config/supabase";
import SB_subscriptionModel from "../models/subscritions/subscritions.model";
import type { NavigateFunction } from "react-router-dom";

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  userName: string;
  current_period_end: string | null;
  status: string;
  plan_id: string;
  signUp: (
    navigate: NavigateFunction,
    email: string,
    password: string,
    username: string,
  ) => Promise<{ user: User; subscriptionData: SB_subscriptionModel }>;
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

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [userName, setUserName] = useState<string>("User");
  const [session, setSession] = useState<Session | null>(null);
  const [current_period_end, setCurrent_period_end] = useState<string | null>(
    null,
  );
  const [status, setStatus] = useState<string>("");
  const [plan_id, setPlan_id] = useState<string>("");

  const signIn = async (
    navigate: NavigateFunction,
    email: string,
    password: string,
  ) => {
    const { user, session } = await authService.signIn(email, password);

    if (!user) throw new Error("No se pudo crear el usuario");

    const { data: subscriptionData, error: subscritionDataError } =
      await supabase.from("subscriptions").select("*").eq("user_id", user.id);

    if (subscritionDataError)
      throw new Error("No se pudo obtener la suscripción");
    if (!subscriptionData) throw new Error("No se pudo obtener la suscripción");

    setUser(user);
    setUserName(subscriptionData.username);
    setStatus(subscriptionData.status);
    setPlan_id(subscriptionData.plan_id);
    setCurrent_period_end(subscriptionData.current_period_end);
    setSession(session);

    navigate("/chat", { replace: true });

    return {
      user,
      session,
      subscriptionData,
    };
  };

  const signUp = async (
    navigate: NavigateFunction,
    email: string,
    password: string,
    username: string,
  ) => {
    const { user, session } = await authService.signUp(email, password);

    if (!user) throw new Error("No se pudo crear el usuario");

    const { data: subscriptionData, error: subscriptionDataError } =
      await supabase
        .from("subscriptions")
        .insert({ user_id: user.id, username })
        .select("*")
        .single();

    if (subscriptionDataError)
      throw new Error("No se pudo crear la suscripción");

    setUser(user);
    setUserName(subscriptionData.username);
    setStatus(subscriptionData.status);
    setPlan_id(subscriptionData.plan_id);
    setCurrent_period_end(subscriptionData.current_period_end);
    setSession(session);

    navigate("/chat", { replace: true });
    return {
      user,
      subscriptionData,
    };
  };

  const signOut = async (navigate: NavigateFunction) => {
    await authService.signOut();

    setUser(null);
    setUserName("User");
    setSession(null);

    navigate("/", { replace: true });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        signIn,
        signUp,
        signOut,
        userName,
        current_period_end,
        status,
        plan_id,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
