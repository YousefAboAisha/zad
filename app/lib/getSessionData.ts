import { getSession } from "@/app/lib/session";

export async function getSessionData() {
  const session = await getSession();
  return session || null;
}
