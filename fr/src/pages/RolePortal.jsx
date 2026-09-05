import { ArrowLeft, Bell, BriefcaseBusiness, Building2, CalendarDays, GraduationCap, School, Users } from "lucide-react";
import LiveTechNews from "../components/LiveTechNews";
import logo from "../assets/logo.png";
import SpiralParticles from "../components/SpiralParticles";

const portalContent = {
  student: { title: "Student portal", greeting: "Shape your next opportunity.", icon: GraduationCap, stats: [["72%", "Profile strength"], ["08", "Recommended roles"], ["03", "Skills to build"]], actions: ["Complete your skill profile", "Explore internships", "View learning recommendations"] },
  academician: { title: "Faculty portal", greeting: "Turn expertise into collaboration.", icon: Users, stats: [["05", "Collaboration matches"], ["12", "Industry programs"], ["03", "Research opportunities"]], actions: ["Update professional profile", "Discover industry projects", "Explore research partnerships"] },
  industry: { title: "Industry portal", greeting: "Meet capability with opportunity.", icon: Building2, stats: [["24", "Potential candidates"], ["06", "Active opportunities"], ["09", "Institution connections"]], actions: ["Post an opportunity", "Browse talent matches", "Plan a collaboration"] },
  institution: { title: "Institution portal", greeting: "Make institutional progress visible.", icon: School, stats: [["84%", "Placement readiness"], ["16", "Industry partners"], ["07", "Active programs"]], actions: ["View skill analytics", "Manage industry partners", "Review placement readiness"] },
};

export default function RolePortal({ role, onBack }) {
  const content = portalContent[role];
  const Icon = content.icon;
  return <main className="min-h-screen bg-[#f5f8ff] text-slate-900">
    <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur">
    <div className="mx-auto flex max-w-[90rem] items-center justify-between px-5 py-4 md:px-8">
      <button type="button" onClick={onBack} className="flex items-center gap-3 text-left">
        <span className="flex h-11 w-10 items-center justify-center rounded-xl bg-sky-50 p-1.5">
          <img src={logo} alt="The Matrixx" className="max-h-full" /></span>
          <span><span className="block text-sm font-bold tracking-[.1em]">THE MATRIXX</span>
          <span className="block text-[10px] uppercase tracking-[.22em] text-slate-400">{content.title}</span>
          </span></button><div className="flex items-center gap-4">
            <button className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500">
              <Bell size={18} /></button><span className="hidden text-sm text-slate-500 sm:block">Welcome back</span><span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 text-sm font-bold text-white">TM</span></div></div>
              </header><div className="mx-auto max-w-[90rem] px-5 py-10 md:px-8">
                
                <section className="rounded-[2rem] bg-gradient-to-br from-sky-600 via-indigo-600 to-violet-700 p-8 text-white shadow-xl shadow-indigo-200 sm:p-10">
                <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start"><div><span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium"><Icon size={14} /> {content.title}</span>
              <SpiralParticles className="relative  opacity-90"/>
                <h1 className="mt-5 text-4xl font-semibold tracking-[-.045em] sm:text-5xl">{content.greeting}</h1><p className="mt-4 max-w-xl text-sm leading-7 text-indigo-100">Your personalized Matrixx workspace brings the most relevant people, programs and progress into one place.</p></div><CalendarDays className="opacity-60" size={32} /></div></section><LiveTechNews /><section className="mt-6 grid gap-4 sm:grid-cols-3">{content.stats.map(([value, label]) => <div key={label} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><p className="text-3xl font-semibold tracking-tight">{value}</p><p className="mt-2 text-sm text-slate-500">{label}</p></div>)}</section><section className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_.8fr]"><div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"><div className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-sky-600">Suggested next steps</p><h2 className="mt-2 text-2xl font-semibold">Keep your momentum going.</h2></div><BriefcaseBusiness className="text-sky-500" /></div><div className="mt-6 space-y-3">{content.actions.map((action, index) => <button key={action} className="flex w-full items-center justify-between rounded-2xl bg-slate-50 px-4 py-4 text-left text-sm font-medium text-slate-700 transition hover:bg-sky-50 hover:text-sky-700"><span><span className="mr-3 text-sky-600">0{index + 1}</span>{action}</span><span>→</span></button>)}</div></div><aside className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"><p className="text-xs font-semibold uppercase tracking-[.18em] text-sky-600">Activity</p><h2 className="mt-2 text-2xl font-semibold">Stay connected.</h2><p className="mt-4 text-sm leading-7 text-slate-500">New opportunities and collaboration updates will appear here as your network grows.</p><button type="button" onClick={onBack} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-sky-700"><ArrowLeft size={16} /> Sign out</button></aside></section></div></main>;
}
