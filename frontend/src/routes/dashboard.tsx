import { createFileRoute, redirect } from '@tanstack/react-router';
import { useAuth } from '@/lib/auth';
import { PatientDashboard } from '@/components/dashboard/PatientDashboard';
import { ClinicDashboard } from '@/components/dashboard/ClinicDashboard';
import { AdminDashboard } from '@/components/dashboard/AdminDashboard';

export const Route = createFileRoute('/dashboard')({
  component: DashboardSwitchboard,
});

function DashboardSwitchboard() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading dashboard...</div>;
  }

  if (!user) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <p className="text-xl font-semibold text-red-500">Please log in to view this page.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      {user.role === 'patient' && <PatientDashboard user={user} />}
      {user.role === 'clinic' && <ClinicDashboard user={user} />}
      {user.role === 'admin' && <AdminDashboard user={user} />}
      
      {!['patient', 'clinic', 'admin'].includes(user.role) && (
        <div className="rounded-lg bg-red-50 p-4 text-red-600">
          Error: Invalid user role detected. Please contact support.
        </div>
      )}
    </div>
  );
}