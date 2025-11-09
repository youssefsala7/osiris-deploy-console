 import * as React from "react"; import { cn } from "@/lib/utils"
 export function Card(props: React.HTMLAttributes<HTMLDivElement>) {
   return <div {...props} className={cn("rounded-xl border border-zinc-200 bg-white/70 backdrop-blur p-6 shadow-sm", props.className)}/>
 }
 export const CardHeader = (p: React.HTMLAttributes<HTMLDivElement>) => <div {...p} className={cn("mb-2", p.className)}/>
 export const CardTitle  = (p: React.HTMLAttributes<HTMLHeadingElement>) => <h3 {...p} className={cn("text-lg font-semibold", p.className)}/>
 export const CardContent= (p: React.HTMLAttributes<HTMLDivElement>) => <div {...p} className={cn("mt-2 space-y-3", p.className)}/>
