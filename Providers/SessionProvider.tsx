"use client";
import { SessionPayload } from "@/app/lib/session";
import { setUser } from "@/app/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function SessionProvider({
  session,
}: {
  session: SessionPayload;
}) {
  const dispatch = useDispatch();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (session) {
      dispatch(setUser(session));
    }
    setHydrated(true);
  }, [session, dispatch]);

  if (!hydrated) return null; // Avoid hydration mismatch

  return null;
}
