import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400 flex items-center justify-center p-4">
      <div className="text-center space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            L&apos;Expert Authentication
          </h1>
          <p className="text-lg text-gray-700">
            Authentication pages with a modern user interface
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/login">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
              Se connecter
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button
              variant="outline"
              className="border-white text-gray-800 hover:bg-white/20 px-8 py-3 bg-transparent"
            >
              Créer un compte
            </Button>
          </Link>
          <Link href="/auth/forgot-password">
            <Button
              variant="ghost"
              className="text-gray-700 hover:bg-white/20 px-8 py-3"
            >
              Mot de passe oublié
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
