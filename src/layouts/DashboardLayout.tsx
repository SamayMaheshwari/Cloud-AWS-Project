import { Outlet } from "react-router-dom";
import DashboardSidebar from "@/components/DashboardSidebar";
import Navbar from "@/components/Navbar";
import { userProfile } from "@/data/mockData";

const DashboardLayout = () => (
  <div className="flex min-h-screen w-full">
    <DashboardSidebar />
    <div className="flex-1 flex flex-col">
      <Navbar user={userProfile} />
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  </div>
);

export default DashboardLayout;
