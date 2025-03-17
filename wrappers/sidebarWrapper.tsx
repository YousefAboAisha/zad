import { getSession } from "@/app/lib/session"; // Adjust the import path
import Sidebar from "@/containers/dashboard/sidebar";

export default async function SidebarWrapper() {
  const session = await getSession(); // Fetch the session on the server

  return <Sidebar session={session} />; // Pass the session as a prop
}
