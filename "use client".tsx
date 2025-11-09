 "use client"
 export default function MeshBackground() {
   return (
     <div className="pointer-events-none absolute inset-0 -z-10 blur-3xl"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(120,60,255,0.18), transparent 55%), radial-gradient(circle at 80% 70%, rgba(0,180,255,0.18), transparent 55%)"
          }} />
   )
 }
