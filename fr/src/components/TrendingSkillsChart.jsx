import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const mockTrendingSkills = [
  { skill: "AI / ML", demand: 95 },
  { skill: "Python", demand: 92 },
  { skill: "Data Analytics", demand: 59 },
  { skill: "Cloud Computing", demand: 85 },
  { skill: "SQL", demand: 83 },
  { skill: "Deep Learning", demand: 41 },
  { skill: "Data Science", demand: 60 },
  { skill: "Docker", demand: 68 },
  { skill: "Java", demand: 74 },
  { skill: "Natural Language Processing", demand: 42 },
  { skill: "Computer Vision", demand: 60 },
  { skill: "Git & GitHub", demand: 88 },
  { skill: "Kubernetes", demand: 55 },
];

export default function TrendingSkillsChart() {
  return (
    <div className="w-full">
      <div className="mb-4">
        <p className="text-sm font-semibold text-white">
          Top Trending Skills
        </p>

        <p className="mt-1 text-xs text-white/70">
          Skills currently demanded by industries
        </p>
      </div>

      <div className="h-[150px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={mockTrendingSkills}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.15)"
            />

            <XAxis
              dataKey="skill"
              tick={{
                fill: "rgba(255,255,255,0.75)",
                fontSize: 10,
              }}
              axisLine={false}
              tickLine={false}
              interval={0}
              angle={-20}
              textAnchor="end"
              height={50}
            />

            <YAxis
              domain={[0, 100]}
              tick={{
                fill: "rgba(255,255,255,0.65)",
                fontSize: 10,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                background: "rgba(15, 23, 42, 0.95)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "12px",
                color: "#fff",
              }}
              labelStyle={{
                color: "#fff",
              }}
              formatter={(value) => [`${value}`, "Demand"]}
            />

            <Line
              type="monotone"
              dataKey="demand"
              stroke="#ffffff"
              strokeWidth={3}
              dot={{
                r: 5,
                fill: "#ffffff",
                strokeWidth: 2,
                stroke: "#6366f1",
              }}
              activeDot={{
                r: 7,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}