import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Auth Form Container */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
          {children}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} L&apos;Expert. Tous droits réservés.
          </p>
        </div>
      </div>
    </div>
  );
}
