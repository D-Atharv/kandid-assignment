"use client";
import * as React from "react";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Campaign } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { columns } from "./components/columns";
import { CampaignsDataTable } from "./components/data-table";
import { Plus } from "lucide-react";

type PageResp = { campaigns: Campaign[]; nextPage: number | null };

type CampaignFilter = "all" | "active" | "inactive";

async function fetchCampaigns({ pageParam = 0 }): Promise<PageResp> {
  const res = await fetch(`/api/campaigns?page=${pageParam}&limit=20`);
  if (!res.ok) throw new Error("Failed to fetch campaigns");
  return res.json();
}

//to show. not required for now
async function updateCampaignStatus({
  id,
  status,
}: {
  id: string;
  status: "Active" | "Inactive";
}) {
  const res = await fetch(`/api/campaigns/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Failed to update");
  return res.json();
}

export default function CampaignsPage() {
  const qc = useQueryClient();
  const [filter, setFilter] = React.useState<CampaignFilter>("all");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["campaigns"],
      queryFn: fetchCampaigns,
      getNextPageParam: (last) => last.nextPage,
      initialPageParam: 0,
    });

  const mutate = useMutation({
    mutationFn: updateCampaignStatus,
    onMutate: async ({ id, status }) => {
      await qc.cancelQueries({ queryKey: ["campaigns"] });
      const prev = qc.getQueryData<{
        pages: PageResp[];
        pageParams: unknown[];
      }>(["campaigns"]);
      qc.setQueryData<{ pages: PageResp[]; pageParams: unknown[] }>(
        ["campaigns"],
        (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((p: PageResp) => ({
              ...p,
              campaigns: p.campaigns.map((c: Campaign) =>
                c.id === id ? { ...c, status } : c
              ),
            })),
          };
        }
      );
      return { prev };
    },
    onError: (_err, _vars, ctx: { prev?: unknown } | undefined) => {
      if (ctx?.prev) qc.setQueryData(["campaigns"], ctx.prev);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["campaigns"] });
    },
  });

  let campaigns = data?.pages.flatMap((p) => p.campaigns) ?? [];

  // 🔍 Filtering + search
  if (filter !== "all") {
    campaigns = campaigns.filter(
      (c) => c.status.toLowerCase() === filter.toLowerCase()
    );
  }

  return (
    <div className="container mx-auto py-10 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Campaigns</h1>
            <p className="text-sm text-muted-foreground">
              Manage your campaigns and track their performance.
            </p>
          </div>

          <div className="flex items-center justify-end">
            <Button onClick={() => alert("Create campaign flow")}>
              <Plus className="h-4 w-4 mr-2" />
              Create Campaign
            </Button>
          </div>
        </div>

        <Tabs
          defaultValue="all"
          onValueChange={(v) => setFilter(v as CampaignFilter)}
        >
          <TabsList>
            <TabsTrigger value="all">All Campaigns</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Table */}
      <CampaignsDataTable
        columns={columns}
        data={campaigns}
        isLoading={isLoading}
        fetchNextPage={fetchNextPage}
        hasNextPage={!!hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onUpdateStatus={(id, newStatus) =>
          mutate.mutate({ id, status: newStatus })
        }
      />
    </div>
  );
}
