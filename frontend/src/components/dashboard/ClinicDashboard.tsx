import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ClinicDashboard({ user }: { user: any }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Clinic Management</h1>
        <p className="text-muted-foreground">Manage appointments, services, and your clinic profile.</p>
      </div>

      <Tabs defaultValue="appointments" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="profile">Profile & Hours</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="appointments" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Incoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-muted-foreground">Teeth Whitening - Today at 15:00</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Cancel</Button>
                  <Button size="sm">Mark Complete</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Services Menu</CardTitle>
              <Button size="sm">Add Service</Button>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Your approved services will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>Clinic Details</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2"><Label>Clinic Name</Label><Input defaultValue="My Awesome Clinic" /></div>
                <div className="space-y-2"><Label>Address</Label><Input defaultValue="123 Sukhumvit Rd" /></div>
                <Button>Save Profile</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Open Hours</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {/* Simplified Hours Example */}
                <div className="flex items-center gap-4">
                  <Label className="w-20">Monday</Label>
                  <Input type="time" defaultValue="09:00" className="w-32" />
                  <span>to</span>
                  <Input type="time" defaultValue="18:00" className="w-32" />
                </div>
                <Button variant="secondary">Update Hours</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardHeader><CardTitle>Patient Reviews</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-muted-foreground">No reviews yet.</p></CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}