import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  ExternalLink,
  Filter,
  MapPin,
  MessageSquare,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const companyMatches = [["technova-ai", 94, "bg-sky-500"], ["ZOHO SEI", 91, "bg-violet-500"], ["AGERA", 87, "bg-amber-500"], ["GROK", 82, "bg-emerald-500"], ["TCS", 78, "bg-cyan-500"]];

const internal = [
  { id: "technova-ai", title: "AI / ML Intern", company: "Microsoft", match: 94, type: "Internship", location: "Bengaluru - Hybrid", posted: "Posted 2 days ago", description: "Help build reliable, human-centred AI features with an engineering team working on intelligent cloud products.", why: "Your AI fundamentals and practical programming assessment align strongly with this role.", required: ["Python", "Machine learning", "Data structures"], matched: ["Python", "AI fundamentals"], gaps: ["PyTorch / TensorFlow"], applicants: "48 applicants" },
  { id: "google-data", title: "Data Science Intern", company: "Google", match: 91, type: "Internship", location: "Hyderabad - Hybrid", posted: "Posted today", description: "Work with product and engineering teams to turn data into insights that improve everyday user experiences.", why: "Your data foundations and problem-solving profile make this a high-potential next step.", required: ["Python", "SQL", "Statistics"], matched: ["Python", "Data analysis"], gaps: ["Advanced SQL"], applicants: "63 applicants" },
  { id: "amazon-ase", title: "Associate Software Engineer", company: "Amazon", match: 87, type: "Job", location: "Chennai - On-site", posted: "Posted 4 days ago", description: "Design and ship customer-focused services alongside experienced software engineers in a fast-moving team.", why: "Your core programming score and interest in software development closely match the role requirements.", required: ["Java / Python", "Algorithms", "REST APIs"], matched: ["Python", "Data structures"], gaps: ["REST API design"], applicants: "112 applicants" },
  { id: "deloitte-analyst", title: "Technology Analyst", company: "Deloitte", match: 82, type: "Job", location: "Mumbai - Hybrid", posted: "Posted 5 days ago", description: "Support digital transformation projects and learn to deliver technical solutions for global clients.", why: "Your technical foundations and career interests support this opportunity.", required: ["JavaScript", "SQL", "Problem solving"], matched: ["Problem solving", "Programming"], gaps: ["SQL"], applicants: "76 applicants" },
];

const external = [
  { id: "linkedin", title: "Early Career & Internship Roles", company: "LinkedIn Jobs", match: 92, type: "Internship", location: "India - Multiple locations", posted: "Updated daily", description: "Explore verified early-career opportunities selected from a broad network of employers.", why: "Search results can be filtered around your AI, data and software-development interests.", required: ["Profile", "Resume"], matched: ["Career interests"], gaps: ["Add recent projects"], url: "https://www.linkedin.com/jobs/" },
  { id: "microsoft-careers", title: "Students & Graduates", company: "Microsoft Careers", match: 94, type: "Job", location: "India - Multiple locations", posted: "Official careers site", description: "Browse current student, internship and graduate openings directly on Microsoft's careers site.", why: "Microsoft is your strongest company-profile match at 94%.", required: ["Resume", "Role-specific skills"], matched: ["AI foundations", "Programming"], gaps: ["Role-specific portfolio"], url: "https://jobs.careers.microsoft.com/global/en/search?l=India" },
  { id: "google-careers", title: "University Graduate Roles", company: "Google Careers", match: 91, type: "Job", location: "India - Multiple locations", posted: "Official careers site", description: "See Google's current opportunities for students and early-career candidates in India.", why: "Google ranks second in your company profile matching at 91%.", required: ["Resume", "Technical interview prep"], matched: ["Data foundations", "Problem solving"], gaps: ["Interview practice"], url: "https://www.google.com/about/careers/applications/jobs/results/?location=India" },
  { id: "amazon-careers", title: "Software Development Opportunities", company: "Amazon Jobs", match: 87, type: "Job", location: "India - Multiple locations", posted: "Official careers site", description: "Find active graduate and software-development roles on Amazon's official job portal.", why: "Your software-development path maps well to the technical role families listed here.", required: ["Programming", "Algorithms"], matched: ["Python", "Data structures"], gaps: ["System design basics"], url: "https://www.amazon.jobs/en/locations/india" },
];

