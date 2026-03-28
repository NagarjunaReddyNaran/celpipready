"use client";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, TooltipProps
} from "recharts";

type ChartSession = {
  date: string;
  type: string;
  score: number;
};

type DataPoint = {
  label: string;
  listening?: number;
  reading?: number;
  writing?: number;
  speaking?: number;
};

const LINE_CONFIG = {
  listening: { color: "#3b82f6", label: "Listening" },
  reading:   { color: "#10b981", label: "Reading"   },
  writing:   { color: "#8b5cf6", label: "Writing"   },
  speaking:  { color: "#f59e0b", label: "Speaking"  },
};

function buildChartData(sessions: ChartSession[]): DataPoint[] {
  // Sort oldest → newest for left-to-right progression
  const sorted = [...sessions].sort((a, b) => a.date.localeCompare(b.date));
  return sorted.map(s => ({
    label: new Date(s.date).toLocaleDateString("en-CA", { month: "short", day: "numeric" }),
    [s.type]: s.score,
  }));
}

function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-md px-4 py-3 text-sm">
      <p className="font-semibold text-slate-700 mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {LINE_CONFIG[p.dataKey as keyof typeof LINE_CONFIG]?.label ?? p.dataKey}: {" "}
          <span className="font-bold">{(p.value as number).toFixed(1)}</span>
          <span className="text-slate-400">/12</span>
        </p>
      ))}
    </div>
  );
}

export function ScoreChart({ sessions }: { sessions: ChartSession[] }) {
  if (sessions.length < 2) {
    return (
      <div className="flex flex-col items-center justify-center h-40 text-center">
        <p className="text-slate-400 text-sm">Take at least 2 tests to see your progress chart.</p>
      </div>
    );
  }

  const data = buildChartData(sessions);
  const activeTypes = Object.keys(LINE_CONFIG).filter(type =>
    sessions.some(s => s.type === type)
  );

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 4, right: 12, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 11, fill: "#94a3b8" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          domain={[0, 12]}
          ticks={[0, 3, 6, 9, 12]}
          tick={{ fontSize: 11, fill: "#94a3b8" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
        />
        {activeTypes.map(type => (
          <Line
            key={type}
            type="monotone"
            dataKey={type}
            name={LINE_CONFIG[type as keyof typeof LINE_CONFIG].label}
            stroke={LINE_CONFIG[type as keyof typeof LINE_CONFIG].color}
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 2, fill: "white" }}
            activeDot={{ r: 6 }}
            connectNulls
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
