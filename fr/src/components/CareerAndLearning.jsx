import {
  AlertTriangle,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  Code2,
  ExternalLink,
  PlayCircle,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

const defaultSkillGaps = [
  { skill: "Deep Learning", resumeLevel: 72, assessedLevel: 48, gap: 24, priority: "High", reason: "You mentioned Deep Learning in your resume, but your assessment indicates gaps in neural networks, model training, and optimization." },
  { skill: "SQL", resumeLevel: 65, assessedLevel: 42, gap: 23, priority: "High", reason: "SQL is listed in your resume, but your assessment shows that advanced querying, joins, and database optimization need improvement." },
  { skill: "Docker", resumeLevel: 55, assessedLevel: 28, gap: 27, priority: "Medium", reason: "Docker appears in your technical stack, but your assessment indicates limited practical knowledge of containerization and deployment." },
];

const trendingSkills = [
  { name: "Generative AI", demand: "+38%", category: "AI / ML", stack: ["Python", "LLMs", "LangChain", "RAG"] },
  { name: "MLOps", demand: "+31%", category: "AI / ML", stack: ["Docker", "MLflow", "AWS", "CI/CD"] },
  { name: "Data Engineering", demand: "+27%", category: "Data", stack: ["Python", "SQL", "Spark", "Airflow"] },
  { name: "Cloud Computing", demand: "+24%", category: "Cloud", stack: ["AWS", "Docker", "Kubernetes", "Terraform"] },
];

const courses = [
  { title: "Deep Learning Specialization", provider: "DeepLearning.AI", level: "Intermediate", duration: "5 Courses", skill: "Deep Learning", reason: "Recommended because your resume mentions Deep Learning, but your assessment shows gaps in neural networks and model optimization.", courseLink: "https://www.coursera.org/specializations/deep-learning", videoLink: "https://www.youtube.com/results?search_query=deep+learning+neural+networks+tutorial" },
  { title: "SQL for Data Science", provider: "Coursera", level: "Beginner -> Intermediate", duration: "4 Weeks", skill: "SQL", reason: "Your SQL knowledge is below the level expected for your selected Data Science career path.", courseLink: "https://www.coursera.org/learn/sql-for-data-science", videoLink: "https://www.youtube.com/results?search_query=SQL+for+data+science" },
  { title: "Docker & Kubernetes", provider: "Industry Learning", level: "Intermediate", duration: "6 Weeks", skill: "Docker", reason: "Docker is already present in your resume, but improving practical deployment skills will strengthen your industry readiness.", courseLink: "https://www.coursera.org/search?query=docker%20kubernetes", videoLink: "https://www.youtube.com/results?search_query=docker+kubernetes+tutorial" },
];

function CareerAndLearning({ profile, result, onViewAssessment }) {
  const skillGaps = result?.skillScores?.length
    ? result.skillScores.map(({ area, score }) => ({
        skill: area,
        resumeLevel: Math.min(95, score + 24),
        assessedLevel: score,
        gap: 100 - score,
        priority: score < 50 ? "High" : "Medium",
        reason: `Your assessment score for ${area} shows the areas where focused practice can improve your career readiness.`,
      }))
    : defaultSkillGaps;

  return <section id="student-recommendations" className="space-y-6">
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <div className="mb-2 flex items-center gap-2"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600"><Sparkles size={18} /></div><span className="text-sm font-semibold text-indigo-600">AI Career Intelligence</span></div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Career & Learning Recommendations</h2>
        <p className="mt-1 max-w-3xl text-sm text-slate-500">Personalized recommendations based on your resume, skill assessment, career interests, and current industry demand.</p>
      </div>
      <button type="button" onClick={onViewAssessment} className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-600">View Career Roadmap <ArrowUpRight size={16} /></button>
    </div>

    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-start justify-between gap-4"><div><div className="flex items-center gap-2"><Target size={18} className="text-rose-500" /><h3 className="font-bold text-slate-900">Resume vs Assessment</h3></div><p className="mt-1 text-sm text-slate-500">Skills mentioned in your resume where your assessed proficiency needs improvement.</p></div><span className="hidden rounded-full bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-600 sm:block">{skillGaps.length} Skill Gaps Found</span></div>
      <div className="space-y-4">{skillGaps.map((item) => <div key={item.skill} className="rounded-xl border border-slate-100 bg-slate-50/70 p-4"><div className="flex flex-col gap-4 lg:flex-row lg:items-center"><div className="min-w-40"><div className="flex items-center gap-2"><Code2 size={16} className="text-slate-500" /><span className="font-semibold text-slate-900">{item.skill}</span></div><span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${item.priority === "High" ? "bg-rose-100 text-rose-600" : "bg-amber-100 text-amber-600"}`}>{item.priority} Priority</span></div><div className="flex-1 space-y-3"><div><div className="mb-1 flex justify-between text-xs"><span className="text-slate-500">Resume indication</span><span className="font-semibold text-slate-700">{item.resumeLevel}%</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-slate-400" style={{ width: `${item.resumeLevel}%` }} /></div></div><div><div className="mb-1 flex justify-between text-xs"><span className="text-slate-500">Assessment proficiency</span><span className="font-semibold text-rose-600">{item.assessedLevel}%</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-rose-500" style={{ width: `${item.assessedLevel}%` }} /></div></div></div><div className="flex w-20 items-center gap-2 lg:flex-col lg:items-center"><AlertTriangle size={17} className="text-rose-500" /><div><p className="text-lg font-bold text-rose-600">-{item.gap}%</p><p className="text-[10px] text-slate-400">proficiency gap</p></div></div></div><div className="mt-4 flex gap-2 border-t border-slate-200 pt-3"><AlertTriangle size={15} className="mt-0.5 shrink-0 text-amber-500" /><p className="text-xs leading-5 text-slate-500">{item.reason}</p></div></div>)}</div>
    </div>

    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="mb-5"><div className="flex items-center gap-2"><TrendingUp size={18} className="text-emerald-600" /><h3 className="font-bold text-slate-900">Skills Currently in Industry Demand</h3></div><p className="mt-1 text-sm text-slate-500">High-demand skills and technology stacks relevant to your career interests.</p></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{trendingSkills.map((skill) => <div key={skill.name} className="group rounded-xl border border-slate-200 p-4 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"><div className="flex items-start justify-between"><div><p className="text-xs font-medium text-slate-400">{skill.category}</p><h4 className="mt-1 font-bold text-slate-900">{skill.name}</h4></div><span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-600">{skill.demand}</span></div><p className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-slate-400">Recommended Stack</p><div className="mt-2 flex flex-wrap gap-1.5">{skill.stack.map((tech) => <span key={tech} className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">{tech}</span>)}</div><button type="button" className="mt-4 flex items-center gap-1 text-xs font-semibold text-indigo-600">Explore skill <ChevronRight size={14} /></button></div>)}</div></div>

    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><div><div className="flex items-center gap-2"><BookOpen size={18} className="text-indigo-600" /><h3 className="font-bold text-slate-900">Recommended Courses & Learning</h3></div><p className="mt-1 text-sm text-slate-500">Courses selected specifically to close your identified skill gaps.</p></div><button type="button" className="text-sm font-semibold text-indigo-600">View all courses</button></div><div className="space-y-4">{courses.map((course) => <div key={course.title} className="rounded-xl border border-slate-200 p-4 transition hover:border-indigo-200 hover:shadow-sm"><div className="flex flex-col gap-4 lg:flex-row"><div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"><BookOpen size={24} /></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h4 className="font-bold text-slate-900">{course.title}</h4><span className="rounded-full bg-indigo-50 px-2 py-1 text-[10px] font-semibold text-indigo-600">{course.skill}</span></div><div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500"><span>{course.provider}</span><span>•</span><span>{course.level}</span><span>•</span><span className="flex items-center gap-1"><Clock size={12} />{course.duration}</span></div><div className="mt-3 rounded-lg bg-amber-50 p-3"><div className="flex gap-2"><Sparkles size={15} className="mt-0.5 shrink-0 text-amber-600" /><div><p className="text-xs font-bold text-amber-800">Why this is recommended</p><p className="mt-1 text-xs leading-5 text-amber-700">{course.reason}</p></div></div></div></div><div className="flex shrink-0 flex-row gap-2 lg:flex-col lg:justify-center"><a href={course.courseLink} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-indigo-700"><ExternalLink size={14} />Course</a><a href={course.videoLink} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600"><PlayCircle size={14} />Watch Video</a></div></div></div>)}</div></div>

    <div className="rounded-2xl bg-slate-900 p-5 text-white"><div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between"><div><div className="flex items-center gap-2"><CheckCircle2 size={18} className="text-emerald-400" /><span className="text-sm font-semibold text-emerald-400">Personalized Career Roadmap</span></div><h3 className="mt-2 text-lg font-bold">Close your skill gaps and become industry-ready</h3><p className="mt-1 max-w-2xl text-sm text-slate-400">Recommendations are generated from {profile?.name ? `${profile.name}'s` : "your"} resume, assessment performance, specialization, and industry skill requirements.</p></div><button type="button" onClick={onViewAssessment} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-100">Build My Learning Path <ArrowUpRight size={16} /></button></div></div>
  </section>;
}

export default CareerAndLearning;