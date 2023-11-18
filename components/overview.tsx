"use client";

import { ReactElement } from "react";

import { GraphData } from "@/actions/get-graph-revenue";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface OverviewProps {
  data: GraphData[];
}

export function Overview({ data }: OverviewProps): ReactElement {
  return (
    <ResponsiveContainer
      width="100%"
      height={350}
    >
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: number): string => `€${value}`}
        />
        <Bar
          dataKey="total"
          fill="#3498db"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
