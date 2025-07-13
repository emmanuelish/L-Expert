import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuth, isFetching, user } = useAuth();
  const router = useRouter();

  if (isFetching) {
    return <div className="text-center py-10">Chargement...</div>;
  }

  if (!isAuth || user?.role !== "admin") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Accès refusé
          </h2>
          <p className="mb-6 text-gray-600">
            Vous n&apos;êtes pas autorisé à accéder à cette page.
          </p>
          <Button onClick={() => router.push("/")}>
            Retour à l&apos;accueil
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
