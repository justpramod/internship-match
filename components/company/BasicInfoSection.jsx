import getCompanyLogoUrl from "@/lib/utils/getCompanyLogoUrl";
import Image from "next/image";

export default function BasicInfoSection({ companyDetails }) {
  const companyLogo = getCompanyLogoUrl(companyDetails.logo)
  return (
    <div className="bg-white rounded-lg flex justify-between gap-4 p-4 pr-6">
      <div className="flex gap-4 items-center">
        <div

          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            overflow: "hidden",

          }}
        >
          <Image
            src={companyLogo}
            alt={`${companyDetails.name} logo`}
            width={60}
            height={60}

            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%",
              display: "block",
            }}
          />
        </div>
        <div>
          <h1 className="text-2xl font-semibold ">{companyDetails.name}</h1>
          <p className="text-gray-600">{companyDetails.industry || "--"}</p>
        </div>
      </div>
      <div className="flex gap-8 items-center">
        <div>
          <p className="text-gray-500">Website</p>
          <div className="text-green-600 break-all text-wrap flex items-center gap-1">
            <Image
              src="/globe.svg"
              alt="website_icon"
              width={16}
              height={16}
            />
            <a href={formatUrl(companyDetails.website)} target="_blank" rel="noopener noreferrer"
              className="hover:underline"
              style={{ color: "#16a34a", }}
            >
              {companyDetails.website || "--"}
            </a>
          </div>
        </div>
        <div>
          <p className="text-gray-500">Company Size</p>
          <div className="text-gray-800 flex items-center gap-1">
            <Image
              src="/openings-icon.svg"
              alt="size_icon"
              width={16}
              height={16}
            />
            {companyDetails.company_size || "--"}

          </div>

        </div>
        <div>
          <p className="text-gray-500">Registration Date</p>
          <div className="text-gray-800 flex items-center gap-1">
            <Image
              src="/calendar-icon.svg"
              alt="calendar_icon"
              width={14}
              height={14}
            />
            {companyDetails.joined_on?.toLocaleDateString("en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric",

              }) || "--"}</div>
        </div>

      </div>
    </div>
  );
}

const formatUrl = (url) => {
  if (!url) return "#";

  return url.startsWith("http")
    ? url
    : `https://${url}`;
};