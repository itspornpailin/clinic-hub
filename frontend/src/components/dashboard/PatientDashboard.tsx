import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CalendarDays, Clock, MapPin, Award } from "lucide-react";
import { api } from "@/lib/api";

export function PatientDashboard({ user }: { user: any }) {
  // Example state for when you connect the backend
  const [appointments, setAppointments] = useState([]);
  const [loyalty, setLoyalty] = useState({ points: 150, tier: "Silver", nextTier: 500 });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Patient Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user.name}. Manage your health journey.</p>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="loyalty">Loyalty Points</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>Your scheduled clinic visits.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Placeholder for appointment mapping */}
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-1">
                  <p className="font-medium">Bangkok Dental Care</p>
                  <div className="flex items-center text-sm text-muted-foreground gap-4">
                    <span className="flex items-center gap-1"><CalendarDays className="h-4 w-4" /> Oct 24, 2026</span>
                    <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> 14:00</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">Reschedule</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Appointment History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">No past appointments found.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="loyalty" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Award className="h-5 w-5 text-primary" /> Loyalty Rewards</CardTitle>
              <CardDescription>Earn points for every completed visit.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{loyalty.tier} Member</span>
                  <span className="font-bold">{loyalty.points} pts</span>
                </div>
                <Progress value={(loyalty.points / loyalty.nextTier) * 100} className="h-3" />
                <p className="text-xs text-muted-foreground mt-2">{loyalty.nextTier - loyalty.points} points until Gold Tier</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-w-md">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input defaultValue={user.name} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input defaultValue={user.email} disabled />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}