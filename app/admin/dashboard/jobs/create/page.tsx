"use client";

import type React from "react";

import { useState, useEffect, useCallback } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { RichTextEditor } from "@/components/rich-text-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Plus,
  Trash2,
  Upload,
  Save,
  Eye,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import type { JobOffer, User } from "@/lib/schemas";
import { JobTemplatePreviewModal } from "@/components/job-template-preview-modal";
import Image from "next/image";
import {
  saveJobOfferDraft,
  publishJobOffer,
} from "@/services/firebaseClientServices";
import { useRouter } from "next/navigation";

// Mock user data - in real app this would come from auth context
const mockUser: User = {
  id: "1",
  email: "admin@lexpertpro.com",
  firstName: "Admin",
  lastName: "User",
  role: "admin",
};

// Local storage key for job draft
const JOB_DRAFT_KEY = "job_creation_draft";
const AUTO_SAVE_INTERVAL = 30000; // 30 seconds

// Default job offer structure
const defaultJobOffer: Partial<JobOffer> = {
  title: "",
  subtitle: "",
  company: "",
  location: "",
  startDate: "",
  deadline: "",
  workplace: "",
  type: "CDI",
  introduction: "",
  missions: "",
  profile: "",
  paragraphs: [""],
  paragraphTitles: [""],
  bulletPoints: [""],
  requirements: [""],
  benefits: [""],
  images: [],
  status: "draft",
};

