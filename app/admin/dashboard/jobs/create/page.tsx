"use client";

import type React from "react";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Upload, Save, Eye, ArrowLeft } from "lucide-react";
import type { JobOffer, User } from "@/lib/schemas";
import Image from "next/image";

// Mock user data - in real app this would come from auth context
const mockUser: User = {
  id: "1",
  email: "admin@lexpertpro.com",
  firstName: "Admin",
  lastName: "User",
  role: "admin",
};

export default function CreateJobPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [jobOffer, setJobOffer] = useState<Partial<JobOffer>>({
    title: "",
    subtitle: "",
    company: "",
    location: "",
    salary: "",
    type: "CDI",
    introduction: "",
    description: "",
    paragraphs: [""],
    bulletPoints: [""],
    conclusion: "",
    requirements: [""],
    benefits: [""],
    images: [],
    status: "draft",
  });

  const handleInputChange = (field: keyof JobOffer, value: unknown) => {
    setJobOffer((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (
    field: "paragraphs" | "bulletPoints" | "requirements" | "benefits",
    index: number,
    value: string
  ) => {
    const currentArray = jobOffer[field] || [];
    const newArray = [...currentArray];
    newArray[index] = value;
    handleInputChange(field, newArray);
  };

  const addArrayItem = (
    field: "paragraphs" | "bulletPoints" | "requirements" | "benefits"
  ) => {
    const currentArray = jobOffer[field] || [];
    handleInputChange(field, [...currentArray, ""]);
  };

  const removeArrayItem = (
    field: "paragraphs" | "bulletPoints" | "requirements" | "benefits",
    index: number
  ) => {
    const currentArray = jobOffer[field] || [];
    const newArray = currentArray.filter((_, i) => i !== index);
    handleInputChange(field, newArray);
  };

  const handleSubmit = async (status: "draft" | "published") => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Saving job offer:", { ...jobOffer, status });
    setIsLoading(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // In real app, upload to cloud storage and get URLs
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      handleInputChange("images", [...(jobOffer.images || []), ...newImages]);
    }
  };

  return (
    <DashboardLayout user={mockUser}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Créer une offre d&apos;emploi
              </h1>
              <p className="text-gray-600">
                Remplissez tous les détails de l&apos;offre d&apos;emploi
              </p>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" disabled={isLoading}>
              <Eye className="h-4 w-4 mr-2" />
              Aperçu
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSubmit("draft")}
              disabled={isLoading}
            >
              <Save className="h-4 w-4 mr-2" />
              Brouillon
            </Button>
            <Button
              onClick={() => handleSubmit("published")}
              disabled={isLoading}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <Plus className="h-4 w-4 mr-2" />
              )}
              Publier
            </Button>
          </div>
        </div>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Informations de base</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titre du poste *</Label>
                <Input
                  id="title"
                  placeholder="Ex: Développeur Full Stack Senior"
                  value={jobOffer.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subtitle">Sous-titre</Label>
                <Input
                  id="subtitle"
                  placeholder="Ex: Rejoignez notre équipe tech innovante"
                  value={jobOffer.subtitle}
                  onChange={(e) =>
                    handleInputChange("subtitle", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Entreprise *</Label>
                <Input
                  id="company"
                  placeholder="Nom de l'entreprise"
                  value={jobOffer.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Localisation *</Label>
                <Input
                  id="location"
                  placeholder="Paris, France"
                  value={jobOffer.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Salaire</Label>
                <Input
                  id="salary"
                  placeholder="45k - 65k €"
                  value={jobOffer.salary}
                  onChange={(e) => handleInputChange("salary", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type de contrat *</Label>
              <Select
                value={jobOffer.type}
                onValueChange={(value) => handleInputChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CDI">CDI</SelectItem>
                  <SelectItem value="CDD">CDD</SelectItem>
                  <SelectItem value="Stage">Stage</SelectItem>
                  <SelectItem value="Freelance">Freelance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Content Sections */}
        <Card>
          <CardHeader>
            <CardTitle>Contenu de l&apos;offre</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Introduction */}
            <div className="space-y-2">
              <Label htmlFor="introduction">Introduction</Label>
              <Textarea
                id="introduction"
                placeholder="Une introduction accrocheuse pour présenter l'opportunité..."
                rows={3}
                value={jobOffer.introduction}
                onChange={(e) =>
                  handleInputChange("introduction", e.target.value)
                }
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description principale *</Label>
              <Textarea
                id="description"
                placeholder="Description détaillée du poste, missions principales..."
                rows={5}
                value={jobOffer.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
            </div>

            {/* Paragraphs */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Paragraphes additionnels</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addArrayItem("paragraphs")}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Ajouter
                </Button>
              </div>
              {jobOffer.paragraphs?.map((paragraph, index) => (
                <div key={index} className="flex space-x-2">
                  <Textarea
                    placeholder={`Paragraphe ${index + 1}...`}
                    rows={3}
                    value={paragraph}
                    onChange={(e) =>
                      handleArrayChange("paragraphs", index, e.target.value)
                    }
                    className="flex-1"
                  />
                  {jobOffer.paragraphs!.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeArrayItem("paragraphs", index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Bullet Points */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Points clés</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addArrayItem("bulletPoints")}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Ajouter
                </Button>
              </div>
              {jobOffer.bulletPoints?.map((point, index) => (
                <div key={index} className="flex space-x-2">
                  <Input
                    placeholder={`Point ${index + 1}...`}
                    value={point}
                    onChange={(e) =>
                      handleArrayChange("bulletPoints", index, e.target.value)
                    }
                    className="flex-1"
                  />
                  {jobOffer.bulletPoints!.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeArrayItem("bulletPoints", index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Conclusion */}
            <div className="space-y-2">
              <Label htmlFor="conclusion">Conclusion</Label>
              <Textarea
                id="conclusion"
                placeholder="Conclusion motivante, appel à l'action..."
                rows={3}
                value={jobOffer.conclusion}
                onChange={(e) =>
                  handleInputChange("conclusion", e.target.value)
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Requirements & Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Exigences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Compétences requises</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addArrayItem("requirements")}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Ajouter
                </Button>
              </div>
              {jobOffer.requirements?.map((req, index) => (
                <div key={index} className="flex space-x-2">
                  <Input
                    placeholder={`Exigence ${index + 1}...`}
                    value={req}
                    onChange={(e) =>
                      handleArrayChange("requirements", index, e.target.value)
                    }
                    className="flex-1"
                  />
                  {jobOffer.requirements!.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeArrayItem("requirements", index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>Avantages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Avantages offerts</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addArrayItem("benefits")}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Ajouter
                </Button>
              </div>
              {jobOffer.benefits?.map((benefit, index) => (
                <div key={index} className="flex space-x-2">
                  <Input
                    placeholder={`Avantage ${index + 1}...`}
                    value={benefit}
                    onChange={(e) =>
                      handleArrayChange("benefits", index, e.target.value)
                    }
                    className="flex-1"
                  />
                  {jobOffer.benefits!.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeArrayItem("benefits", index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle>Images et bannières</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">
                  Télécharger des images
                </p>
                <p className="text-gray-600">PNG, JPG, GIF jusqu&apos;à 10MB</p>
              </label>
            </div>

            {jobOffer.images && jobOffer.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {jobOffer.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Upload ${index + 1}`}
                      width={300}
                      height={96}
                      className="w-full h-24 object-cover rounded-lg border"
                      unoptimized
                    />
                    <button
                      onClick={() => {
                        const newImages = jobOffer.images!.filter(
                          (_, i) => i !== index
                        );
                        handleInputChange("images", newImages);
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
