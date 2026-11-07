"use client";
export default function ResumeDownloadButton({ resumeUrl, fileName }) {
  function handleDownlaod() {
    const a = document.createElement("a");
    a.href = resumeUrl;
    a.download = fileName;
    document.body.append(a);
    console.log(a);
    a.click();
    document.body.removeChild(a);
  }
  return (
    <>
      {resumeUrl && (
        <button
          className="bg-[#15803d] text-white py-2 px-6 rounded cursor-pointer hover:opacity-80 active:opacity-60"
          onClick={handleDownlaod}
        >
          Download
        </button>
      )}
    </>
  );
}
