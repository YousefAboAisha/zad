import { getSession } from "@/app/lib/session"; // Adjust the import path
import UserProfile from "@/containers/profile/userProfile";

export default async function UserProfileWrapper() {
  const session = await getSession(); // Fetch the session on the server

  return <UserProfile session={session} />; // Pass the session as a prop
}
