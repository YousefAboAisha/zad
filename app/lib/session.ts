import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(
  userId: string,
  name: string,
  email: string
) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, name, email, expiresAt });

  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
}

export async function deleteSession() {
  (await cookies()).delete("session");
}

export type SessionPayload = {
  userId: string;
  name: string;
  email: string;
  expiresAt: Date;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error("Failed to verify session", error);
  }
}

export async function getSession() {
  const sessionCookie = (await cookies()).get("session");
  if (!sessionCookie) return null;

  const session = (await decrypt(sessionCookie.value)) as SessionPayload;
  if (!session || new Date(session.expiresAt) < new Date()) {
    await deleteSession();
    return null;
  }

  return session;
}
