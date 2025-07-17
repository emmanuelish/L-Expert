import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Euro, Clock } from "lucide-react";

interface JobCardProps {
  slug: string;
  title: string;
  company: string;
  location: string;
  contractType: string;
  salary?: string;
  postedDate: string;
  imageUrl?: string;
  companyLogoUrl?: string;
  isRemotePartial?: boolean;
  isAnonymous?: boolean;
}

export function JobCard({
  slug,
  title,
  company,
  location,
  contractType,
  salary,
  postedDate,
  isRemotePartial,
  isAnonymous,
}: JobCardProps) {
  return (
    <Card className="w-full overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-0 flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="relative w-full md:w-48 h-48 md:h-auto flex-shrink-0">
          <Image
            src={"/images/hiring.jpg"}
            alt={title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">
                {title}
              </h2>
              <Button variant="ghost" size="icon" className="flex-shrink-0">
                <Heart className="h-5 w-5 text-gray-400 hover:text-red-500" />
              </Button>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              {isAnonymous
                ? "Cette entreprise souhaite rester anonyme"
                : company}
            </p>

            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700 mb-3">
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>{location}</span>
              </div>
              <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                {contractType}
              </Badge>
              {salary && (
                <div className="flex items-center space-x-1">
                  <Euro className="h-4 w-4 text-gray-500" />
                  <span>{salary}</span>
                </div>
              )}
              {isRemotePartial && (
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-700"
                >
                  Télétravail partiel
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500 mt-4 md:mt-0">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{postedDate}</span>
            </div>
            <Link href={`/jobs/${slug}`}>
              <Button className="bg-transparent text-black hover:bg-black hover:text-white px-6 py-2 rounded-full border border-black">
                Voir l&apos;offre
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
