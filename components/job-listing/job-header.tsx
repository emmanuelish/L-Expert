"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building, Euro, Calendar, Heart } from "lucide-react";

interface JobHeaderProps {
  title: string;
  company: string;
  location: string;
  salary?: string;
  contractType: string;
  postedDate: string;
  isUrgent?: boolean;
}

export function JobHeader({
  title,
  company,
  location,
  salary,
  contractType,
  postedDate,
  isUrgent = false,
}: JobHeaderProps) {
  const handleSave = () => {
    // Handle saving job to favorites
    console.log("Job saved to favorites");
  };

  return (
    <div className="bg-white border-b border-gray-200 py-8">
      <div className="flex items-center space-x-2 mb-2">
        {isUrgent && (
          <Badge className="bg-orange-100 text-orange-800 text-xs">
            URGENT
          </Badge>
        )}
        <Button variant="ghost" size="sm" className="p-1" onClick={handleSave}>
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-4">{title}</h1>

      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
        <div className="flex items-center space-x-1">
          <Building className="h-4 w-4" />
          <span>{company}</span>
        </div>
        <div className="flex items-center space-x-1">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>
        {salary && (
          <div className="flex items-center space-x-1">
            <Euro className="h-4 w-4" />
            <span>{salary}</span>
          </div>
        )}
        <div className="flex items-center space-x-1">
          <Calendar className="h-4 w-4" />
          <span>{contractType}</span>
        </div>
      </div>

      <p className="text-sm text-gray-500">Publié le {postedDate}</p>
    </div>
  );
}
