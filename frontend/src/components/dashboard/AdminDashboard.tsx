import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function AdminDashboard({ user }: { user: any }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Platform Administration</h1>
        <p className="text-muted-foreground">Approve new clinics and manage system settings.</p>
      </div>

      <Tabs defaultValue="clinics" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="clinics">Pending Clinics</TabsTrigger>
          <TabsTrigger value="services">Pending Services</TabsTrigger>
        </TabsList>

        <TabsContent value="clinics" className="mt-6">
          <Card>
            <CardHeader><CardTitle>Clinics Awaiting Approval</CardTitle></CardHeader>
            <CardContent>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">New Horizon Dental</p>
                  <p className="text-sm text-muted-foreground">Submitted: 2 hours ago</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="destructive">Reject</Button>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">Approve</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="mt-6">
          <Card>
            <CardHeader><CardTitle>Services Awaiting Approval</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">No pending services.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}