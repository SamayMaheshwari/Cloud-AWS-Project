import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import DashboardSidebar from "@/components/DashboardSidebar";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";
import { apiService } from "@/services/api";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const data = await apiService.getUserProfile();
        setUser(data);
      } catch (error: any) {
        if (error?.message === "TOKEN_EXPIRED" || error?.message === "No token") {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          // Still allow access but with minimal user info
          setUser({ name: "User", email: "" });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) return <Loader text="Loading dashboard..." />;

  return (
    <div className="flex min-h-screen w-full">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <Navbar user={user} />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
