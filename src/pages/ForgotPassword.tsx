import { Link } from "react-router-dom";
import { Cloud, ArrowLeft, Mail } from "lucide-react";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.success("Password reset link sent to your email!");
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
                Enter your email and we'll send you a reset link.
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
              <Button type="submit" className="w-full">Send Reset Link</Button>
            </form>
          </>
        ) : (
          <div className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
              <Mail className="h-5 w-5 text-success" />
            </div>
            <h2 className="text-lg font-semibold">Check Your Email</h2>
            <p className="text-sm text-muted-foreground">
              We've sent a password reset link to <span className="text-foreground font-medium">{email}</span>
            </p>
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
