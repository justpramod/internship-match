"use client";
import { BarChart, Bar, XAxis, YAxis, LabelList, Cell } from "recharts";

export default function ApplicationStatusGraphSection({
  dashboardData,
  filter,
}) {
  const filterMap = new Map([
    ["1m", "last 1 month"],
    ["3m", "last 3 months"],
    ["6m", "last 6 months"],
    ["all", "all time"],
  ]);
  let filterMessage = "last 1 month";
  if (filterMap.has(filter)) filterMessage = filterMap.get(filter);

  const colorsMap = new Map([
    ["Applied", "#15803d"],
    ["Pending", "#ff6700"],
    ["Shortlisted", "#23b057"],
    ["Rejected", "#f92c37"],
  ]);

  const applicationData = [
    { name: "Applied", value: dashboardData?.totalApplicationsCount },
    { name: "Pending", value: dashboardData?.pendingCount },
    { name: "Shortlisted", value: dashboardData?.shortlistedCount },
    { name: "Rejected", value: dashboardData?.rejectedCount },
  ];

  return (
    <div className="bg-white flex flex-col justify-center items-center rounded-xl p-6 gap-4">
      <div className="flex justify-start w-full">
        <div>
          <p className="text-xl font-semibold">Applications Status</p>
          <p className="text-gray-500 text-sm">
            {" "}
            Total applications processed for {filterMessage}.
          </p>
        </div>
      </div>
      <div className="w-full">
        {dashboardData?.totalApplicationsCount !== 0 ? (
          <BarChart
            style={{
              width: "100%",
              maxWidth: "85vw",
              maxHeight: "35vh",
              aspectRatio: 1.618,
              outline: "none",
            }}
            layout="vertical"
            responsive
            data={applicationData}
            margin={{
              top: 5,
              right: 0,
              left: 0,
              bottom: 5,
            }}
          >
            <XAxis type="number" hide />
            <YAxis
              width="auto"
              dataKey="name"
              type="category"
              axisLine={false}
              tickLine={false}
            />
            <Bar
              dataKey="value"
              radius={[15, 15, 15, 15]}
              barSize={25}
              name={""}
            >
              {" "}
              {applicationData.map((data, index) => {
                const color = colorsMap.get(data?.name) || "#15803d";
                return <Cell key={index} fill={color} />;
              })}
              <LabelList dataKey="value" position="top" offset={7} />
            </Bar>
          </BarChart>
        ) : (
          <div className="flex justify-center items-center h-[35vh] text-gray-500 font-medium">
            No applications were received{" "}
            {filterMessage === "all time"
              ? "for the internships"
              : `for the ${filterMessage}`}
            .
          </div>
        )}
      </div>
      <div className="flex gap-4 justify-between w-full">
        <div className="w-full bg-gray-100 p-4 rounded-xl">
          <p className="text-gray-500">Pending rate</p>
          <p className="font-medium">
            {getFormatedPercent(
              dashboardData.pendingCount,
              dashboardData.totalApplicationsCount,
            ) || "--"}
            % under review
          </p>
        </div>
        <div className="w-full bg-gray-100 p-4 rounded-xl">
          <p className="text-gray-500">Shortlisted rate</p>
          <p className="font-medium">
            {" "}
            {getFormatedPercent(
              dashboardData.shortlistedCount,
              dashboardData.totalApplicationsCount,
            ) || "--"}
            % moved forward
          </p>
        </div>
        <div className="w-full bg-gray-100 p-4 rounded-xl">
          <p className="text-gray-500">Rejected rate</p>
          <p className="font-medium">
            {getFormatedPercent(
              dashboardData.rejectedCount,
              dashboardData.totalApplicationsCount,
            ) || "--"}
            % not selected
          </p>
        </div>
      </div>
    </div>
  );
}

function getFormatedPercent(numerator, denominator) {
  const percent = (numerator / denominator) * 100;
  if (isNaN(percent)) return null;
  return Number(percent.toFixed(2));
}
