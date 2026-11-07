"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { useEffect, useState } from "react";

export default function MostAppliedGraphSection({ internshipData, filter }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateIsMobile = () => setIsMobile(mediaQuery.matches);

    updateIsMobile();
    mediaQuery.addEventListener("change", updateIsMobile);

    return () => mediaQuery.removeEventListener("change", updateIsMobile);
  }, []);

  const filterMap = new Map([
    ["1m", "last 1 month"],
    ["3m", "last 3 months"],
    ["6m", "last 6 months"],
    ["all", "all time"],
  ]);
  let filterMessage = "last 1 month";
  if (filterMap.has(filter)) filterMessage = filterMap.get(filter);

  return (
    <div className="bg-white flex flex-col justify-center items-center rounded-xl p-6 gap-4">
      <div className="flex justify-start w-full">
        <div>
          <p className="text-xl font-semibold">Most Applied Internships</p>
          <p className="text-gray-500 text-sm">
            {" "}
            Top internships by applications for {filterMessage}.
          </p>
        </div>
      </div>
      <div className="w-full">
        {internshipData?.length !== 0 ? (
          <BarChart
            style={{
              width: "100%",
              maxWidth: "90vw",
              maxHeight: "35vh",
              aspectRatio: 1.618,
            }}
            responsive
            data={internshipData}
            margin={{
              top: 5,
              right: isMobile ? 8 : 0,
              left: isMobile ? 20 : 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="title"
              angle={isMobile ? -35 : 0}
              height={isMobile ? 70 : 30}
              interval={isMobile ? 0 : "preserveStartEnd"}
              textAnchor={isMobile ? "end" : "middle"}
              tick={{ fontSize: isMobile ? 10 : 12 }}
              tickFormatter={(title) =>
                isMobile && title.length > 16
                  ? `${title.slice(0, 16)}...`
                  : title
              }
            />
            <YAxis width="auto" />
            <Tooltip />
            <Bar
              dataKey="total_applications_count"
              fill="#15803d"
              radius={[10, 10, 0, 0]}
              name={"Total Applications"}
              barSize={60}
            />
          </BarChart>
        ) : (
          <div className="flex justify-center items-center h-[35vh] text-gray-500 font-medium">
            Your company haven&apos;t posted any internships{" "}
            {filterMessage === "all time" ? "yet" : `for the ${filterMessage}`}.
          </div>
        )}
      </div>
      <div className="flex gap-4 justify-between w-full">
        <div className="w-full bg-gray-100 p-4 rounded-xl">
          <p className="text-gray-500">Highest Interest</p>
          <p className="font-medium">
            {getHighestInterest(internshipData) || "--"}{" "}
          </p>
        </div>
        <div className="w-full bg-gray-100 p-4 rounded-xl">
          <p className="text-gray-500">Average applicantions</p>
          <p className="font-medium">
            {getAverageApplicants(internshipData) || "--"}{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

function getHighestInterest(internshipData) {
  if (!internshipData) return null;
  let highesInterest = {
    value: internshipData[0]?.total_applications_count,
    index: 0,
  };

  internshipData.forEach((item, index) => {
    if (item.total_applications_count > highesInterest.value) {
      highesInterest.value = item.total_applications_count;
      highesInterest.index = index;
    }
  });
  return internshipData[highesInterest.index]?.title;
}

function getAverageApplicants(internshipData) {
  let count = 0;
  if (!internshipData) return null;
  internshipData.forEach((item) => {
    count += item.total_applications_count;
  });
  return Math.round(count / internshipData?.length);
}
