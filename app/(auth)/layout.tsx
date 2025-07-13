import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-4">
            <span className="text-2xl font-bold text-purple-800">L</span>
          </div>
        </div>

        {/* Auth Form Container */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
          {children}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            © 2024 L&apos;Expert Pro. Tous droits réservés.
          </p>
        </div>
      </div>
    </div>
  );
}
