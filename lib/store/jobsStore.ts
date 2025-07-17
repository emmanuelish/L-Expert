import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getAllJobOffers } from "@/services/firebaseClientServices";
import type { JobOffer } from "@/lib/schemas";

interface JobsStoreState {
  jobs: JobOffer[];
  loading: boolean;
  error: string | null;
  fetchJobs: () => Promise<void>;
  clearJobs: () => void;
}

export const useJobsStore = create<JobsStoreState>()(
  persist(
    (set) => ({
      jobs: [],
      loading: false,
      error: null,
      fetchJobs: async () => {
        set({ loading: true, error: null });
        try {
          const jobs = await getAllJobOffers();
          set({ jobs, loading: false });
        } catch (error: unknown) {
          let errorMessage = "Failed to fetch jobs";

          if (error instanceof Error) {
            errorMessage = error.message;
          }

          set({
            error: errorMessage,
            loading: false,
          });
        }
      },
      clearJobs: () => set({ jobs: [] }),
    }),
    {
      name: "jobs-store", // key in localStorage
      partialize: (state) => ({ jobs: state.jobs }), // only persist jobs
    }
  )
);
