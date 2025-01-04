import { getSession } from "@/app/lib/session"; // Adjust the import path
import Navbar from "@/components/navbar";

export default async function NavbarWrapper() {
  const session = await getSession(); // Fetch the session on the server

  return <Navbar session={session} />; // Pass the session as a prop
}
