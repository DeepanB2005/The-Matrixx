import { useMemo, useState } from "react";
import {
  BookOpenCheck,
  BriefcaseBusiness,
  Building2,
  GraduationCap,
  UsersRound,
  CalendarDays,
  MapPin,
  Clock3,
  ExternalLink,
  CheckCircle2,
  CircleDot,
  Search,
  Filter,
  ArrowUpRight,
  Award,
  BrainCircuit,
  FileText,
  UserRound,
} from "lucide-react";

/* =========================================================
   SUMMARY
========================================================= */

const summary = [
  {
    id: "fdps",
    label: "FDPs",
    value: "12",
    detail: "Available",
    icon: BookOpenCheck,
    tone: "text-emerald-700 bg-emerald-50",
  },
  {
    id: "internships",
    label: "Internships",
    value: "5",
    detail: "Available",
    icon: BriefcaseBusiness,
    tone: "text-sky-700 bg-sky-50",
  },
  {
    id: "collaborations",
    label: "Collaborations",
    value: "8",
    detail: "Active",
    icon: Building2,
    tone: "text-violet-700 bg-violet-50",
  },
  {
    id: "students",
    label: "Students",
    value: "84",
    detail: "Students",
    icon: UsersRound,
    tone: "text-amber-700 bg-amber-50",
  },
];

/* =========================================================
   SKILLS
========================================================= */

const skills = [
  ["Python", 82, "bg-sky-500"],
  ["AI", 68, "bg-violet-500"],
  ["Cloud", 45, "bg-amber-500"],
  ["GenAI", 61, "bg-emerald-500"],
];

/* =========================================================
   FDP DATA — 12
========================================================= */

