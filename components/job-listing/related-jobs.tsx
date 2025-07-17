"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Building, Clock } from "lucide-react";

interface RelatedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  contractType: string;
  postedDate: string;
  isUrgent?: boolean;
}

interface RelatedJobsProps {
  jobs: RelatedJob[];
}

export function RelatedJobs({ jobs }: RelatedJobsProps) {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Ces offres pourraient aussi vous intéresser
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {jobs.map((job) => (
            <Card
              key={job.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
            >
              <CardContent className="p-6">
                {job.isUrgent && (
                  <div className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded mb-3 inline-block">
                    URGENT
                  </div>
                )}

                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {job.title}
                </h3>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <Building className="h-3 w-3" />
                    <span>{job.company}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{job.contractType}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {job.postedDate}
                  </span>
                  <Button size="sm" variant="outline">
                    Voir l&apos;offre
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            className="bg-black text-white hover:bg-gray-800"
          >
            Voir plus d&apos;offres
          </Button>
        </div>
      </div>
    </div>
  );
}
