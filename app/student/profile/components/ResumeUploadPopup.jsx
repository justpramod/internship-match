import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useActionState, useEffect, useRef, useState } from "react";
import { getFileSizeKB } from "@/utils/getFileSizeKb";
import handleResumeSubmitAction from "@/actions/student/handleResumeUploadAction";
import LoadingButton from "@/components/ui/LoadingButton";
export default function ResumeUploadPopup({ open, setOpen }) {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);

  const [isDragging, setIsDragging] = useState(false);

  const [error, setError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const [response, formAction, isPending] = useActionState(
    handleResumeSubmitAction,
    null,
  );

  const handleClick = (e) => {
    if (file) return;
    if (inputRef) {
      inputRef.current.click();
    }
  };

  const handleFile = (file) => {
    setError(null);
    if (!file) return;
    if (file.type !== "application/pdf") {
      setError("Only .pdf format is supported!");
      return;
    }
    if (file.size > 1024 * 500) {
      setError("File size should be less than 500KB!");

      return;
    }

    console.log(file);
    setFile(file);
    //put the file in the input for the action to work on form submit
    //inputRef.target.files = droppedFile, this wont work as the files expects a fileList
    //so we nee a browser api DataTransfer
    const dt = new DataTransfer(); //a container
    dt.items.add(file); //add the file
    inputRef.current.files = dt.files; //dt.files returns a file list.
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFile(null);
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  useEffect(() => {
    if (!open) {
      setFile(null);
      setError(null);
      setIsDragging(false);
      setUploadSuccess(false);
    }
  }, [open]);

  useEffect(() => {
    if (response?.error) {
      setError(response.error);
    }
    if (response?.success) {
      setUploadSuccess(true);
    }
  }, [response]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md bg-[#f5f6fc]">
        <form action={formAction}>
          {" "}
          <div className="flex flex-col gap-3 mt-5 ">
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => handleFile(e.target.files[0])}
              name="file"
            />

            <div
              className={`flex flex-col px-4 ${
                isDragging ? "border-green-500 bg-green-50" : "border-gray-300"
              } items-center border-2 border-dotted py-18 gap-1 cursor-pointer ${!file && "hover:opacity-80 active:opacity-60"} select-none`}
              onClick={handleClick}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDrop={handleDrop}
              onDragLeave={() => setIsDragging(false)}
            >
              {" "}
              {uploadSuccess ? (
                <div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 relative">
                      <Image src="/success-icon.svg" fill alt="success-icon" />
                    </div>
                    <div className=" font-semibold text-xl text-[#55ab67]">
                      SUCCESS
                    </div>
                  </div>
                  <div>Resume was uploaded successfully.</div>
                </div>
              ) : file ? (
                <div className="flex gap-3 items-center bg-gray-200 border py-1 px-2 rounded ">
                  <div className="flex items-center gap-2 ">
                    {" "}
                    <div className="relative h-8 w-8">
                      <Image src="/file-logo.svg" fill alt="file-icon" />
                    </div>
                    <div className="flex flex-col items-center  ">
                      {" "}
                      <p>{file.name}</p>
                      <p>{getFileSizeKB(file.size)}</p>
                    </div>{" "}
                    <div className="border-l-2 border-balck">
                      <button
                        className="cursor-pointer hover:opacity-80 active:opacity-60 rounded-full bg-gray-600 text-white px-2 py-0.5 ml-2 flex items-center"
                        type="button"
                        onClick={() => {
                          setFile(null);
                          setError(null);

                          inputRef.current.value = "";
                        }}
                      >
                        x
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {" "}
                  <div className="relative h-8 w-8 ">
                    <Image src="/upload.svg" fill alt="upload-icon" />
                  </div>
                  {isDragging ? (
                    <div>Drop it here</div>
                  ) : (
                    <div className="text-center">
                      <p>Drag and drop your profile picture or click here</p>{" "}
                      <p className="text-gray-500">(pdf file, 500KB max) </p>
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="text-red-400 text-center">
              {error && <p>{error}</p>}
            </div>
            {file && !uploadSuccess && (
              <div className="flex justify-end pr-4 select-none">
                <button
                  className=" bg-[#15803d] text-white px-2 py-1 rounded"
                  type="submit"
                >
                  <LoadingButton
                    initialValue="Upload"
                    pendingValue="Uploading"
                    isPending={isPending}
                  />
                </button>
              </div>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
