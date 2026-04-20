import { useState } from "react";

export type AuthType = "login" | "registration" | "by_email";
type Mode = "email" | "username";

export default function useAuthUI() {
  const [authType, setAuthType] = useState<AuthType>("login");
  const [mode, setMode] = useState<Mode>("username");

  return {authType, setAuthType, mode, setMode}
}
