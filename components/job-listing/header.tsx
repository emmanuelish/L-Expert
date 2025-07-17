"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export function JobListingHeader() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold">L&apos;Expert</div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/recherche-emploi"
              className="text-gray-700 hover:text-gray-900 text-sm"
            >
              Recherche emploi
            </Link>
            <Link
              href="/depot-cv"
              className="text-gray-700 hover:text-gray-900 text-sm"
            >
              Dépôt CV
            </Link>
            <Link
              href="/entreprises"
              className="text-gray-700 hover:text-gray-900 text-sm"
            >
              Entreprises
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4 mr-2" />
              Mon compte
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
