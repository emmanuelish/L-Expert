"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import type { User } from "@/lib/schemas";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";

interface DashboardLayoutProps {
  children: ReactNode;
  user: User;
}

export function DashboardLayout({ children, user }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { signOut } = useAuth();
  const router = useRouter();

  const navigation = [
    {
      name: "Tableau de bord",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    { name: "Offres d'emploi", href: "/admin/dashboard/jobs", icon: Briefcase },
    { name: "Utilisateurs", href: "/admin/dashboard/users", icon: Users },
    { name: "Paramètres", href: "/admin/dashboard/settings", icon: Settings },
  ];

  if (user.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Accès refusé
          </h1>
          <p className="text-gray-600 mb-6">
            Vous n&apos;avez pas les permissions nécessaires pour accéder à
            cette page.
          </p>
          <Link href="/auth/login">
            <Button>Retour à la connexion</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="text-xl font-bold text-gray-800">
              L&apos;Expert Pro
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation - flex-1 to take available space */}
        <nav className="flex-1 px-3 py-6 overflow-y-auto">
          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-purple-50 hover:text-purple-700 transition-colors"
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        {/* User Profile - fixed at bottom */}
        <div className="flex-shrink-0 p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 font-medium text-sm">
                {user.firstName?.[0] || ""}
                {user.lastName?.[0] || ""}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-700 hover:text-red-600"
            onClick={async () => {
              await signOut();
              router.push("/login");
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Admin Dashboard</span>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
