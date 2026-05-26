import { createRootRoute, Outlet, Link } from '@tanstack/react-router';
import { AuthProvider, useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Activity } from 'lucide-react';

export const Route = createRootRoute({
  component: RootComponent,
});

function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between mx-auto px-4">
        <div className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">MedCentral</span>
        </div>
        
        <nav className="flex items-center gap-4">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">Home</Link>
          
          {user ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">Dashboard</Link>
              <Button variant="outline" size="sm" onClick={signOut}>Log out</Button>
            </>
          ) : (
            <Link to="/login">
              <Button size="sm">Log in</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

function RootComponent() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background font-sans antialiased">
        <Navbar />
        <main className="flex-1">
          {/* Outlet is where all the child pages (like /login or /dashboard) render */}
          <Outlet /> 
        </main>
      </div>
    </AuthProvider>
  );
}