export default function CreateJobPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showRecoveryAlert, setShowRecoveryAlert] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const [jobOffer, setJobOffer] = useState<Partial<JobOffer>>(defaultJobOffer);

  // Load saved draft on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem(JOB_DRAFT_KEY);
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        const lastSavedTime = localStorage.getItem(
          `${JOB_DRAFT_KEY}_timestamp`
        );

        if (parsedDraft && Object.keys(parsedDraft).length > 0) {
          setJobOffer(parsedDraft);
          setShowRecoveryAlert(true);
          if (lastSavedTime) {
            setLastSaved(new Date(parseInt(lastSavedTime)));
          }
        }
      } catch (error) {
        console.error("Error loading saved draft:", error);
        localStorage.removeItem(JOB_DRAFT_KEY);
        localStorage.removeItem(`${JOB_DRAFT_KEY}_timestamp`);
      }
    }
  }, []);

  // Auto-save functionality
  const saveToLocalStorage = useCallback((data: Partial<JobOffer>) => {
    try {
      localStorage.setItem(JOB_DRAFT_KEY, JSON.stringify(data));
      localStorage.setItem(`${JOB_DRAFT_KEY}_timestamp`, Date.now().toString());
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, []);

  // Auto-save effect
  useEffect(() => {
    if (hasUnsavedChanges) {
      const timeoutId = setTimeout(() => {
        saveToLocalStorage(jobOffer);
      }, AUTO_SAVE_INTERVAL);

      return () => clearTimeout(timeoutId);
    }
  }, [jobOffer, hasUnsavedChanges, saveToLocalStorage]);

  // Clear draft after successful save/publish
  const clearDraft = useCallback(() => {
    localStorage.removeItem(JOB_DRAFT_KEY);
    localStorage.removeItem(`${JOB_DRAFT_KEY}_timestamp`);
    setLastSaved(null);
    setHasUnsavedChanges(false);
  }, []);

  // Handle recovery alert
  const handleRecoveryAccept = () => {
    setShowRecoveryAlert(false);
    toast({
      title: "Brouillon restauré",
      description: "Votre brouillon précédent a été restauré avec succès.",
    });
  };

  const handleRecoveryDecline = () => {
    setShowRecoveryAlert(false);
    setJobOffer(defaultJobOffer);
    clearDraft();
    toast({
      title: "Nouveau brouillon",
      description: "Vous commencez avec un nouveau brouillon.",
    });
  };

  const handleInputChange = (
    field: keyof JobOffer,
    value: string | string[] | undefined
  ) => {
    setJobOffer((prev) => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const handleArrayChange = (
    field:
      | "paragraphs"
      | "paragraphTitles"
      | "bulletPoints"
      | "requirements"
      | "benefits",
    index: number,
    value: string
  ) => {
    const currentArray = jobOffer[field] || [];
    const newArray = [...currentArray];
    newArray[index] = value;
    handleInputChange(field, newArray);
  };

  const addArrayItem = (
    field:
      | "paragraphs"
      | "paragraphTitles"
      | "bulletPoints"
      | "requirements"
      | "benefits"
  ) => {
    const currentArray = jobOffer[field] || [];
    handleInputChange(field, [...currentArray, ""]);
  };

  const removeArrayItem = (
    field:
      | "paragraphs"
      | "paragraphTitles"
      | "bulletPoints"
      | "requirements"
      | "benefits",
    index: number
  ) => {
    const currentArray = jobOffer[field] || [];
    const newArray = currentArray.filter((_, i) => i !== index);
    handleInputChange(field, newArray);
  };

  const validateJobOffer = () => {
    const errors = [];
    if (!jobOffer.title?.trim()) errors.push("Le titre du poste est requis");
    if (!jobOffer.company?.trim())
      errors.push("Le nom de l'entreprise est requis");
    if (!jobOffer.location?.trim()) errors.push("La localisation est requise");
    if (!jobOffer.missions?.trim())
      errors.push("La description des missions est requise");
    if (!jobOffer.profile?.trim())
      errors.push("Le profil recherché est requis");
    return errors;
  };

  const handleSaveDraft = async () => {
    setIsLoading(true);
    try {
      const updatedJobOffer = {
        ...jobOffer,
        updatedAt: new Date(),
      };

      console.log("Saving draft:", updatedJobOffer);

      // Save to Firestore
      const jobId = await saveJobOfferDraft(updatedJobOffer);
      console.log("Draft saved with ID:", jobId);

      // Save to localStorage as well
      saveToLocalStorage(updatedJobOffer);

      toast({
        title: "Brouillon sauvegardé",
        description:
          "Votre offre d'emploi a été sauvegardée en tant que brouillon dans Firestore.",
      });
    } catch (error) {
      console.error("Error saving draft:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = async () => {
    const errors = validateJobOffer();
    if (errors.length > 0) {
      toast({
        title: "Validation échouée",
        description: errors.join(", "),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const publishedJobOffer = {
        ...jobOffer,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      console.log("Publishing job offer:", publishedJobOffer);

      // Save to Firestore
      const jobId = await publishJobOffer(publishedJobOffer);
      console.log("Job published with ID:", jobId);

      // Clear draft after successful publication
      clearDraft();

      toast({
        title: "Offre publiée !",
        description: "Votre offre d'emploi a été publiée avec succès",
      });

      // Redirect to jobs dashboard after a short delay
      setTimeout(() => {
        router.push("/admin/dashboard/jobs");
      }, 1200);
    } catch (error) {
      console.error("Error publishing job:", error);
      toast({
        title: "Erreur de publication",
        description: "Une erreur est survenue lors de la publication.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
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

  // Warn user before leaving page with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue =
          "Vous avez des modifications non sauvegardées. Êtes-vous sûr de vouloir quitter ?";
        return e.returnValue;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  return (
    <DashboardLayout user={mockUser}>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Recovery Alert */}
        {showRecoveryAlert && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-blue-800">
                  Brouillon trouvé
                </h3>
                <p className="text-sm text-blue-700 mt-1">
                  Un brouillon précédent a été trouvé. Voulez-vous le restaurer
                  ?
                  {lastSaved && (
                    <span className="block mt-1 text-xs">
                      Dernière sauvegarde : {lastSaved.toLocaleString("fr-FR")}
                    </span>
                  )}
                </p>
                <div className="flex space-x-3 mt-3">
                  <Button
                    size="sm"
                    onClick={handleRecoveryAccept}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Restaurer le brouillon
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleRecoveryDecline}
                  >
                    Commencer un nouveau
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

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
                Utilisez l&apos;éditeur riche pour créer du contenu
                professionnel
              </p>
              {hasUnsavedChanges && (
                <p className="text-sm text-orange-600 mt-1">
                  ⚠️ Modifications non sauvegardées
                </p>
              )}
              {lastSaved && !hasUnsavedChanges && (
                <p className="text-sm text-green-600 mt-1">
                  ✓ Dernière sauvegarde : {lastSaved.toLocaleString("fr-FR")}
                </p>
              )}
            </div>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={handlePreview}
              disabled={isLoading}
            >
              <Eye className="h-4 w-4 mr-2" />
              Aperçu complet
            </Button>
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Brouillon
            </Button>
            <Button
              onClick={handlePublish}
              disabled={isLoading}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <CheckCircle className="h-4 w-4 mr-2" />
              )}
              Publier
            </Button>
          </div>
        </div>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>
              <span className="text-red-600">Informations de base</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-blue-600">
                  Titre du poste *
                </Label>
                <Input
                  id="title"
                  placeholder="Ex: Développeur Full Stack Senior"
                  value={jobOffer.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subtitle" className="text-blue-600">
                  Sous-titre
                </Label>
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
                <Label htmlFor="company" className="text-blue-600">
                  Entreprise *
                </Label>
                <Input
                  id="company"
                  placeholder="Nom de l'entreprise"
                  value={jobOffer.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="text-blue-600">
                  Localisation *
                </Label>
                <Input
                  id="location"
                  placeholder="Lomé, Togo"
                  value={jobOffer.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type" className="text-blue-600">
                  Type de contrat *
                </Label>
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
            </div>
          </CardContent>
        </Card>

        {/* Rich Content Sections */}
        <Card>
          <CardHeader>
            <CardTitle>
              <span className="text-red-600">Contenu de l&apos;offre</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Introduction */}
            <div className="space-y-3">
              <Label className="text-base font-semibold text-blue-600">
                Introduction / Présentation
              </Label>
              <p className="text-sm text-gray-600">
                Une introduction accrocheuse pour présenter l&apos;opportunité
              </p>
              <RichTextEditor
                content={jobOffer.introduction || ""}
                onChange={(content) =>
                  handleInputChange("introduction", content)
                }
                placeholder="Rédigez une introduction captivante qui donne envie aux candidats de postuler..."
              />
            </div>

            {/* Main Description */}
            <div className="space-y-3">
              <Label className="text-base font-semibold text-blue-600">
                Missions du poste *
              </Label>
              <p className="text-sm text-gray-600">
                Décrivez les principales responsabilités, tâches et objectifs du
                poste à pourvoir.
              </p>
              <RichTextEditor
                content={jobOffer.missions || ""}
                onChange={(content) => handleInputChange("missions", content)}
                placeholder="Décrivez en détail le poste, les missions, l'environnement de travail..."
              />
            </div>
            {/* Profil Recherché */}
            <div className="space-y-3 mt-6">
              <Label className="text-base font-semibold text-blue-600">
                Profil recherché *
              </Label>
              <p className="text-sm text-gray-600">
                Décrivez le profil idéal du candidat, les compétences,
                expériences et qualités requises.
              </p>
              <RichTextEditor
                content={jobOffer.profile || ""}
                onChange={(content) => handleInputChange("profile", content)}
                placeholder="Décrivez le profil recherché, les compétences, l'expérience, les qualités..."
              />
            </div>

            {/* Informations complémentaires */}
            <div className="space-y-4 mt-8">
              <div className="text-lg font-semibold text-red-600 mb-2">
                Informations complémentaires
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-blue-600">
                    Date de début souhaitée
                  </Label>
                  <Input
                    type="date"
                    value={jobOffer.startDate || ""}
                    onChange={(e) =>
                      handleInputChange("startDate", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-blue-600">
                    Date limite de candidature (si applicable)
                  </Label>
                  <Input
                    type="date"
                    value={jobOffer.deadline || ""}
                    onChange={(e) =>
                      handleInputChange("deadline", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-blue-600">Lieu de travail</Label>
                  <Input
                    type="text"
                    placeholder="Ex: Télétravail, sur site, hybride..."
                    value={jobOffer.workplace || ""}
                    onChange={(e) =>
                      handleInputChange("workplace", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>

            {/* Additional Content Sections */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-semibold text-blue-600">
                    Sections additionnelles
                  </Label>
                  <p className="text-sm text-gray-600">
                    Ajoutez des sections pour structurer votre contenu
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addArrayItem("paragraphs")}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Ajouter une section
                </Button>
              </div>

              {jobOffer.paragraphs?.map((paragraph, index) => (
                <div key={index} className="space-y-3 mt-6">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder={`Titre de la section ${index + 1}`}
                      value={jobOffer.paragraphTitles?.[index] || ""}
                      onChange={(e) =>
                        handleArrayChange(
                          "paragraphTitles",
                          index,
                          e.target.value
                        )
                      }
                      className="mb-2 flex-1"
                    />
                    {jobOffer.paragraphs && jobOffer.paragraphs.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => {
                          removeArrayItem("paragraphs", index);
                          removeArrayItem("paragraphTitles", index);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <RichTextEditor
                    content={paragraph}
                    onChange={(content) =>
                      handleArrayChange("paragraphs", index, content)
                    }
                    placeholder="Ajoutez le contenu de la section..."
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle>
              <span className="text-blue-600">Images et bannières</span>
            </CardTitle>
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
                      className="w-full h-24 object-cover rounded-lg border"
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

        {/* Full Template Preview Modal */}
        <JobTemplatePreviewModal
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          jobOffer={jobOffer}
        />
      </div>
    </DashboardLayout>
  );
}
