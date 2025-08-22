import React from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis } from "recharts";

type Point = { x: number; y: number };

interface GradientLineProps {
  data: Point[];
  stroke?: string;   // default: white
  height?: number;   // default: 180
}

export default function ArfGraph({
  data,
  stroke = "#1d1d1d",
  height = 180,
}: GradientLineProps) {
  return (
    <div style={{ width: "100%", height, background: "transparent" }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        >
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={stroke} stopOpacity={0.1} />
              <stop offset="100%" stopColor={stroke} stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Hidden axes to force full width/height */}
          <XAxis
            dataKey="x"
            type="number"
            domain={[data[0].x, data[data.length - 1].x]}
            hide
          />

          <Area
            type="monotone"
            dataKey="y"
            stroke={stroke}
            strokeWidth={2.5}
            fill="url(#lineGradient)"
            dot={false}
            isAnimationActive={true}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
