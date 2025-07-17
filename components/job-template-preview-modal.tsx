"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ExternalLink } from "lucide-react";
import { JobListingHeader } from "./job-listing/header";
import { HeroBanner } from "./job-listing/hero-banner";
import { JobHeader } from "./job-listing/job-header";
import { JobSection } from "./job-listing/job-section";
import { CompanySection } from "./job-listing/company-section";
import { StickyApplicationCard } from "./job-listing/sticky-application-card";
import { RelatedJobs } from "./job-listing/related-jobs";
import { JobListingFooter } from "./job-listing/footer";
import type { JobOffer } from "@/lib/schemas";

interface JobTemplatePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobOffer: Partial<JobOffer>;
}

// Mock related jobs for preview
const mockRelatedJobs = [
  {
    id: "1",
    title: "Assistant Commercial H/F",
    company: "ABC Services",
    location: "Metz - 57",
    contractType: "CDI",
    postedDate: "il y a 1 jour",
    isUrgent: true,
  },
  {
    id: "2",
    title: "Secrétaire Administratif H/F",
    company: "XYZ Conseil",
    location: "Nancy - 54",
    contractType: "CDD",
    postedDate: "il y a 3 jours",
  },
  {
    id: "3",
    title: "Chargé de Clientèle H/F",
    company: "Services Plus",
    location: "Strasbourg - 67",
    contractType: "CDI",
    postedDate: "il y a 5 jours",
  },
];

export function JobTemplatePreviewModal({
  isOpen,
  onClose,
  jobOffer,
}: JobTemplatePreviewModalProps) {
  const formatDate = () => {
    return `il y a ${Math.floor(Math.random() * 5) + 1} jour${
      Math.random() > 0.5 ? "s" : ""
    }`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden p-0">
        {/* Modal Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <DialogTitle className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            Aperçu de l&apos;offre d&apos;emploi
          </DialogTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                sessionStorage.setItem(
                  "previewJobData",
                  JSON.stringify(jobOffer)
                );
                window.open(
                  "/admin/dashboard/jobs/preview",
                  "_blank",
                  "width=1200,height=800"
                );
              }}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Ouvrir dans un nouvel onglet
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(95vh-80px)]">
          <div className="min-h-screen bg-white">
            <JobListingHeader />

            <HeroBanner
              bannerImage={jobOffer.bannerImage || "/images/job-banner.jpg"}
              companyLogo="/placeholder.svg?height=60&width=120"
              companyName={jobOffer.company || "Votre Entreprise"}
            />

            <div className="max-w-4xl mx-auto px-6 py-8 relative">
              <div className="flex gap-8">
                {/* Main Content */}
                <div className="flex-1">
                  <JobHeader
                    title={jobOffer.title || "Titre du poste"}
                    company={jobOffer.company || "Nom de l'entreprise"}
                    location={jobOffer.location || "Localisation"}
                    salary={jobOffer.salary}
                    contractType={jobOffer.type || "CDI"}
                    postedDate={formatDate()}
                    isUrgent={Math.random() > 0.7} // Random urgent flag for preview
                  />

                  {/* Introduction Section */}
                  {jobOffer.introduction && (
                    <JobSection
                      title="Introduction / Présentation"
                      content={jobOffer.introduction}
                    />
                  )}

                  {/* Missions Section */}
                  {jobOffer.missions && (
                    <JobSection
                      title="Missions du poste"
                      content={jobOffer.missions}
                    />
                  )}

                  {/* Profile Section */}
                  {jobOffer.profile && (
                    <JobSection
                      title="Profil recherché"
                      content={jobOffer.profile}
                    />
                  )}

                  {/* Additional Information Section */}
                  {(jobOffer.startDate ||
                    jobOffer.deadline ||
                    jobOffer.workplace) && (
                    <JobSection
                      title="Informations complémentaires"
                      content={`
                        ${
                          jobOffer.startDate
                            ? `<p><u>Date de début souhaitée</u> : <strong>${new Date(
                                jobOffer.startDate
                              ).toLocaleDateString("fr-FR", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}</strong></p>`
                            : ""
                        }
                        ${
                          jobOffer.deadline
                            ? `<p><u>Date limite de candidature</u> : <strong>${
                                jobOffer.deadline
                                  ? new Date(
                                      jobOffer.deadline
                                    ).toLocaleDateString("fr-FR", {
                                      weekday: "long",
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    })
                                  : ""
                              }</strong></p>`
                            : ""
                        }
                        ${
                          jobOffer.workplace
                            ? `<p><u>Lieu de travail</u> : <strong>${jobOffer.workplace}</strong></p>`
                            : ""
                        }
                      `.trim()}
                    />
                  )}

                  {/* Additional Paragraphs */}
                  {jobOffer.paragraphs &&
                    jobOffer.paragraphs
                      .filter((p) => p.trim())
                      .map((paragraph, index) => (
                        <JobSection
                          key={index}
                          title={
                            jobOffer.paragraphTitles?.[index] ||
                            `Section ${index + 1}`
                          }
                          content={paragraph}
                          collapsible={index > 0}
                        />
                      ))}

                  {/* Requirements */}
                  {jobOffer.requirements &&
                    jobOffer.requirements.filter((r) => r.trim()).length >
                      0 && (
                      <JobSection
                        title="Le profil recherché"
                        content={jobOffer.requirements.filter((r) => r.trim())}
                      />
                    )}

                  {/* Benefits */}
                  {jobOffer.benefits &&
                    jobOffer.benefits.filter((b) => b.trim()).length > 0 && (
                      <JobSection
                        title="Ce que nous offrons"
                        content={jobOffer.benefits.filter((b) => b.trim())}
                      />
                    )}

                  {/* Bullet Points */}
                  {jobOffer.bulletPoints &&
                    jobOffer.bulletPoints.filter((b) => b.trim()).length >
                      0 && (
                      <JobSection
                        title="Points clés"
                        content={jobOffer.bulletPoints.filter((b) => b.trim())}
                      />
                    )}

                  {/* Company Section */}
                  <CompanySection
                    companyName={jobOffer.company || "Votre Entreprise"}
                    description={
                      jobOffer.subtitle ||
                      "Description de l'entreprise à venir..."
                    }
                    images={
                      jobOffer.images || [
                        "/placeholder.svg?height=200&width=300",
                        "/placeholder.svg?height=200&width=300",
                        "/placeholder.svg?height=200&width=300",
                      ]
                    }
                  />
                </div>

                {/* Sticky Application Card */}
                <div className="hidden lg:block w-64 flex-shrink-0">
                  <StickyApplicationCard />
                </div>
              </div>
            </div>

            <RelatedJobs jobs={mockRelatedJobs} />

            <JobListingFooter />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
