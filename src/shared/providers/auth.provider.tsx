import { useState, type PropsWithChildren } from "react";
import { authService } from "../services/auth/auth.service";
import supabase from "../../config/supabase/supabase";
import type { Session, User } from "@supabase/supabase-js";
import type { NavigateFunction } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";

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

    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser) throw new Error("No authenticated user");

    const { data: subscriptionData, error } = await supabase
      .from("subscriptions")
      .select("*")
      .single();

    if (error) throw new Error("No se pudo obtener la suscripción Error");
    if (!subscriptionData) throw new Error("No se pudo obtener la suscripción");

    setUser(user);
    setUserName(subscriptionData.username);
    setStatus(subscriptionData.status);
    setPlan_id(subscriptionData.plan_id);
    setCurrent_period_end(subscriptionData.current_period_end);
    setSession(session);

    navigate("/dashboard", { replace: true });

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
    const { user } = await authService.signUp(email, password, username);

    if (!user) throw new Error("No se pudo crear el usuario");

    navigate("/login", { replace: true });
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
