"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function NewApp() {
  const [app, setApp] = useState("");
  const [fqdn, setFqdn] = useState("");
  const [port, setPort] = useState<number | string>(80);
  const [image, setImage] = useState("nginx:alpine");
  const [log, setLog] = useState<string>("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLog("Deploying …");
    const res = await fetch("/api/deploy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ app, fqdn, port, image })
    });
    const j = await res.json();
    setLog([j.stdout, j.stderr].filter(Boolean).join("\n") || (j.ok ? "OK" : j.error || "Failed"));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Subdomain in 60 Seconds</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="app">App Name</Label>
            <Input id="app" value={app} onChange={(e) => setApp(e.target.value)} placeholder="myapp" required />
          </div>
          <div>
            <Label htmlFor="fqdn">Subdomain (FQDN)</Label>
            <Input id="fqdn" value={fqdn} onChange={(e) => setFqdn(e.target.value)} placeholder="myapp.theosirislabs.com" required />
          </div>
          <div>
            <Label htmlFor="port">Internal Port</Label>
            <Input id="port" type="number" value={port} onChange={(e) => setPort(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="image">Docker Image</Label>
            <Input id="image" value={image} onChange={(e) => setImage(e.target.value)} placeholder="nginx:alpine" required />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit">Deploy</Button>
          </div>
        </form>

        <pre className="mt-6 whitespace-pre-wrap rounded-lg border border-white/10 bg-black/30 p-3 text-xs text-white/80">
{log || "Output will appear here …"}
        </pre>
      </CardContent>
    </Card>
  );
}