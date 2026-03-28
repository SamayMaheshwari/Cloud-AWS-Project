import { useState, useEffect } from "react";
import { TrendingUp, Activity, Eye, Files, FileCheck, Clock, AlertTriangle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import StatCard from "@/components/StatCard";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";
import { apiService } from "@/services/api";
import { uploadStats } from "@/data/mockData";

const Dashboard = () => {
  const [stats, setStats] = useState<any[]>([]);
  const [recentFiles, setRecentFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [s, f] = await Promise.all([
          apiService.getDashboardStats(),
          apiService.getFiles()
        ]);
        setStats(s);
        setRecentFiles(f.slice(0, 5));
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loader text="Loading dashboard data..." />;

  const iconMap: Record<string, any> = {
    "Total Files": Files,
    "Processed": FileCheck,
    "Pending": Clock,
    "Errors Found": AlertTriangle,
    "Completed": FileCheck,
    "Failed": AlertTriangle,
    "Processing": Loader2
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Overview of your cloud analysis activity</p>
        </div>
        <Link to="/upload">
          <Button className="gap-2">
            <TrendingUp className="h-4 w-4" /> New Upload
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <StatCard 
            key={stat.title}
            title={stat.title} 
            value={stat.value} 
            icon={iconMap[stat.title] || Files} 
            variant={stat.variant} 
            trend={stat.trend} 
          />
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-semibold">Upload Activity</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Files uploaded over time</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-success bg-success/10 px-2.5 py-1 rounded-full font-medium">
              <Activity className="h-3 w-3" /> +24%
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={uploadStats}>
              <defs>
                <linearGradient id="uploadGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(217, 91%, 53%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(217, 91%, 53%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }} />
              <Tooltip
                contentStyle={{ backgroundColor: "hsl(222, 47%, 9%)", border: "1px solid hsl(215, 28%, 17%)", borderRadius: "8px", color: "hsl(210, 40%, 96%)" }}
              />
              <Area type="monotone" dataKey="uploads" stroke="hsl(217, 91%, 53%)" fill="url(#uploadGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold">Recent Files</h3>
            <Link to="/history" className="text-xs text-primary hover:underline">View all</Link>
          </div>
          <div className="space-y-1">
            {recentFiles.length > 0 ? (
              recentFiles.map((file) => (
                <div key={file.id} className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-muted/50 transition-colors group">
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{file.uploadDate}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={file.status} />
                    <Link to="/results">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
                <div className="h-full flex flex-col items-center justify-center py-10 opacity-50">
                    <Files className="h-10 w-10 mb-2" />
                    <p className="text-sm">No recent activity</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
