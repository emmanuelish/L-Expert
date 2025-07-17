"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Copy,
  Archive,
  Trash2,
  Download,
  Users,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import type { User, JobOffer } from "@/lib/schemas";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  getAllJobOffers,
  updateJobOfferStatus,
  deleteJobOffer,
  duplicateJobOffer,
} from "@/services/firebaseClientServices";

// Mock user data (this could be replaced with real auth context later)
const mockUser: User = {
  id: "1",
  email: "admin@lexpertpro.com",
  firstName: "Admin",
  lastName: "User",
  role: "admin",
};

// Extended JobOffer type with analytics data
type JobOfferWithAnalytics = JobOffer & {
  applications?: number;
  views?: number;
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<JobOfferWithAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const { toast } = useToast();

  // Fetch job offers from Firestore
  useEffect(() => {
    const fetchJobOffers = async () => {
      try {
        setLoading(true);
        const jobOffers = await getAllJobOffers();

        // Add mock analytics data for now (this could be replaced with real analytics later)
        const jobsWithAnalytics = jobOffers.map((job) => ({
          ...job,
          applications: Math.floor(Math.random() * 50), // Mock data
          views: Math.floor(Math.random() * 200), // Mock data
        }));

        setJobs(jobsWithAnalytics);
      } catch (error) {
        console.error("Error fetching job offers:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les offres d'emploi.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchJobOffers();
  }, [toast]);

  // Filter and sort jobs
  const filteredJobs = jobs
    .filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || job.status === statusFilter;
      const matchesType = typeFilter === "all" || job.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    })
    .sort((a, b) => {
      let aValue: string | number | Date = a[sortBy as keyof typeof a] as
        | string
        | number
        | Date;
      let bValue: string | number | Date = b[sortBy as keyof typeof b] as
        | string
        | number
        | Date;

      if (sortBy === "createdAt" || sortBy === "updatedAt") {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  // Statistics
  const stats = {
    total: jobs.length,
    published: jobs.filter((j) => j.status === "published").length,
    draft: jobs.filter((j) => j.status === "draft").length,
    archived: jobs.filter((j) => j.status === "archived").length,
    totalApplications: jobs.reduce(
      (sum, job) => sum + (job.applications || 0),
      0
    ),
    totalViews: jobs.reduce((sum, job) => sum + (job.views || 0), 0),
  };

  const handleSelectJob = (jobId: string) => {
    setSelectedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleSelectAll = () => {
    if (selectedJobs.length === filteredJobs.length) {
      setSelectedJobs([]);
    } else {
      setSelectedJobs(filteredJobs.map((job) => job.id));
    }
  };

  const handleBulkAction = async (action: string) => {
    if (selectedJobs.length === 0) return;

    try {
      switch (action) {
        case "publish":
          await Promise.all(
            selectedJobs.map((jobId) =>
              updateJobOfferStatus(jobId, "published")
            )
          );
          setJobs((prev) =>
            prev.map((job) =>
              selectedJobs.includes(job.id)
                ? {
                    ...job,
                    status: "published" as const,
                    isPublished: true,
                    updatedAt: new Date(),
                  }
                : job
            )
          );
          toast({
            title: "Offres publiées",
            description: `${selectedJobs.length} offre(s) ont été publiées.`,
          });
          break;
        case "archive":
          await Promise.all(
            selectedJobs.map((jobId) => updateJobOfferStatus(jobId, "archived"))
          );
          setJobs((prev) =>
            prev.map((job) =>
              selectedJobs.includes(job.id)
                ? { ...job, status: "archived" as const, updatedAt: new Date() }
                : job
            )
          );
          toast({
            title: "Offres archivées",
            description: `${selectedJobs.length} offre(s) ont été archivées.`,
          });
          break;
        case "delete":
          await Promise.all(selectedJobs.map((jobId) => deleteJobOffer(jobId)));
          setJobs((prev) =>
            prev.filter((job) => !selectedJobs.includes(job.id))
          );
          toast({
            title: "Offres supprimées",
            description: `${selectedJobs.length} offre(s) ont été supprimées.`,
          });
          break;
      }
      setSelectedJobs([]);
    } catch (error) {
      console.error("Error in bulk action:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'action.",
        variant: "destructive",
      });
    }
  };

  const handleJobAction = async (jobId: string, action: string) => {
    try {
      switch (action) {
        case "duplicate":
          const newJobId = await duplicateJobOffer(jobId);
          const jobToDuplicate = jobs.find((j) => j.id === jobId);
          if (jobToDuplicate) {
            const newJob = {
              ...jobToDuplicate,
              id: newJobId,
              title: `${jobToDuplicate.title} (Copie)`,
              status: "draft" as const,
              isPublished: false,
              createdAt: new Date(),
              updatedAt: new Date(),
              applications: 0,
              views: 0,
            };
            setJobs((prev) => [newJob, ...prev]);
            toast({
              title: "Offre dupliquée",
              description: "L'offre a été dupliquée avec succès.",
            });
          }
          break;
        case "archive":
          await updateJobOfferStatus(jobId, "archived");
          setJobs((prev) =>
            prev.map((job) =>
              job.id === jobId
                ? { ...job, status: "archived" as const, updatedAt: new Date() }
                : job
            )
          );
          toast({
            title: "Offre archivée",
            description: "L'offre a été archivée avec succès.",
          });
          break;
        case "delete":
          await deleteJobOffer(jobId);
          setJobs((prev) => prev.filter((job) => job.id !== jobId));
          toast({
            title: "Offre supprimée",
            description: "L'offre a été supprimée avec succès.",
          });
          break;
      }
    } catch (error) {
      console.error("Error in job action:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'action.",
        variant: "destructive",
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "published":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "draft":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "archived":
        return <Archive className="h-4 w-4 text-gray-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      published: "bg-green-100 text-green-800",
      draft: "bg-yellow-100 text-yellow-800",
      archived: "bg-gray-100 text-gray-800",
    };
    const labels = {
      published: "Publié",
      draft: "Brouillon",
      archived: "Archivé",
    };
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  if (loading) {
    return (
      <DashboardLayout user={mockUser}>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Chargement des offres d&apos;emploi...</span>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout user={mockUser}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Gestion des offres d&apos;emploi
            </h1>
            <p className="text-gray-600">
              Gérez toutes vos offres d&apos;emploi depuis cette interface
            </p>
          </div>
          <Link href="/admin/dashboard/jobs/create">
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle offre
            </Button>
          </Link>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total des offres
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.total}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-blue-100">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Publiées</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.published}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-green-100">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Candidatures
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalApplications}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-purple-100">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Vues totales
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalViews}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-orange-100">
                  <Eye className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Rechercher par titre, entreprise ou localisation..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="published">Publié</SelectItem>
                    <SelectItem value="draft">Brouillon</SelectItem>
                    <SelectItem value="archived">Archivé</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les types</SelectItem>
                    <SelectItem value="CDI">CDI</SelectItem>
                    <SelectItem value="CDD">CDD</SelectItem>
                    <SelectItem value="Stage">Stage</SelectItem>
                    <SelectItem value="Freelance">Freelance</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="createdAt">Date de création</SelectItem>
                    <SelectItem value="updatedAt">
                      Dernière modification
                    </SelectItem>
                    <SelectItem value="title">Titre</SelectItem>
                    <SelectItem value="applications">Candidatures</SelectItem>
                    <SelectItem value="views">Vues</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  onClick={() =>
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  }
                >
                  {sortOrder === "asc" ? "↑" : "↓"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bulk Actions */}
        {selectedJobs.length > 0 && (
          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-purple-800">
                    {selectedJobs.length} offre(s) sélectionnée(s)
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleBulkAction("publish")}
                  >
                    Publier
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleBulkAction("archive")}
                  >
                    Archiver
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleBulkAction("delete")}
                    className="text-red-600 hover:text-red-700"
                  >
                    Supprimer
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedJobs([])}
                  >
                    Annuler
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Jobs Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                Offres d&apos;emploi ({filteredJobs.length})
              </CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exporter
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtres avancés
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4">
                      <Checkbox
                        checked={
                          selectedJobs.length === filteredJobs.length &&
                          filteredJobs.length > 0
                        }
                        onCheckedChange={handleSelectAll}
                      />
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Offre
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Statut
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Type
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Candidatures
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Vues
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Créé le
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.map((job) => (
                    <tr
                      key={job.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 px-4">
                        <Checkbox
                          checked={selectedJobs.includes(job.id)}
                          onCheckedChange={() => handleSelectJob(job.id)}
                        />
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-start space-x-3">
                          {getStatusIcon(job.status)}
                          <div>
                            <h3 className="font-medium text-gray-900 line-clamp-1">
                              {job.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {job.company} • {job.location}
                            </p>
                            {job.salary && (
                              <p className="text-sm text-gray-500">
                                {job.salary}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        {getStatusBadge(job.status)}
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant="outline">{job.type}</Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">
                            {job.applications || 0}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">{job.views || 0}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {new Date(job.createdAt).toLocaleDateString(
                              "fr-FR"
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Link href={`/jobs/${job.slug}`}>
                            <Button size="sm" variant="ghost">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link href={`/admin/dashboard/jobs/${job.slug}/edit`}>
                            <Button size="sm" variant="ghost">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="sm" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() =>
                                  handleJobAction(job.id, "duplicate")
                                }
                              >
                                <Copy className="h-4 w-4 mr-2" />
                                Dupliquer
                              </DropdownMenuItem>
                              <Link href={`/jobs/${job.slug}`} target="_blank">
                                <DropdownMenuItem>
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  Voir en ligne
                                </DropdownMenuItem>
                              </Link>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() =>
                                  handleJobAction(job.id, "archive")
                                }
                              >
                                <Archive className="h-4 w-4 mr-2" />
                                Archiver
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleJobAction(job.id, "delete")
                                }
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Supprimer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredJobs.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <TrendingUp className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Aucune offre trouvée
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {searchTerm ||
                    statusFilter !== "all" ||
                    typeFilter !== "all"
                      ? "Aucune offre ne correspond à vos critères de recherche."
                      : "Vous n'avez pas encore créé d'offres d'emploi."}
                  </p>
                  {!searchTerm &&
                    statusFilter === "all" &&
                    typeFilter === "all" && (
                      <Link href="/admin/dashboard/jobs/create">
                        <Button className="bg-purple-600 hover:bg-purple-700">
                          <Plus className="h-4 w-4 mr-2" />
                          Créer votre première offre
                        </Button>
                      </Link>
                    )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
