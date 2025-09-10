"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { logout } from "./actions";

/**
 * Renders a button that logs out the current user.
 *
 * When clicked, this button triggers the logout process,
 * navigates the user to the login page, and refreshes the router state.
 *
 * @returns {JSX.Element} The logout button component.
 */
export default function LogOutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
    router.refresh();
  };

  return <Button onClick={handleLogout}>Log Out</Button>;
}
