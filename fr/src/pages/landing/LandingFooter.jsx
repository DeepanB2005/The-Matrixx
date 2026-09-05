import { CircleDot } from "lucide-react";

export default function LandingFooter() {
  return <footer className="border-t border-violet-200/70 bg-gradient-to-r from-slate-50 via-cyan-50/70 to-violet-50/70"><div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8"><div><p className="text-sm font-semibold text-slate-900/85">The Matrixx — Academia × Industry Collaboration Portal</p>
  <p className="mt-1 text-xs text-slate-900/32">Skill mapping • Internships • Learning • Placements • Collaboration</p>
  </div>
  <div className="flex items-center gap-2 text-xs text-slate-900/30">
  <CircleDot size={13} className="text-sky-600" />Prototype landing experience</div></div></footer>;
}
