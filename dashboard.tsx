import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BadgeDollarSign,
  GraduationCap,
  PieChart,
  ArrowUpCircle,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { type Loan, type EducationModule } from "@shared/schema";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const mockCreditHistory = [
  { month: "Jan", score: 620 },
  { month: "Feb", score: 635 },
  { month: "Mar", score: 648 },
  { month: "Apr", score: 650 },
  { month: "May", score: 665 },
  { month: "Jun", score: 680 },
];

export default function Dashboard() {
  const { user } = useAuth();

  const { data: loans = [] } = useQuery<Loan[]>({
    queryKey: ["/api/loans"],
  });

  const { data: educationModules = [] } = useQuery<EducationModule[]>({
    queryKey: ["/api/education/progress"],
  });

  const activeLoan = loans.find((loan) => loan.status === "active");
  const pendingLoan = loans.find((loan) => loan.status === "pending");

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credit Score</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user?.creditScore ?? 0}</div>
            <Progress
              value={(user?.creditScore ?? 0) / 8.5}
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Loan</CardTitle>
            <BadgeDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {activeLoan ? `$${activeLoan.amount}` : "No active loans"}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Education Progress
            </CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(educationModules.length / 4) * 100}%
            </div>
            <Progress
              value={(educationModules.length / 4) * 100}
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
            <ArrowUpCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {pendingLoan ? pendingLoan.riskScore : "N/A"}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Credit Score History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockCreditHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[600, 700]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}