import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import {
  LayoutDashboard,
  BookOpen,
  PenSquare,
  LogOut,
  UserCheck,
  AlertCircle,
} from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, logoutMutation } = useAuth();
  const { data: kycStatus } = useQuery({
    queryKey: ["/api/kyc/status"],
  });

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/">
                <a className="flex items-center text-2xl font-bold text-primary">
                  MicroFin
                </a>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/education">
                <Button variant="ghost">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Learn
                </Button>
              </Link>
              <Link href="/kyc">
                <Button
                  variant={kycStatus?.status === "verified" ? "ghost" : "outline"}
                  className={
                    kycStatus?.status === "verified"
                      ? "text-green-500"
                      : "text-orange-500"
                  }
                >
                  {kycStatus?.status === "verified" ? (
                    <UserCheck className="mr-2 h-4 w-4" />
                  ) : (
                    <AlertCircle className="mr-2 h-4 w-4" />
                  )}
                  KYC {kycStatus?.status === "verified" ? "Verified" : "Pending"}
                </Button>
              </Link>
              <Link href="/apply">
                <Button>
                  <PenSquare className="mr-2 h-4 w-4" />
                  Apply for Loan
                </Button>
              </Link>
              <Button
                variant="ghost"
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}