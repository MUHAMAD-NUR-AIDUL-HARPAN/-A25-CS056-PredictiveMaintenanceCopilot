import React, { memo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SensorChart = ({
  title,
  data,
  dataKeyHistory,
  dataKeyPrediction,
  color,
  unit,
}) => {
  const gradientId = `colorGradient-${dataKeyHistory}`;

  return (
    <div className="bg-white dark:bg-dark_secondary p-[19px] rounded-2xl shadow-xl border border-slate-300 dark:border-slate-500  flex flex-col overflow-hidden h-full">
      {/* Header Grafik */}
      <div className="flex items-center shrink-0 mb-2">
        <h3 className="text-xs font-semibold text-gray-800 mr-2  dark:text-white">
          {title}
        </h3>
        <span className="text-gray-300">|</span>
      </div>

      {/* Wrapper Grafik */}
      <div className="w-full flex-1 min-h-[200px] relative transform-gpu">
        <div
          className="absolute inset-0"
          style={{ width: "100%", height: "100%", minWidth: 0 }}
        >
          <ResponsiveContainer
            width="100%"
            height="100%"
            debounce={200}
            minWidth={1}
          >
            <AreaChart
              data={data}
              margin={{ top: 10, right: 0, left: -18, bottom: 0 }}
            >
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.6} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.2}
              />

              <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#9CA3AF" }}
                dy={10}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#9CA3AF" }}
                tickFormatter={(value) => `${value}${unit ? " " + unit : ""}`}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(55, 65, 81, 0.9)",
                  color: "#fff",
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                itemStyle={{ color: "#fff", fontSize: "12px" }}
                formatter={(value) => [`${value}${unit ? " " + unit : ""}`]}
                cursor={{
                  stroke: color,
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                  opacity: 0.5,
                }}
                useTranslate3d={true}
                isAnimationActive={true}
                animationDuration={200}
                animationEasing="ease-out"
              />

              {/* Garis Historis */}
              <Area
                type="monotone"
                dataKey={dataKeyHistory}
                stroke={color}
                strokeWidth={3}
                fillOpacity={1}
                fill={`url(#${gradientId})`}
                dot={false}
                activeDot={{
                  r: 6,
                  strokeWidth: 3,
                  stroke: "#fff",
                  fill: color,
                }}
                isAnimationActive={true}
                animationDuration={1000}
                animationEasing="cubic-bezier(0.4, 0, 0.2, 1)"
              />

              {/* Garis Prediksi */}
              <Area
                type="monotone"
                dataKey={dataKeyPrediction}
                stroke={color}
                strokeWidth={3}
                strokeDasharray="5 5"
                fill="none"
                dot={false}
                activeDot={false}
                isAnimationActive={true}
                animationDuration={1000}
                animationEasing="cubic-bezier(0.4, 0, 0.2, 1)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default memo(SensorChart);