const fdpData = [
  {
    id: 1,
    title: "Generative AI for Higher Education",
    organizer: "InnovateTech Labs",
    domain: "Generative AI",
    duration: "5 Days",
    mode: "Online",
    start: "Sep 14, 2026",
    seats: 24,
    certification: "Certificate Included",
    description:
      "Hands-on faculty development program covering LLM fundamentals, prompt engineering, RAG, AI-assisted teaching, and responsible AI adoption in education.",
    skills: ["Generative AI", "LLMs", "Prompt Engineering"],
    status: "Open",
  },
  {
    id: 2,
    title: "Industry Cloud Practitioner FDP",
    organizer: "CloudWorks",
    domain: "Cloud Computing",
    duration: "7 Days",
    mode: "Hybrid",
    start: "Sep 18, 2026",
    seats: 18,
    certification: "Industry Certificate",
    description:
      "Practical training on cloud architecture, deployment, containers, cloud security, and industry-oriented cloud application development.",
    skills: ["AWS", "Cloud", "Docker"],
    status: "Open",
  },
  {
    id: 3,
    title: "AI & Machine Learning Teaching Workshop",
    organizer: "AI Research Foundation",
    domain: "Artificial Intelligence",
    duration: "3 Days",
    mode: "Online",
    start: "Sep 22, 2026",
    seats: 35,
    certification: "Certificate Included",
    description:
      "Faculty-focused workshop on modern machine learning workflows, model evaluation, explainable AI, and project-based AI education.",
    skills: ["Machine Learning", "Python", "AI"],
    status: "Open",
  },
  {
    id: 4,
    title: "Data Science Curriculum Co-Design",
    organizer: "DataSphere",
    domain: "Data Science",
    duration: "2 Days",
    mode: "Offline",
    start: "Oct 18, 2026",
    seats: 20,
    certification: "Participation Certificate",
    description:
      "Collaborative curriculum design workshop connecting faculty with industry experts to align Data Science subjects with current industry expectations.",
    skills: ["Data Science", "SQL", "Analytics"],
    status: "Open",
  },
  {
    id: 5,
    title: "Cybersecurity for Academic Institutions",
    organizer: "SecureNet Academy",
    domain: "Cybersecurity",
    duration: "5 Days",
    mode: "Online",
    start: "Oct 05, 2026",
    seats: 30,
    certification: "Certificate Included",
    description:
      "Training on cybersecurity fundamentals, secure application development, threat detection, and security awareness for academic environments.",
    skills: ["Cybersecurity", "Networking", "Security"],
    status: "Open",
  },
  {
    id: 6,
    title: "DevOps & CI/CD Faculty Training",
    organizer: "DevOpsEdge",
    domain: "DevOps",
    duration: "4 Days",
    mode: "Hybrid",
    start: "Oct 12, 2026",
    seats: 22,
    certification: "Industry Certificate",
    description:
      "Practical DevOps training covering Git workflows, CI/CD pipelines, containers, automated testing, and deployment.",
    skills: ["Git", "Docker", "CI/CD"],
    status: "Open",
  },
  {
    id: 7,
    title: "Full Stack Application Development",
    organizer: "CodeCraft Technologies",
    domain: "Software Development",
    duration: "6 Days",
    mode: "Online",
    start: "Oct 20, 2026",
    seats: 28,
    certification: "Certificate Included",
    description:
      "Industry-oriented training covering modern frontend, backend APIs, databases, authentication, and deployment.",
    skills: ["React", "Node.js", "REST APIs"],
    status: "Open",
  },
  {
    id: 8,
    title: "IoT & Smart Systems Faculty Program",
    organizer: "SmartTech Research",
    domain: "IoT",
    duration: "5 Days",
    mode: "Offline",
    start: "Nov 02, 2026",
    seats: 16,
    certification: "Certificate Included",
    description:
      "Hands-on IoT program covering sensors, embedded systems, cloud integration, data collection, and smart applications.",
    skills: ["IoT", "Embedded", "Cloud"],
    status: "Open",
  },
  {
    id: 9,
    title: "Research Methodology & Industry Projects",
    organizer: "ResearchBridge",
    domain: "Research",
    duration: "3 Days",
    mode: "Online",
    start: "Nov 08, 2026",
    seats: 40,
    certification: "Certificate Included",
    description:
      "Program focused on converting industry problems into research projects, identifying research gaps, and building collaborative proposals.",
    skills: ["Research", "Innovation", "Project Design"],
    status: "Open",
  },
  {
    id: 10,
    title: "Blockchain & Web3 Fundamentals",
    organizer: "ChainLabs",
    domain: "Blockchain",
    duration: "4 Days",
    mode: "Online",
    start: "Nov 15, 2026",
    seats: 25,
    certification: "Certificate Included",
    description:
      "Faculty training on blockchain architecture, smart contracts, decentralized applications, and emerging Web3 technologies.",
    skills: ["Blockchain", "Web3", "Smart Contracts"],
    status: "Open",
  },
  {
    id: 11,
    title: "Product Management for Engineering Faculty",
    organizer: "ProductSchool India",
    domain: "Product Management",
    duration: "3 Days",
    mode: "Hybrid",
    start: "Nov 20, 2026",
    seats: 15,
    certification: "Industry Certificate",
    description:
      "Introduces product thinking, user research, agile development, product roadmaps, and industry project management.",
    skills: ["Product Management", "Agile", "Leadership"],
    status: "Open",
  },
  {
    id: 12,
    title: "Soft Skills & Industry Readiness for Faculty",
    organizer: "TalentEdge",
    domain: "Professional Development",
    duration: "2 Days",
    mode: "Online",
    start: "Nov 28, 2026",
    seats: 50,
    certification: "Certificate Included",
    description:
      "Faculty development program focused on communication, mentoring, leadership, presentation skills, and industry engagement.",
    skills: ["Communication", "Leadership", "Mentoring"],
    status: "Open",
  },
];

/* =========================================================
   INTERNSHIP DATA — 5
========================================================= */

