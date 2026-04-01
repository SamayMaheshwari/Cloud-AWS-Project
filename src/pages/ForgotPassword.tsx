import { Link } from "react-router-dom";
import { Cloud, ArrowLeft, Mail, Loader2 } from "lucide-react";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { apiService } from "@/services/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }
    setLoading(true);
    try {
      const res = await apiService.forgotPassword(email);
      if (res.success) {
        setSent(true);
        toast.success(res.message || "Reset token sent to your email!");
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to send reset token. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="glass-card p-8 w-full max-w-sm animate-fade-in">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>

        {!sent ? (
          <>
            <div className="text-center mb-6">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-lg font-semibold">Forgot Password?</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Enter your email and we'll send you a reset token.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                {loading ? "Sending..." : "Generate Token"}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
              <Mail className="h-5 w-5 text-success" />
            </div>
            <h2 className="text-lg font-semibold">Check Your Email</h2>
            <p className="text-sm text-muted-foreground">
              We've sent a password reset token to <span className="text-foreground font-medium">{email}</span>
            </p>
            <Link to="/reset-password">
              <Button variant="outline" className="w-full mt-2">
                Go to Reset Password
              </Button>
            </Link>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link to="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
