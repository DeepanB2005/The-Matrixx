import { useMemo, useState } from "react";
import {
  AlertTriangle,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock,
  Code2,
  ExternalLink,
  PlayCircle,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

const defaultSkillGaps = [
  {
    skill: "Deep Learning",
    resumeLevel: 72,
    assessedLevel: 48,
    gap: 24,
    priority: "High",
    reason:
      "You mentioned Deep Learning in your resume, but your assessment indicates gaps in neural networks, model training, and optimization.",
  },
  {
    skill: "SQL",
    resumeLevel: 65,
    assessedLevel: 42,
    gap: 23,
    priority: "High",
    reason:
      "SQL is listed in your resume, but your assessment shows that advanced querying, joins, and database optimization need improvement.",
  },
  {
    skill: "Docker",
    resumeLevel: 55,
    assessedLevel: 28,
    gap: 27,
    priority: "Medium",
    reason:
      "Docker appears in your technical stack, but your assessment indicates limited practical knowledge of containerization and deployment.",
  },
];

const trendingSkills = [
  {
    name: "Generative AI",
    demand: "+38%",
    category: "AI / ML",
    stack: ["Python", "LLMs", "LangChain", "RAG"],
  },
  {
    name: "MLOps",
    demand: "+31%",
    category: "AI / ML",
    stack: ["Docker", "MLflow", "AWS", "CI/CD"],
  },
  {
    name: "Data Engineering",
    demand: "+27%",
    category: "Data",
    stack: ["Python", "SQL", "Spark", "Airflow"],
  },
  {
    name: "Cloud Computing",
    demand: "+24%",
    category: "Cloud",
    stack: ["AWS", "Docker", "Kubernetes", "Terraform"],
  },
];

const courses = [
  {
    id: "deep-learning",
    title: "Deep Learning Specialization",
    provider: "DeepLearning.AI",
    level: "Intermediate",
    duration: "5 Courses",
    skill: "Deep Learning",
    reason:
      "Recommended because your resume mentions Deep Learning, but your assessment shows gaps in neural networks and model optimization.",
    courseLink:
      "https://www.coursera.org/specializations/deep-learning",
    videoLink:
      "https://www.youtube.com/results?search_query=deep+learning+neural+networks+tutorial",
  },
  {
    id: "sql-data-science",
    title: "SQL for Data Science",
    provider: "Coursera",
    level: "Beginner to Intermediate",
    duration: "4 Weeks",
    skill: "SQL",
    reason:
      "Your SQL knowledge is below the level expected for your selected Data Science career path.",
    courseLink:
      "https://www.coursera.org/learn/sql-for-data-science",
    videoLink:
      "https://www.youtube.com/results?search_query=SQL+for+data+science",
  },
  {
    id: "docker-kubernetes",
    title: "Docker & Kubernetes",
    provider: "Industry Learning",
    level: "Intermediate",
    duration: "6 Weeks",
    skill: "Docker",
    reason:
      "Docker is already present in your resume, but improving practical deployment skills will strengthen your industry readiness.",
    courseLink:
      "https://www.coursera.org/search?query=docker%20kubernetes",
    videoLink:
      "https://www.youtube.com/results?search_query=docker+kubernetes+tutorial",
  },
];

const workshops = [
  {
    id: "genai-product-sprint",
    title: "Generative AI Product Sprint",
    organizer: "NASSCOM FutureSkills",
    format: "Workshop",
    duration: "2 Days",
    skill: "AI and data fundamentals",
    date: "Sep 18",
    description:
      "Build a small AI workflow, evaluate outputs, and present a deployable prototype.",
  },
  {
    id: "cloud-devops-bootcamp",
    title: "Cloud & DevOps Readiness Bootcamp",
    organizer: "AWS Educate",
    format: "Training program",
    duration: "3 Weeks",
    skill: "Practical programming",
    date: "Oct 02",
    description:
      "Hands-on labs for deployment, containers, monitoring, and production support basics.",
  },
  {
    id: "interview-readiness-lab",
    title: "Technical Interview Readiness Lab",
    organizer: "Google Developer Student Clubs",
    format: "Workshop",
    duration: "1 Day",
    skill: "CS core foundations",
    date: "Oct 12",
    description:
      "Timed problem-solving practice, feedback rounds, and mock interview preparation.",
  },
];

function CareerAndLearning({ result, onViewAssessment }) {
  const [completedLearning, setCompletedLearning] = useState([]);
  const [copiedPromptId, setCopiedPromptId] = useState(null);

  const allLearningIds = useMemo(
    () => [...courses, ...workshops].map((item) => item.id),
    []
  );

  const progress = Math.round(
    (completedLearning.length / allLearningIds.length) * 100
  );

  const toggleCompleted = (id) => {
    setCompletedLearning((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const copyLearningPrompt = async (course) => {
    const prompt = `I want to learn "${course.title}" for ${course.skill}.

Course provider: ${course.provider}
Level: ${course.level}
Duration: ${course.duration}

Create a structured learning plan for this course.

Please:
1. Explain the concepts in simple terms.
2. Start from the fundamentals and gradually increase the difficulty.
3. Give practical real-world examples.
4. Give me coding/practical exercises after each major topic.
5. Give me small projects to apply what I learn.
6. Quiz me after each major topic.
7. Identify my weak areas based on my answers.
8. Give me interview questions related to this skill.
9. Track my progress throughout the learning process.
10. Do not move to the next major topic until I understand the current one.

Assume I am a beginner and teach me step-by-step.

Why this course was recommended:
${course.reason}`;

    try {
      await navigator.clipboard.writeText(prompt);

      setCopiedPromptId(course.id);

      setTimeout(() => {
        setCopiedPromptId(null);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy learning prompt:", error);
    }
  };

  const skillGaps = result?.skillScores?.length
    ? result.skillScores.map(({ area, score }) => {
        const answersForArea =
          result.answers?.filter((item) => item.area === area) || [];

        const missedQuestions = answersForArea
          .filter((item) => !item.isCorrect)
          .map((item) => item.question);

        return {
          skill: area,
          resumeLevel: Math.min(95, score + 24),
          assessedLevel: score,
          gap: 100 - score,
          priority: score < 50 ? "High" : "Medium",
          answerCount: answersForArea.length,
          correctCount: answersForArea.filter((item) => item.isCorrect)
            .length,
          missedQuestions,
          reason: `Your assessment score for ${area} shows the areas where focused practice can improve your career readiness.`,
        };
      })
    : defaultSkillGaps;

  return (
    <section id="student-recommendations" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
              <Sparkles size={18} />
            </div>

            <span className="text-sm font-semibold text-indigo-600">
              AI Career Intelligence
            </span>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Career & Learning Recommendations
          </h2>

          <p className="mt-1 max-w-3xl text-sm text-slate-500">
            Personalized recommendations based on your resume, skill
            assessment, career interests, and current industry demand.
          </p>
        </div>

        {result && (
          <button
            type="button"
            onClick={onViewAssessment}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-indigo-200 hover:text-indigo-700"
          >
            <Target size={16} />
            View assessment
          </button>
        )}
      </div>

      {/* Resume vs Assessment */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Target size={18} className="text-rose-500" />
              <h3 className="font-bold text-slate-900">
                Resume vs Assessment
              </h3>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Skills mentioned in your resume where your assessed proficiency
              needs improvement.
            </p>

            {result && (
              <p className="mt-2 text-sm font-semibold text-slate-700">
                Latest assessment score: {result.score}%
              </p>
            )}
          </div>

          <span className="hidden rounded-full bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-600 sm:block">
            {skillGaps.length} Skill Gaps Found
          </span>
        </div>

        <div className="space-y-4">
          {skillGaps.map((item) => (
            <div
              key={item.skill}
              className="rounded-xl border border-slate-100 bg-slate-50/70 p-4"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                <div className="min-w-40">
                  <div className="flex items-center gap-2">
                    <Code2 size={16} className="text-slate-500" />
                    <span className="font-semibold text-slate-900">
                      {item.skill}
                    </span>
                  </div>

                  <span
                    className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      item.priority === "High"
                        ? "bg-rose-100 text-rose-600"
                        : "bg-amber-100 text-amber-600"
                    }`}
                  >
                    {item.priority} Priority
                  </span>
                </div>

                <div className="flex-1 space-y-3">
                  <div>
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="text-slate-500">
                        Resume indication
                      </span>
                      <span className="font-semibold text-slate-700">
                        {item.resumeLevel}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-slate-400"
                        style={{ width: `${item.resumeLevel}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="text-slate-500">
                        Assessment proficiency
                      </span>
                      <span className="font-semibold text-rose-600">
                        {item.assessedLevel}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-rose-500"
                        style={{ width: `${item.assessedLevel}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex w-20 items-center gap-2 lg:flex-col lg:items-center">
                  <AlertTriangle size={17} className="text-rose-500" />

                  <div>
                    <p className="text-lg font-bold text-rose-600">
                      -{item.gap}%
                    </p>
                    <p className="text-[10px] text-slate-400">
                      proficiency gap
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-3 border-t border-slate-200 pt-3 lg:grid-cols-[1fr_.9fr]">
                <div className="flex gap-2">
                  <AlertTriangle
                    size={15}
                    className="mt-0.5 shrink-0 text-amber-500"
                  />

                  <p className="text-xs leading-5 text-slate-500">
                    {item.reason}
                  </p>
                </div>

                {item.answerCount > 0 && (
                  <div className="rounded-lg bg-white p-3 text-xs text-slate-600">
                    <p className="font-semibold text-slate-800">
                      Assessment answers: {item.correctCount}/
                      {item.answerCount} correct
                    </p>

                    {item.missedQuestions.length > 0 ? (
                      <ul className="mt-2 space-y-1">
                        {item.missedQuestions
                          .slice(0, 2)
                          .map((question) => (
                            <li key={question} className="leading-5">
                              Review: {question}
                            </li>
                          ))}
                      </ul>
                    ) : (
                      <p className="mt-2 text-emerald-700">
                        All answers in this area were correct.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Skills */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} className="text-emerald-600" />
            <h3 className="font-bold text-slate-900">
              Skills Currently in Industry Demand
            </h3>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            High-demand skills and technology stacks relevant to your career
            interests.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {trendingSkills.map((skill) => (
            <div
              key={skill.name}
              className="group rounded-xl border border-slate-200 p-4 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-400">
                    {skill.category}
                  </p>

                  <h4 className="mt-1 font-bold text-slate-900">
                    {skill.name}
                  </h4>
                </div>

                <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-600">
                  {skill.demand}
                </span>
              </div>

              <p className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Recommended Stack
              </p>

              <div className="mt-2 flex flex-wrap gap-1.5">
                {skill.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Courses */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen size={18} className="text-indigo-600" />

              <h3 className="font-bold text-slate-900">
                Recommended Courses & Learning
              </h3>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Courses, workshops, and training programs selected to close your
              identified skill gaps.
            </p>
          </div>

          <div className="min-w-56">
            <div className="flex justify-between text-xs font-semibold text-slate-600">
              <span>Completion progress</span>
              <span>{progress}%</span>
            </div>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-indigo-600"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* IMPORTANT: Buttons are INSIDE courses.map() */}
        <div className="space-y-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="rounded-xl border border-slate-200 p-4 transition hover:border-indigo-200 hover:shadow-sm"
            >
              <div className="flex flex-col gap-4 lg:flex-row">
                {/* Course Icon */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <BookOpen size={24} />
                </div>

                {/* Course Information */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-bold text-slate-900">
                      {course.title}
                    </h4>

                    <span className="rounded-full bg-indigo-50 px-2 py-1 text-[10px] font-semibold text-indigo-600">
                      {course.skill}
                    </span>

                    {completedLearning.includes(course.id) && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700">
                        <CheckCircle2 size={12} />
                        Completed
                      </span>
                    )}
                  </div>

                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                    <span>{course.provider}</span>

                    <span>{course.level}</span>

                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {course.duration}
                    </span>
                  </div>

                  {/* Recommendation Reason */}
                  <div className="mt-3 rounded-lg bg-amber-50 p-3">
                    <div className="flex gap-2">
                      <Sparkles
                        size={15}
                        className="mt-0.5 shrink-0 text-amber-600"
                      />

                      <div>
                        <p className="text-xs font-bold text-amber-800">
                          Why this is recommended
                        </p>

                        <p className="mt-1 text-xs leading-5 text-amber-700">
                          {course.reason}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex shrink-0 flex-row flex-wrap gap-2 lg:flex-col lg:justify-center">
                  {/* Mark Done */}
                  <button
                    type="button"
                    onClick={() => toggleCompleted(course.id)}
                    className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold transition ${
                      completedLearning.includes(course.id)
                        ? "bg-emerald-600 text-white hover:bg-emerald-700"
                        : "bg-slate-900 text-white hover:bg-slate-700"
                    }`}
                  >
                    <CheckCircle2 size={14} />

                    {completedLearning.includes(course.id)
                      ? "Done"
                      : "Mark done"}
                  </button>

                  {/* Course */}
                  <a
                    href={course.courseLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-indigo-700"
                  >
                    <ExternalLink size={14} />
                    Course
                  </a>

                  {/* Watch */}
                  <a
                    href={course.videoLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600"
                  >
                    <PlayCircle size={14} />
                    Watch
                  </a>

                  {/* Prompt */}
                  <button
                    type="button"
                    onClick={() => copyLearningPrompt(course)}
                    className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold text-white transition ${
                      copiedPromptId === course.id
                        ? "bg-emerald-600 hover:bg-emerald-700"
                        : "bg-purple-600 hover:bg-purple-700"
                    }`}
                  >
                    {copiedPromptId === course.id ? (
                      <>
                        <CheckCircle2 size={14} />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Sparkles size={14} />
                        Prompt
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Workshops */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center gap-2">
          <Users size={18} className="text-sky-600" />

          <h3 className="font-bold text-slate-900">
            Industry Workshops & Training Programs
          </h3>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {workshops.map((program) => (
            <article
              key={program.id}
              className="rounded-xl border border-slate-200 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-sky-600">
                    {program.format}
                  </p>

                  <h4 className="mt-1 font-bold text-slate-900">
                    {program.title}
                  </h4>
                </div>

                {completedLearning.includes(program.id) && (
                  <CheckCircle2
                    className="shrink-0 text-emerald-600"
                    size={18}
                  />
                )}
              </div>

              <p className="mt-2 text-sm font-medium text-slate-600">
                {program.organizer}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {program.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2 py-1">
                  <CalendarDays size={13} />
                  {program.date}
                </span>

                <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2 py-1">
                  <Clock size={13} />
                  {program.duration}
                </span>

                <span className="rounded-lg bg-slate-100 px-2 py-1">
                  {program.skill}
                </span>
              </div>

              <button
                type="button"
                onClick={() => toggleCompleted(program.id)}
                className={`mt-4 w-full rounded-lg px-4 py-2.5 text-xs font-semibold transition ${
                  completedLearning.includes(program.id)
                    ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                    : "bg-sky-600 text-white hover:bg-sky-700"
                }`}
              >
                {completedLearning.includes(program.id)
                  ? "Completed"
                  : "Track this program"}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CareerAndLearning;

