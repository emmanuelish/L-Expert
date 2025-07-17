"use client";

import { useEffect, useState } from "react";
import { JobListingHeader } from "@/components/job-listing/header";
import { HeroBanner } from "@/components/job-listing/hero-banner";
import { JobHeader } from "@/components/job-listing/job-header";
import { JobSection } from "@/components/job-listing/job-section";
import { CompanySection } from "@/components/job-listing/company-section";
import { StickyApplicationCard } from "@/components/job-listing/sticky-application-card";
import { RelatedJobs } from "@/components/job-listing/related-jobs";
import { JobListingFooter } from "@/components/job-listing/footer";
import type { JobOffer } from "@/lib/schemas";

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

export default function JobPreviewPage() {
  const [jobData, setJobData] = useState<Partial<JobOffer> | null>(null);

  useEffect(() => {
    // Get job data from sessionStorage
    const storedData = sessionStorage.getItem("previewJobData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setJobData(parsedData);
      } catch (error) {
        console.error("Error parsing preview data:", error);
      }
    }
  }, []);

  if (!jobData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Chargement de l&apos;aperçu...
          </h1>
          <p className="text-gray-600">
            Veuillez patienter pendant le chargement de votre offre
            d&apos;emploi.
          </p>
        </div>
      </div>
    );
  }

  // Format date for display
  const formatDate = () => {
    return `il y a ${Math.floor(Math.random() * 5) + 1} jour${
      Math.random() > 0.5 ? "s" : ""
    }`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Preview Banner */}
      <div className="bg-yellow-100 border-b border-yellow-200 py-2">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-yellow-800">
            <strong>Mode Aperçu</strong> - Voici comment votre offre
            d&apos;emploi apparaîtra aux candidats
          </p>
        </div>
      </div>

      <JobListingHeader />

      <HeroBanner
        bannerImage={jobData.bannerImage || "/images/job-banner.jpg"}
        companyName={jobData.company || "Votre Entreprise"}
      />

      <div className="max-w-4xl mx-auto px-6 py-8 relative">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <JobHeader
              title={jobData.title || "Titre du poste"}
              company={jobData.company || "Nom de l'entreprise"}
              location={jobData.location || "Localisation"}
              salary={jobData.salary}
              contractType={jobData.type || "CDI"}
              postedDate={formatDate()}
              isUrgent={Math.random() > 0.7} // Random urgent flag for preview
            />
            {/* Introduction Section */}
            {jobData.introduction && (
              <JobSection
                title="Introduction / Présentation"
                content={jobData.introduction}
              />
            )}

            {/* Missions Section */}
            {jobData.missions && (
              <JobSection
                title="Missions du poste"
                content={jobData.missions}
              />
            )}

            {/* Profile Section */}
            {jobData.profile && (
              <JobSection title="Profil recherché" content={jobData.profile} />
            )}

            {/* Additional Information Section */}
            {(jobData.startDate || jobData.deadline || jobData.workplace) && (
              <JobSection
                title="Informations complémentaires"
                content={`
                  ${
                    jobData.startDate
                      ? `<p><u>Date de début souhaitée</u> : <strong>${new Date(
                          jobData.startDate
                        ).toLocaleDateString("fr-FR", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}</strong></p>`
                      : ""
                  }
                  ${
                    jobData.deadline
                      ? `<p><u>Date limite de candidature</u> : <strong>${
                          jobData.deadline
                            ? new Date(jobData.deadline).toLocaleDateString(
                                "fr-FR",
                                {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )
                            : ""
                        }</strong></p>`
                      : ""
                  }
                  ${
                    jobData.workplace
                      ? `<p><u>Lieu de travail</u> : <strong>${jobData.workplace}</strong></p>`
                      : ""
                  }
                `.trim()}
              />
            )}

            {/* Additional Paragraphs */}
            {jobData.paragraphs &&
              jobData.paragraphs
                .filter((p) => p.trim())
                .map((paragraph, index) => (
                  <JobSection
                    key={index}
                    title={
                      jobData.paragraphTitles?.[index] || `Section ${index + 1}`
                    }
                    content={paragraph}
                    collapsible={index > 0}
                  />
                ))}

            {/* Requirements */}
            {jobData.requirements &&
              jobData.requirements.filter((r) => r.trim()).length > 0 && (
                <JobSection
                  title="Le profil recherché"
                  content={jobData.requirements.filter((r) => r.trim())}
                />
              )}

            {/* Benefits */}
            {jobData.benefits &&
              jobData.benefits.filter((b) => b.trim()).length > 0 && (
                <JobSection
                  title="Ce que nous offrons"
                  content={jobData.benefits.filter((b) => b.trim())}
                />
              )}

            {/* Bullet Points */}
            {jobData.bulletPoints &&
              jobData.bulletPoints.filter((b) => b.trim()).length > 0 && (
                <JobSection
                  title="Points clés"
                  content={jobData.bulletPoints.filter((b) => b.trim())}
                />
              )}

            {/* Company Section */}
            <CompanySection
              companyName={jobData.company || "Votre Entreprise"}
              description={
                jobData.subtitle || "Description de l'entreprise à venir..."
              }
              images={
                jobData.images || [
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
  );
}
