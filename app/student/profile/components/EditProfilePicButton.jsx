"use client";
import handleUploadLogoAction from "@/actions/company/handleUploadLogoAction";
import handleDeleteProfilePicAction from "@/actions/student/handleDeleteProfilePicAction";
import handleUploadProfilePicAction from "@/actions/student/handleUploadProfilePicAction";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import LoadingButton from "@/components/ui/LoadingButton";
import Image from "next/image";
import { useActionState, useEffect, useRef, useState } from "react";

export default function EditProfilePicButton({ profilePicSrc, companyLogo }) {
  const [popup, setPopup] = useState(false);
  const [uploadArea, setuploadArea] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [uploadState, formAction, isPending] = useActionState(
    companyLogo ? handleUploadLogoAction : handleUploadProfilePicAction,
    null,
  );

  const [previewUrl, setPreviewUrl] = useState(null);

  function checkDefaultUrl() {
    if (companyLogo) return true;

    const imageName = profilePicSrc.split("/").pop();
    if (imageName === "profile-pics_default_profile_pic.jpg") return true;
    return false;
  }

  const handleClick = (e) => {
    if (image) return;
    if (inputRef) {
      inputRef.current.click();
    }
  };
  const handleImage = (image, isDropped = false) => {
    setError(null);
    if (!image) return;
    console.log(image);
    if (image.type !== "image/jpeg") {
      setError("Only .jpg format is supported!");
      return;
    }
    if (image.size > 1024 * 2 * 1024) {
      setError("File size should be less than 2MB!");

      return;
    }

    const imageUrl = URL.createObjectURL(image);
    setPreviewUrl(imageUrl);

    setImage(image);

    if (isDropped) {
      const dt = new DataTransfer();
      dt.items.add(image);
      inputRef.current.files = dt.files;
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setImage(null);
    setIsDragging(false);
    const droppedImage = e.dataTransfer.files[0];
    handleImage(droppedImage, true);
  };

  function handleCancel() {
    setuploadArea(false);
    setImage(null);
    setError(null);
  }

  async function handleDelete() {
    setIsDeleting(true);
    const res = await handleDeleteProfilePicAction();
    if (!res.success) {
      setError(res.error);
      setIsDeleting(false);
      return;
    }
    setPopup(false);
    setIsDeleting(false);
  }

  useEffect(() => {
    if (uploadState?.error) {
      setError(uploadState.error);
    } else {
      setError(null);
      setPopup(false);
    }
  }, [uploadState]);

  useEffect(() => {
    if (!popup) {
      //reset all states after popup closes
      setError(null);
      setImage(null);
      setuploadArea(false);
      setIsDragging(false);
      setIsDeleting(false);
    }
  }, [popup]);

  return (
    <>
      <div
        className={`${!companyLogo && "absolute z-1  right-5 top-2 "} bg-white  rounded-full p-1 flex`}
      >
        <button
          className={`${companyLogo && "border font-medium px-2 py-1 rounded"}  flex w-full justify-center items-center gap-2 cursor-pointer hover:opacity-70 active:opacity-50 `}
          onClick={() => {
            setPopup(true);
          }}
        >
          {" "}
          <div className="relative w-5 h-5 flex cursor-pointer hover:opacity-70 active:opacity-50 ">
            {" "}
            <Image src="/edit-logo.svg" alt="edit-icon" fill />{" "}
          </div>
          {companyLogo && "Edit Logo"}
        </button>
      </div>{" "}
      <Dialog open={popup} onOpenChange={setPopup}>
        <DialogContent className="min-w-[40vw] pt-3 pb-8">
          {uploadArea ? (
            <form action={formAction}>
              {" "}
              <div className="flex flex-col gap-2 mt-5">
                <div className="text-xl font-medium">
                  Upload new profile picture.{" "}
                </div>{" "}
                <div
                  className={`flex flex-col ${isDragging ? "border-green-500 bg-green-50" : "border-gray-300"}  select-none py-2 items-center border-2 ${!image && "hover:opacity-80 active:opacity-60 h-[40vh]"}  border-dotted gap-1 cursor-pointer `}
                  onClick={handleClick}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDrop={handleDrop}
                  onDragLeave={() => setIsDragging(false)}
                >
                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/jpg"
                    className="hidden"
                    onChange={(e) => handleImage(e.target.files[0])}
                    name="file"
                  />{" "}
                  {image ? (
                    <div>
                      {" "}
                      <div className="flex justify-center">
                        <div className="relative w-[20vw] h-[20vw] rounded-full border overflow-hidden">
                          <Image
                            src={previewUrl}
                            alt="profile_pic"
                            fill
                            className="object-cover"
                          />{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>
                  ) : (
                    <div className="flex flex-col justify-center h-full">
                      {" "}
                      <div className="flex justify-center">
                        {" "}
                        <div className="relative h-8 w-8 ">
                          <Image src="/upload.svg" fill alt="upload-icon" />
                        </div>
                      </div>
                      {isDragging ? (
                        <div>Drop it here</div>
                      ) : (
                        <div className="text-center">
                          <p>
                            Drag and drop your profile picture or click here
                          </p>{" "}
                          <p className="text-gray-500">(jpg file, 2MB max) </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {error && (
                  <div className="text-center text-red-400">{error}</div>
                )}
                <div className="flex justify-between px-5">
                  <button
                    className="px-2 py-1  rounded select-none border cursor-pointer bg-gray-100 hover:opacity-70 transition active:opacity-60"
                    onClick={handleCancel}
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className={` px-2 py-1 rounded select-none ${image ? "bg-[#15803d]  hover:opacity-80 active:opacity-60 cursor-pointer text-white  " : "cursor-not-allowed bg-gray-100 "} `}
                    type="submit"
                    disabled={isPending || !image}
                  >
                    <LoadingButton
                      initialValue="Upload"
                      pendingValue="Uploading"
                      isPending={isPending}
                    />
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="text-xl font-medium">
                Edit your profile picture.
              </div>
              <div className={`flex justify-center`}>
                <div className="relative w-[20vw] h-[20vw] border rounded-full overflow-hidden">
                  <Image
                    src={profilePicSrc}
                    alt="profile_pic"
                    fill
                    className="object-cover"
                  />{" "}
                </div>{" "}
              </div>{" "}
              <div
                className={`flex px-8 ${checkDefaultUrl() ? "justify-center" : "justify-between"}`}
              >
                {" "}
                {error && (
                  <div className="text-center text-red-400">{error}</div>
                )}
                <div
                  className={`px-2 py-1  rounded select-none border cursor-pointer bg-red-100 text-red-600 hover:bg-red-200 transition active:opacity-70 ${checkDefaultUrl() && "hidden"}`}
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  <LoadingButton
                    initialValue="Delete"
                    pendingValue="Deleting"
                    isPending={isDeleting}
                  />
                </div>
                <div
                  className=" bg-[#15803d] text-white px-2 py-1 rounded select-none hover:opacity-80 active:opacity-60 cursor-pointer"
                  onClick={() => {
                    setuploadArea(true);
                  }}
                >
                  Upload new
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
