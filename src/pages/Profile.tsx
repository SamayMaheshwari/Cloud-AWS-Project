import { useState, useEffect } from "react";
import { User, Mail, Upload, Calendar, Pencil, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";
import { apiService } from "@/services/api";
import { toast } from "sonner";

const Profile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const handleEdit = () => {
    toast.info("Edit profile functionality coming soon!");
  };

  const handlePassword = () => {
    toast.info("Change password functionality coming soon!");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await apiService.getUserProfile();
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <Loader text="Loading your profile..." />;
  if (!profile) return <div className="text-center p-8 text-muted-foreground">Profile not found</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your account settings</p>
      </div>

      <div className="glass-card p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center text-xl font-bold text-primary">
            {profile.avatar}
          </div>
          <div>
            <h2 className="text-lg font-semibold">{profile.name}</h2>
            <p className="text-sm text-muted-foreground">{profile.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: User, label: "Name", value: profile.name },
            { icon: Mail, label: "Email", value: profile.email },
            { icon: Upload, label: "Total Uploads", value: String(profile.totalUploads) },
            { icon: Calendar, label: "Member Since", value: profile.accountCreated },
          ].map((item) => (
            <div key={item.label} className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <item.icon className="h-3.5 w-3.5" />
                {item.label}
              </div>
              <p className="text-sm font-medium">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Button className="gap-2" onClick={handleEdit}><Pencil className="h-4 w-4" /> Edit Profile</Button>
        <Button variant="outline" className="gap-2" onClick={handlePassword}><Lock className="h-4 w-4" /> Change Password</Button>
      </div>
    </div>
  );
};

export default Profile;
