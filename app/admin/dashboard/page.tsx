"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Users,
  Eye,
  Plus,
  TrendingUp,
  Clock,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import type { User } from "@/lib/schemas";
import AuthGuard from "@/components/auth/auth-guard";

// Mock user data
const mockUser: User = {
  id: "1",
  email: "admin@lexpertpro.com",
  firstName: "Admin",
  lastName: "User",
  role: "admin",
};

export default function DashboardPage() {
  const stats = [
    {
      title: "Offres d'emploi",
      value: "24",
      change: "+12%",
      icon: Briefcase,
      color: "text-blue-600",
    },
    {
      title: "Candidatures",
      value: "156",
      change: "+23%",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Vues totales",
      value: "2,847",
      change: "+8%",
      icon: Eye,
      color: "text-purple-600",
    },
    {
      title: "Taux de conversion",
      value: "5.4%",
      change: "+2.1%",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ];

  const recentJobs = [
    {
      id: "1",
      title: "Développeur Full Stack Senior",
      company: "TechCorp",
      status: "published",
      applications: 23,
      views: 145,
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      title: "Designer UX/UI",
      company: "Creative Agency",
      status: "draft",
      applications: 0,
      views: 0,
      createdAt: "2024-01-14",
    },
    {
      id: "3",
      title: "Chef de Projet Digital",
      company: "Digital Solutions",
      status: "published",
      applications: 18,
      views: 89,
      createdAt: "2024-01-13",
    },
  ];

  return (
    <AuthGuard>
      <DashboardLayout user={mockUser}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Tableau de bord
              </h1>
              <p className="text-gray-600">
                Bienvenue dans votre espace d&apos;administration
              </p>
            </div>
            <Link href="/admin/dashboard/jobs/create">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle offre
              </Button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                      <p className="text-sm text-green-600">
                        {stat.change} ce mois
                      </p>
                    </div>
                    <div
                      className={`p-3 rounded-full bg-gray-100 ${stat.color}`}
                    >
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Jobs */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Offres récentes</CardTitle>
                <Link href="/dashboard/jobs">
                  <Button variant="outline" size="sm">
                    Voir tout
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentJobs.map((job) => (
                  <div
                    key={job.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {job.status === "published" ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <Clock className="h-5 w-5 text-yellow-500" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {job.title}
                        </h3>
                        <p className="text-sm text-gray-500">{job.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="text-center">
                        <p className="font-medium text-gray-900">
                          {job.applications}
                        </p>
                        <p>Candidatures</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-gray-900">{job.views}</p>
                        <p>Vues</p>
                      </div>
                      <div className="text-center">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            job.status === "published"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {job.status === "published" ? "Publié" : "Brouillon"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </AuthGuard>
  );
}
