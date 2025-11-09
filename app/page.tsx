"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Item = { ID: string; Image: string; Names: string; Status: string; Ports?: string };

export default function Dashboard() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/containers", { cache: "no-store" });
    const j = await res.json();
    setItems(j.items || []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const remove = async (name: string) => {
    if (!confirm(`Remove container ${name}?`)) return;
    await fetch("/api/remove", { method: "POST", body: JSON.stringify({ app: name }) });
    await load();
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card className="sm:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle>Containers {loading && <span className="ml-2 text-xs text-white/50">(refreshing)</span>}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between pb-3">
            <div className="text-sm text-white/60">Listing running Docker workloads on the deploy host.</div>
            <Button onClick={load}>Refresh</Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((c) => (
              <Card key={c.ID}>
                <CardHeader>
                  <CardTitle className="truncate">{c.Names}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-white/70">Image</div>
                  <div className="truncate text-sm">{c.Image}</div>
                  <div className="mt-2 text-xs text-white/70">Status</div>
                  <div className="text-sm">{c.Status}</div>
                  {c.Ports && (
                    <>
                      <div className="mt-2 text-xs text-white/70">Ports</div>
                      <div className="text-sm">{c.Ports}</div>
                    </>
                  )}
                  <div className="mt-4 flex gap-2">
                    <Button className="bg-red-600 hover:bg-red-500" onClick={() => remove(c.Names)}>Remove</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {!items.length && <div className="p-6 text-sm text-white/60">No containers running.</div>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}