const internshipData = [
  {
    id: 1,
    company: "InnovateTech Labs",
    title: "Faculty Industry Internship — AI Engineering",
    domain: "Artificial Intelligence",
    duration: "4 Weeks",
    mode: "Hybrid",
    location: "Bengaluru",
    match: 94,
    stipend: "Professional Exposure",
    description:
      "Faculty members work with an AI engineering team on real-world machine learning workflows, model deployment, and industry project practices.",
    skills: ["Python", "Machine Learning", "GenAI"],
    deadline: "Sep 25, 2026",
    status: "High Match",
  },
  {
    id: 2,
    company: "CloudWorks",
    title: "Cloud Technology Immersion Program",
    domain: "Cloud Computing",
    duration: "3 Weeks",
    mode: "Hybrid",
    location: "Chennai",
    match: 89,
    stipend: "Industry Exposure",
    description:
      "Immersion program designed for faculty to gain practical exposure to cloud architecture, DevOps workflows, and cloud-native application development.",
    skills: ["AWS", "Docker", "DevOps"],
    deadline: "Oct 02, 2026",
    status: "Recommended",
  },
  {
    id: 3,
    company: "DataSphere",
    title: "Data Science Faculty Internship",
    domain: "Data Science",
    duration: "4 Weeks",
    mode: "Online",
    location: "Remote",
    match: 87,
    stipend: "Certificate",
    description:
      "Faculty members participate in industry analytics projects involving data preparation, visualization, predictive analytics, and business insights.",
    skills: ["Python", "SQL", "Data Analytics"],
    deadline: "Oct 08, 2026",
    status: "Recommended",
  },
  {
    id: 4,
    company: "SecureNet",
    title: "Cybersecurity Industry Training",
    domain: "Cybersecurity",
    duration: "2 Weeks",
    mode: "Offline",
    location: "Hyderabad",
    match: 76,
    stipend: "Certificate",
    description:
      "Practical cybersecurity exposure covering security operations, vulnerability assessment, secure coding, and organizational security practices.",
    skills: ["Cybersecurity", "Networking", "Linux"],
    deadline: "Oct 15, 2026",
    status: "Open",
  },
  {
    id: 5,
    company: "SmartTech Research",
    title: "IoT & Smart Systems Faculty Internship",
    domain: "IoT",
    duration: "3 Weeks",
    mode: "Offline",
    location: "Coimbatore",
    match: 81,
    stipend: "Industry Certificate",
    description:
      "Faculty members work with an IoT team to understand sensor systems, edge computing, device connectivity, and industrial IoT applications.",
    skills: ["IoT", "Embedded Systems", "Cloud"],
    deadline: "Oct 22, 2026",
    status: "Open",
  },
];

/* =========================================================
   COLLABORATION DATA — 8
========================================================= */

const collaborationData = [
  {
    id: 1,
    company: "InnovateTech Labs",
    type: "Student Mentorship",
    project: "AI Career Mentorship Program",
    status: "Active",
    participants: 24,
    faculty: "Dr. Priya",
    description:
      "Industry mentors are guiding students through AI career preparation, technical projects, interview readiness, and real-world problem solving.",
    nextAction: "Mentorship session — Sep 12",
  },
  {
    id: 2,
    company: "CloudWorks",
    type: "Faculty Immersion",
    project: "Cloud Practitioner Faculty Program",
    status: "Active",
    participants: 12,
    faculty: "Dr. Priya",
    description:
      "Faculty members are receiving practical exposure to cloud architecture and modern DevOps practices.",
    nextAction: "Industry workshop — Sep 18",
  },
  {
    id: 3,
    company: "DataSphere",
    type: "Live Project",
    project: "Industry Analytics Challenge",
    status: "In Review",
    participants: 18,
    faculty: "Dr. Priya",
    description:
      "Students and faculty are collaborating with industry experts to solve a real-world business analytics problem.",
    nextAction: "Project proposal review",
  },
  {
    id: 4,
    company: "SecureNet",
    type: "Guest Lecture",
    project: "Cybersecurity Career Series",
    status: "Scheduled",
    participants: 120,
    faculty: "Dr. Arun",
    description:
      "Industry security professionals will conduct a series of sessions covering cybersecurity careers and current industry practices.",
    nextAction: "Guest lecture — Sep 24",
  },
  {
    id: 5,
    company: "TechNova",
    type: "Innovation Challenge",
    project: "AI for Social Good",
    status: "Active",
    participants: 36,
    faculty: "Dr. Priya",
    description:
      "Students are developing AI-based solutions for social-impact problems with technical mentoring from TechNova engineers.",
    nextAction: "Prototype evaluation",
  },
  {
    id: 6,
    company: "FinEdge",
    type: "Research Collaboration",
    project: "Financial AI Research",
    status: "Active",
    participants: 8,
    faculty: "Dr. Kumar",
    description:
      "Faculty researchers and industry experts are collaborating on applied AI research for financial data analysis.",
    nextAction: "Research meeting — Oct 03",
  },
  {
    id: 7,
    company: "NextGen Systems",
    type: "Workshop",
    project: "Modern Software Engineering",
    status: "Scheduled",
    participants: 85,
    faculty: "Dr. Priya",
    description:
      "Industry engineers will conduct workshops on software architecture, APIs, testing, deployment, and engineering best practices.",
    nextAction: "Workshop — Oct 10",
  },
  {
    id: 8,
    company: "AI Research Foundation",
    type: "Joint Research",
    project: "Responsible Generative AI",
    status: "In Review",
    participants: 6,
    faculty: "Dr. Priya",
    description:
      "Joint research initiative exploring responsible adoption of generative AI in higher education and assessment.",
    nextAction: "Proposal discussion",
  },
];

