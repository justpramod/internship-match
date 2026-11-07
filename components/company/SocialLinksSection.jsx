import Image from "next/image";

export default function SocialLinksSection({ companySocialLinks }) {
  return (<div className="bg-white p-4 w-full rounded-lg flex flex-col gap-4">
    <div className="flex items-center gap-2 border-b pt-2 pb-4">
      <Image
        src="/social-links-icon.svg"
        alt="social_links_icon"
        width={16}
        height={16}
      />
      <h2 className="text-xl font-semibold">Social Links</h2>

    </div>
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <p className="font-medium text-gray-500"> Linkedin</p>
        <a
          className="bg-gray-100 py-2 px-4 rounded-lg break-all text-wrap hover:underline"
          style={{ color: "#16a34a", }}
          href={formatUrl(companySocialLinks?.linkedin)}
          target="_blank"
          rel="noopener noreferrer">
          {companySocialLinks?.linkedin || "--"}
        </a>

      </div>
      <div className="flex flex-col gap-1"  >
        <p className="font-medium text-gray-500"> X</p>
        <a className="bg-gray-100 py-2 px-4 rounded-lg break-all text-wrap hover:underline"
          style={{ color: "#16a34a", }}
          href={formatUrl(companySocialLinks?.x)}
          target="_blank"
          rel="noopener noreferrer">
          {companySocialLinks?.x || "--"}
        </a>
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-medium text-gray-500"> Facebook</p>
        <a className="bg-gray-100 py-2 px-4 rounded-lg break-all text-wrap hover:underline"
          style={{ color: "#16a34a", }}
          href={formatUrl(companySocialLinks?.facebook)}
          target="_blank"
          rel="noopener noreferrer">
          {companySocialLinks?.facebook || "--"}
        </a>
      </div>
    </div>

  </div>);
}

const formatUrl = (url) => {
  if (!url) return "#";

  return url.startsWith("http")
    ? url
    : `https://${url}`;
};