"use client";

import LogOut from "../../(auth)/logout/logout";

/**
 * Renders the main dashboard page.
 *
 * Displays a heading and a logout button component.
 *
 * @returns {JSX.Element} The dashboard page layout.
 */
export default function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <LogOut />
    </div>
  );
}