/* =========================================================
   STUDENT DATA
   84 STUDENTS
========================================================= */

const baseStudents = [
  ["Arun Kumar", "AI & DS", 87, 92, "Python", "High"],
  ["Divya S", "AI & DS", 81, 88, "Machine Learning", "High"],
  ["Rahul M", "AI & DS", 74, 82, "Python", "Medium"],
  ["Nithya R", "AI & DS", 91, 95, "Data Science", "High"],
  ["Karthik P", "AI & DS", 68, 74, "SQL", "Medium"],
  ["Harini V", "AI & DS", 79, 86, "GenAI", "High"],
  ["Sanjay K", "AI & DS", 63, 69, "Cloud", "Medium"],
  ["Meena S", "AI & DS", 88, 91, "Python", "High"],
  ["Vishnu R", "AI & DS", 72, 78, "Machine Learning", "Medium"],
  ["Keerthana P", "AI & DS", 84, 89, "GenAI", "High"],
  ["Akash T", "AI & DS", 59, 67, "Cloud", "Low"],
  ["Pavithra N", "AI & DS", 77, 83, "Data Science", "Medium"],
];

/*
  Generate 84 students for the prototype.
  The first 12 contain richer named demo records.
*/
const studentData = Array.from({ length: 84 }, (_, index) => {
  if (index < baseStudents.length) {
    const [name, department, skillScore, readiness, topSkill, readinessLevel] =
      baseStudents[index];

    return {
      id: index + 1,
      name,
      department,
      skillScore,
      readiness,
      topSkill,
      readinessLevel,
      internship: index % 3 === 0 ? "Participating" : "Not Started",
      assessment: index % 4 === 0 ? "Completed" : "Completed",
      gap:
        skillScore < 70
          ? "Cloud & DevOps"
          : skillScore < 80
            ? "Generative AI"
            : "Advanced System Design",
    };
  }

  const skillScore = 55 + ((index * 7) % 39);
  const readiness = Math.min(96, skillScore + 5 + (index % 8));

  const skillsList = [
    "Python",
    "Machine Learning",
    "SQL",
    "Generative AI",
    "Cloud",
    "Data Science",
  ];

  const gaps = [
    "Cloud & DevOps",
    "Generative AI",
    "System Design",
    "Communication",
    "Advanced SQL",
  ];

  return {
    id: index + 1,
    name: `Student ${String(index + 1).padStart(2, "0")}`,
    department: "AI & DS",
    skillScore,
    readiness,
    topSkill: skillsList[index % skillsList.length],
    readinessLevel:
      readiness >= 85 ? "High" : readiness >= 70 ? "Medium" : "Needs Attention",
    internship: index % 4 === 0 ? "Participating" : "Not Started",
    assessment: "Completed",
    gap: gaps[index % gaps.length],
  };
});

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function StatusBadge({ children, type = "default" }) {
  const styles = {
    success: "bg-emerald-50 text-emerald-700 border-emerald-100",
    warning: "bg-amber-50 text-amber-700 border-amber-100",
    danger: "bg-rose-50 text-rose-700 border-rose-100",
    info: "bg-sky-50 text-sky-700 border-sky-100",
    purple: "bg-violet-50 text-violet-700 border-violet-100",
    default: "bg-slate-50 text-slate-600 border-slate-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${
        styles[type] || styles.default
      }`}
    >
      {children}
    </span>
  );
}

function getStatusType(status) {
  if (
    ["Open", "Active", "High Match", "Recommended", "Scheduled"].includes(
      status
    )
  ) {
    return "success";
  }

  if (["In Review", "Medium"].includes(status)) return "warning";

  if (["Needs Attention"].includes(status)) return "danger";

  return "info";
}

/* =========================================================
   FDP TAB
========================================================= */

function FDPPanel() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return fdpData.filter((item) =>
      `${item.title} ${item.organizer} ${item.domain} ${item.skills.join(" ")}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-emerald-700">
            Faculty development programs
          </p>
          <h3 className="mt-1 text-xl font-semibold text-slate-900">
            12 FDP opportunities
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Industry-relevant programs recommended for your academic profile.
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search FDPs..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {filtered.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-emerald-200 hover:shadow-sm"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                  <BookOpenCheck size={20} />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-semibold text-slate-900">
                      {item.title}
                    </h4>
                    <StatusBadge type="success">{item.status}</StatusBadge>
                  </div>

                  <p className="mt-1 text-sm font-medium text-slate-600">
                    {item.organizer}
                  </p>

                  <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                View & Register
                <ArrowUpRight size={15} />
              </button>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {item.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-5 grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2 lg:grid-cols-4">
              <InfoItem icon={CalendarDays} label="Starts" value={item.start} />
              <InfoItem icon={Clock3} label="Duration" value={item.duration} />
              <InfoItem icon={MapPin} label="Mode" value={item.mode} />
              <InfoItem
                icon={UsersRound}
                label="Seats"
                value={`${item.seats} remaining`}
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   INTERNSHIP TAB
========================================================= */

function InternshipPanel() {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-sky-700">
          Faculty internships
        </p>
        <h3 className="mt-1 text-xl font-semibold text-slate-900">
          5 industry internship opportunities
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Gain practical exposure and bring current industry practices back
          into the classroom.
        </p>
      </div>

      <div className="grid gap-4">
        {internshipData.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-sky-200 hover:shadow-sm"
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
              <div className="flex gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sky-50 text-sky-700">
                  <BriefcaseBusiness size={20} />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-semibold text-slate-900">
                      {item.title}
                    </h4>
                    <StatusBadge type="info">{item.match}% Match</StatusBadge>
                  </div>

                  <p className="mt-1 text-sm font-medium text-slate-600">
                    {item.company} · {item.domain}
                  </p>

                  <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 flex-col gap-2 lg:w-36">
                <button
                  type="button"
                  className="rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700"
                >
                  Apply
                </button>

                <button
                  type="button"
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Details
                </button>
              </div>
            </div>

            <div className="mt-5 grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2 lg:grid-cols-4">
              <InfoItem
                icon={Building2}
                label="Company"
                value={item.company}
              />
              <InfoItem icon={Clock3} label="Duration" value={item.duration} />
              <InfoItem
                icon={MapPin}
                label="Location"
                value={`${item.location} · ${item.mode}`}
              />
              <InfoItem
                icon={CalendarDays}
                label="Deadline"
                value={item.deadline}
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   COLLABORATION TAB
========================================================= */

function CollaborationPanel() {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-violet-700">
          Industry collaboration
        </p>
        <h3 className="mt-1 text-xl font-semibold text-slate-900">
          8 active collaborations
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Track mentorships, live projects, research, workshops, and industry
          engagement.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {collaborationData.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-violet-200 hover:shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-50 text-violet-700">
                  <Building2 size={19} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {item.company}
                  </p>
                  <p className="mt-0.5 text-xs font-medium text-violet-700">
                    {item.type}
                  </p>
                </div>
              </div>

              <StatusBadge type={getStatusType(item.status)}>
                {item.status}
              </StatusBadge>
            </div>

            <h4 className="mt-5 font-semibold text-slate-900">
              {item.project}
            </h4>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              {item.description}
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Participants</p>
                <p className="mt-1 font-semibold text-slate-900">
                  {item.participants}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Faculty lead</p>
                <p className="mt-1 font-semibold text-slate-900">
                  {item.faculty}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
              <p className="text-xs text-slate-500">{item.nextAction}</p>

              <button
                type="button"
                className="inline-flex items-center gap-1 text-xs font-semibold text-violet-700 hover:text-violet-900"
              >
                Open
                <ArrowUpRight size={13} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   STUDENTS TAB
========================================================= */

function StudentsPanel() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredStudents = useMemo(() => {
    return studentData.filter((student) => {
      const matchesSearch =
        `${student.name} ${student.topSkill} ${student.gap}`
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" ||
        (filter === "High" && student.readiness >= 85) ||
        (filter === "Medium" &&
          student.readiness >= 70 &&
          student.readiness < 85) ||
        (filter === "Needs Attention" && student.readiness < 70);

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const averageSkill = Math.round(
    studentData.reduce((sum, student) => sum + student.skillScore, 0) /
      studentData.length
  );

  const averageReadiness = Math.round(
    studentData.reduce((sum, student) => sum + student.readiness, 0) /
      studentData.length
  );

  const internshipParticipants = studentData.filter(
    (student) => student.internship === "Participating"
  ).length;

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-amber-700">
          Student monitoring
        </p>

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h3 className="mt-1 text-xl font-semibold text-slate-900">
              84 students under your monitoring
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Track skill development, industry readiness, internships, and
              major skill gaps.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <MetricBox label="Avg. Skill" value={`${averageSkill}%`} />
            <MetricBox
              label="Readiness"
              value={`${averageReadiness}%`}
            />
            <MetricBox
              label="Internships"
              value={internshipParticipants}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:flex-row">
        <div className="relative flex-1">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student, skill or skill gap..."
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter size={16} className="text-slate-400" />

          {["All", "High", "Medium", "Needs Attention"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                filter === item
                  ? "bg-amber-500 text-white"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="border-b border-slate-100 bg-slate-50">
              <tr>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Student
                </th>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Skill Score
                </th>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Readiness
                </th>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Strongest Skill
                </th>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Major Gap
                </th>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Internship
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="transition hover:bg-amber-50/40"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-full bg-amber-50 text-amber-700">
                        <UserRound size={16} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {student.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {student.department}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-20 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-sky-500"
                          style={{ width: `${student.skillScore}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold">
                        {student.skillScore}%
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge
                      type={
                        student.readiness >= 85
                          ? "success"
                          : student.readiness >= 70
                            ? "warning"
                            : "danger"
                      }
                    >
                      {student.readiness}%
                    </StatusBadge>
                  </td>

                  <td className="px-5 py-4 text-sm font-medium text-slate-700">
                    {student.topSkill}
                  </td>

                  <td className="px-5 py-4">
                    <span className="text-sm text-slate-600">
                      {student.gap}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge
                      type={
                        student.internship === "Participating"
                          ? "success"
                          : "default"
                      }
                    >
                      {student.internship}
                    </StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-100 px-5 py-4 text-xs text-slate-500">
          Showing {filteredStudents.length} of 84 students
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   HELPERS
========================================================= */

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <Icon size={16} className="text-slate-400" />

      <div>
        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
          {label}
        </p>
        <p className="mt-0.5 text-xs font-semibold text-slate-700">{value}</p>
      </div>
    </div>
  );
}

function MetricBox({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 px-4 py-2.5">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </p>
      <p className="mt-0.5 text-sm font-bold text-slate-900">{value}</p>
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function FacultyDashboard() {
  const [activeTab, setActiveTab] = useState("fdps");

  const renderPanel = () => {
    switch (activeTab) {
      case "fdps":
        return <FDPPanel />;

      case "internships":
        return <InternshipPanel />;

      case "collaborations":
        return <CollaborationPanel />;

      case "students":
        return <StudentsPanel />;

      default:
        return <FDPPanel />;
    }
  };

  return (
    <section className="mt-6 space-y-6">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-cyan-50 px-6 py-6 sm:px-7">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-emerald-700">
            Faculty & academician workspace
          </p>

          <h2 className="mt-1 text-2xl font-semibold text-slate-900">
            Welcome, Dr. Priya
          </h2>

          <p className="mt-1 text-sm text-slate-600">
            AI & Data Science Faculty
          </p>
        </div>

        {/* ===================================================
            TABS / SUMMARY CARDS
        ==================================================== */}

        <div className="grid divide-y divide-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {summary.map(
            ({ id, label, value, detail, icon: Icon, tone }) => {
              const active = activeTab === id;

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveTab(id)}
                  className={`group relative p-5 text-left transition ${
                    active
                      ? "bg-slate-50"
                      : "bg-white hover:bg-slate-50"
                  }`}
                >
                  {active && (
                    <span className="absolute inset-x-0 bottom-0 h-1 bg-emerald-500" />
                  )}

                  <span
                    className={`grid h-9 w-9 place-items-center rounded-xl ${tone} transition group-hover:scale-105`}
                  >
                    <Icon size={18} />
                  </span>

                  <p className="mt-4 text-sm font-semibold text-slate-700">
                    {label}
                  </p>

                  <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                    {value}{" "}
                    <span className="text-sm font-medium text-slate-500">
                      {detail}
                    </span>
                  </p>

                  <p className="mt-2 text-xs font-medium text-slate-400">
                    {active ? "Currently viewing" : "Click to view details"}{" "}
                    <ArrowUpRight
                      size={12}
                      className="ml-1 inline transition group-hover:translate-x-0.5"
                    />
                  </p>
                </button>
              );
            }
          )}
        </div>
      </div>

      {/* =====================================================
          STUDENT SKILL OVERVIEW
      ====================================================== */}

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
        <div className="flex items-center gap-2">
          <GraduationCap className="text-emerald-600" size={20} />

          <div>
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-emerald-700">
              Student progress
            </p>

            <h3 className="mt-1 text-xl font-semibold text-slate-900">
              Student Skill Development Overview
            </h3>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {skills.map(([skill, score, tone]) => (
            <div key={skill}>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-slate-700">
                  {skill}
                </span>

                <span className="font-semibold text-slate-900">
                  {score}%
                </span>
              </div>

              <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${tone}`}
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =====================================================
          ACTIVE TAB CONTENT
      ====================================================== */}

      <div className="rounded-3xl border border-slate-200 bg-slate-50/50 p-5 shadow-sm sm:p-7">
        {renderPanel()}
      </div>

      {/* =====================================================
          BOTTOM PANELS
      ====================================================== */}

      <div className="grid gap-6 lg:grid-cols-2">

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-emerald-700">
            Faculty development
          </p>

          <h3 className="mt-2 text-xl font-semibold text-slate-900">
            Recommended next opportunities
          </h3>

          <div className="mt-5 space-y-3">
            {[
              "Generative AI teaching fellowship · Opens this week",
              "Industry Cloud Practitioner FDP · 18 seats remaining",
              "Data Science curriculum co-design workshop · October 18",
            ].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setActiveTab("fdps")}
                className="flex w-full items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-800"
              >
                {item}
                <ArrowUpRight size={15} />
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-violet-700">
            Industry exposure & collaboration
          </p>

          <h3 className="mt-2 text-xl font-semibold text-slate-900">
            Active partner activity
          </h3>

          <div className="mt-5 space-y-3">
            {[
              ["InnovateTech Labs", "Mentorship slots for 24 students"],
              ["CloudWorks", "Faculty immersion program invitation"],
              ["DataSphere", "Live project collaboration in review"],
            ].map(([company, detail]) => (
              <button
                key={company}
                type="button"
                onClick={() => setActiveTab("collaborations")}
                className="w-full rounded-xl border border-slate-100 px-4 py-3 text-left transition hover:border-violet-100 hover:bg-violet-50"
              >
                <p className="text-sm font-semibold text-slate-800">
                  {company}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {detail}
                </p>
              </button>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
