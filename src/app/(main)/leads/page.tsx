"use client";

import * as React from "react";
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { columns } from "./components/columns";
import { LeadsDataTable } from "./components/data-table";
import { Lead } from "@/lib/data";

type LeadsPageResponse = {
  leads: Lead[];
  nextPage: number | null;
};

async function fetchLeads({
  pageParam = 0,
}): Promise<{ leads: Lead[]; nextPage: number | null }> {
  const res = await fetch(`/api/leads?page=${pageParam}&limit=20`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

//not required. just to show an example
async function updateLeadStatus({
  leadId,
  newStatus,
}: {
  leadId: string | number;
  newStatus: string;
}) {
  const res = await fetch(`/api/leads/${leadId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: newStatus }),
  });
  if (!res.ok) throw new Error("Failed to update lead");
  return res.json();
}

/**
 * LeadsPage component displays the Leads Dashboard with infinite scrolling and status update functionality.
 *
 * - Fetches leads data using `useInfiniteQuery` for paginated loading.
 * - Allows optimistic updates of lead status using `useMutation` and query cache manipulation.
 * - Handles error rollback and query invalidation for data consistency.
 * - Renders a `LeadsDataTable` with controls for loading more leads and updating lead status.
 *
 * @returns {JSX.Element} The rendered Leads Dashboard page.
 */
export default function LeadsPage() {
  const queryClient = useQueryClient();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["leads"],
      queryFn: fetchLeads,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  const updateLeadStatusMutation = useMutation({
    mutationFn: updateLeadStatus,
    onMutate: async ({ leadId, newStatus }) => {
      await queryClient.cancelQueries({ queryKey: ["leads"] });

      const prevData = queryClient.getQueryData(["leads"]);

      queryClient.setQueryData<InfiniteData<LeadsPageResponse>>(
        ["leads"],
        (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              leads: page.leads.map((lead) =>
                lead.id === leadId
                  ? { ...lead, status: newStatus as Lead["status"] }
                  : lead
              ),
            })),
          };
        }
      );

      return { prevData };
    },
    onError: (_err, _variables, context) => {
      if (context?.prevData) {
        queryClient.setQueryData(["leads"], context.prevData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });

  const leads = data?.pages.flatMap((page) => page.leads) ?? [];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-6">Leads Dashboard</h1>
      <LeadsDataTable
        columns={columns}
        data={leads}
        isLoading={isLoading}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onUpdateStatus={(leadId, newStatus) =>
          updateLeadStatusMutation.mutate({ leadId, newStatus })
        }
      />
    </div>
  );
}