const statusFlow = ["Applied", "Under Review", "Interview Scheduled", "Offer Stage"];

function OpportunityCard({ item, source, applied, onApply }) {
  return <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-sky-200 hover:shadow-md">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div className="flex gap-3"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sky-50 text-sky-700 ring-1 ring-sky-100"><Building2 size={20} /></span><div><div className="flex flex-wrap items-center gap-2"><h3 className="font-semibold text-slate-900">{item.title}</h3><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{item.type}</span>{applied && <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700"><CheckCircle2 size={13} />Applied</span>}</div><p className="mt-1 text-sm font-medium text-slate-600">{item.company}</p><div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500"><span className="inline-flex items-center gap-1"><MapPin size={13} />{item.location}</span><span className="inline-flex items-center gap-1"><Clock3 size={13} />{item.posted}</span></div></div></div><div className="shrink-0 rounded-xl bg-emerald-50 px-3 py-2 text-center"><p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700">Match</p><p className="text-xl font-bold text-emerald-700">{item.match}%</p></div></div>
    <p className="mt-4 text-sm leading-6 text-slate-600">{item.description}</p>
    <div className="mt-4 rounded-xl bg-slate-50 p-3"><p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-700"><Sparkles size={14} className="text-sky-600" />Why this matches you</p><p className="mt-1.5 text-sm leading-5 text-slate-600">{item.why}</p></div>
    <div className="mt-4 grid gap-3 text-sm md:grid-cols-3"><div><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Required skills</p><p className="mt-1.5 text-slate-700">{item.required.join(" - ")}</p></div><div><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Matched skills</p><p className="mt-1.5 text-emerald-700">{item.matched.join(" - ")}</p></div><div><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Skill gaps</p><p className="mt-1.5 text-amber-700">{item.gaps.join(" - ")}</p></div></div>
    <div className="mt-5 flex flex-col-reverse gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between"><span className="inline-flex items-center gap-1.5 text-xs text-slate-500">{source === "internal" ? <Users size={14} /> : <ExternalLink size={14} />}{source === "internal" ? item.applicants : "Opens the employer website"}</span><button type="button" onClick={() => onApply(item)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700">{source === "internal" ? applied ? "View in tracker" : "Apply in portal" : "View external role"}{source === "internal" ? <ChevronRight size={16} /> : <ArrowUpRight size={16} />}</button></div>
  </article>;
}

function ApplicationTracker({ applications, onAdvance }) {
  const records = Object.values(applications);

  return <div className="space-y-4">
    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-sky-600">Application tracking</p><h3 className="mt-1 text-lg font-semibold text-slate-900">Application status & interview calls</h3></div><span className="text-sm text-slate-500">{records.length} tracked application{records.length === 1 ? "" : "s"}</span></div>
    {records.length === 0 && <div className="rounded-2xl border border-dashed border-slate-300 py-12 text-center"><BriefcaseBusiness className="mx-auto text-slate-400" /><p className="mt-3 font-medium text-slate-700">No applications tracked yet</p><p className="mt-1 text-sm text-slate-500">Apply to a portal opportunity to start tracking status and interview calls.</p></div>}
    <div className="grid gap-4 xl:grid-cols-2">{records.map((item) => <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-start justify-between gap-4"><div><h4 className="font-semibold text-slate-900">{item.title}</h4><p className="mt-1 text-sm text-slate-600">{item.company}</p></div><span className="rounded-full bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700">{item.status}</span></div><div className="mt-4 grid gap-3 text-sm sm:grid-cols-2"><div className="rounded-xl bg-slate-50 p-3"><p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500"><CalendarDays size={14} />Applied on</p><p className="mt-1 font-medium text-slate-800">{item.appliedAt}</p></div><div className="rounded-xl bg-slate-50 p-3"><p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500"><MessageSquare size={14} />Interview call</p><p className="mt-1 font-medium text-slate-800">{item.interviewCall}</p></div></div><div className="mt-4"><div className="mb-2 flex justify-between text-xs text-slate-500"><span>Hiring progress</span><span>{statusFlow.indexOf(item.status) + 1}/{statusFlow.length}</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-emerald-500" style={{ width: `${((statusFlow.indexOf(item.status) + 1) / statusFlow.length) * 100}%` }} /></div></div><p className="mt-4 text-sm leading-6 text-slate-600">{item.nextStep}</p><button type="button" onClick={() => onAdvance(item.id)} className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-sky-200 hover:text-sky-700">Update status<ChevronRight size={16} /></button></article>)}</div>
  </div>;
}

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const JobsAndInternships = ({ profile, assessmentResult }) => {
  const [source, setSource] = useState("internal");
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [applications, setApplications] = useState({});
  const [generatedJobs, setGeneratedJobs] = useState(internal);
  const [generationStatus, setGenerationStatus] = useState("demo");
  const skills = useMemo(() => (profile?.skills || "").split(",").map((skill) => skill.trim()).filter(Boolean), [profile?.skills]);
  const profileKey = `${skills.join(",")}::${profile?.interest || ""}::${profile?.specialization || ""}::${profile?.preference || ""}::${assessmentResult?.score ?? ""}`;

  useEffect(() => {
    if (!skills.length || !profile?.interest) return undefined;
    let cancelled = false;
    const generateSequentially = async () => {
      let hadFailure = false;
      setGeneratedJobs(internal);
      setGenerationStatus("loading");
      for (let index = 0; index < internal.length; index += 1) {
        try {
          const response = await fetch(`${apiBaseUrl}/api/job-recommendations`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ skills, interest: profile.interest, specialization: profile.specialization, preference: profile.preference, assessment_score: assessmentResult?.score, index }),
          });
          if (!response.ok) throw new Error("Recommendation request failed");
          const job = await response.json();
          if (cancelled) return;
          setGeneratedJobs((current) => current.map((item, itemIndex) => itemIndex === index ? job : item));
        } catch {
          hadFailure = true;
          if (!cancelled) setGenerationStatus("partial");
        }
      }
      if (!cancelled) setGenerationStatus(hadFailure ? "partial" : "complete");
    };
    generateSequentially();
    return () => { cancelled = true; };
  }, [profileKey]);

  const opportunities = source === "internal" ? generatedJobs : external;
  const roles = useMemo(() => opportunities.filter((item) => (filter === "All" || item.type === filter) && `${item.title} ${item.company} ${item.location}`.toLowerCase().includes(query.toLowerCase())), [opportunities, filter, query]);
  const selectSource = (next) => { setSource(next); setFilter("All"); };
  const onApply = (item) => {
    if (source === "external") {
      window.open(item.url, "_blank", "noopener,noreferrer");
      return;
    }
    setApplications((current) => current[item.id] ? current : {
      ...current,
      [item.id]: {
        id: item.id,
        title: item.title,
        company: item.company,
        status: "Applied",
        appliedAt: new Date().toLocaleDateString(),
        interviewCall: "Awaiting recruiter update",
        nextStep: "Application received in the portal. Track shortlist updates and interview calls from here.",
      },
    });
    setSource("tracking");
  };
  const advanceApplication = (id) => setApplications((current) => {
    const item = current[id];
    if (!item) return current;
    const nextStatus = statusFlow[Math.min(statusFlow.indexOf(item.status) + 1, statusFlow.length - 1)];
    const interviewCall = nextStatus === "Interview Scheduled" ? "Interview call received - schedule confirmation pending" : nextStatus === "Offer Stage" ? "Final HR discussion pending" : item.interviewCall;
    return { ...current, [id]: { ...item, status: nextStatus, interviewCall, nextStep: nextStatus === item.status ? "You are already at the latest tracked stage." : `Status moved to ${nextStatus}. Keep checking recruiter updates and next action items.` } };
  });

  return <div className="mt-2 space-y-6">
    <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end"><div><div className="flex items-center gap-2 text-sky-600"><Sparkles size={18} /><p className="text-xs font-semibold uppercase tracking-[.18em]">AI opportunity matching</p></div><h2 className="mt-2 text-2xl font-semibold text-slate-900">Jobs & internship recommendations</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Discover roles matched to your profile, assessment results and career interests.</p>{source === "internal" && <p className={`mt-2 text-xs font-medium ${generationStatus === "partial" ? "text-amber-700" : "text-sky-700"}`}>{generationStatus === "loading" ? "Demo roles are being replaced with personalized AI recommendations, one at a time..." : generationStatus === "complete" ? "Personalized recommendations are ready." : generationStatus === "partial" ? "Some demo roles remain because a recommendation request failed." : "Complete your skills and area of interest to personalize these demo roles."}</p>}</div><div className="inline-flex flex-wrap rounded-xl bg-slate-100 p-1"><button type="button" onClick={() => selectSource("internal")} className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${source === "internal" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>Portal opportunities</button><button type="button" onClick={() => selectSource("external")} className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${source === "external" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>External websites</button><button type="button" onClick={() => selectSource("tracking")} className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${source === "tracking" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>Application tracking</button></div></div>
    {source !== "tracking" && <><div className="rounded-2xl border border-slate-200 bg-slate-50 p-5"><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><div><p className="flex items-center gap-2 font-semibold text-slate-900"><Target size={18} className="text-sky-600" />Company profile matching</p><p className="mt-1 text-sm text-slate-500">Based on your skills, preferences and assessment.</p></div><span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700"><TrendingUp size={16} />Top fit: InnovateTech Labs</span></div><div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{companyMatches.map(([company, score, tone]) => <div key={company}><div className="flex justify-between text-sm"><span className="font-medium text-slate-700">{company}</span><span className="font-semibold text-slate-900">{score}%</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200"><div className={`h-full rounded-full ${tone}`} style={{ width: `${score}%` }} /></div></div>)}</div></div><div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5"><div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><div className="flex flex-wrap items-center gap-2"><span className="mr-1 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700"><Filter size={16} />Filter</span>{["All", "Internship", "Job"].map((label) => <button key={label} type="button" onClick={() => setFilter(label)} className={`rounded-lg px-3 py-2 text-sm font-medium ${filter === label ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{label}</button>)}</div><label className="flex w-full items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 lg:w-80"><Search size={17} className="text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search roles or companies" className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" /></label></div></div><div><div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-sky-600">{source === "internal" ? "Posted in this portal" : "Curated external job boards"}</p><h3 className="mt-1 text-lg font-semibold text-slate-900">Recommended opportunities</h3></div><span className="text-sm text-slate-500">{roles.length} role{roles.length === 1 ? "" : "s"} found</span></div><div className="grid gap-4 xl:grid-cols-2">{roles.map((item) => <OpportunityCard key={item.id} item={item} source={source} applied={Boolean(applications[item.id])} onApply={onApply} />)}</div>{roles.length === 0 && <div className="rounded-2xl border border-dashed border-slate-300 py-12 text-center"><BriefcaseBusiness className="mx-auto text-slate-400" /><p className="mt-3 font-medium text-slate-700">No opportunities found</p><p className="mt-1 text-sm text-slate-500">Try a different search term or filter.</p></div>}</div>{source === "external" && <p className="flex items-center gap-2 rounded-xl bg-sky-50 px-4 py-3 text-sm text-sky-800"><ExternalLink size={17} />External links open official employer or job-board sites in a new tab. Their application process is managed outside this portal.</p>}</>}
    {source === "tracking" && <ApplicationTracker applications={applications} onAdvance={advanceApplication} />}
  </div>;
};

export default JobsAndInternships;
