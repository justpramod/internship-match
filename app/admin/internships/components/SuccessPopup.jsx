
import { Dialog, DialogContent } from "@/components/ui/dialog";
export default function SuccessPopup({ open, setOpen }) {

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (!val) {
          setOpen(false);
        }
      }}
    >
      <DialogContent className="sm:max-w-md bg-[#f5f6fc]">


        <div className="flex flex-col items-center gap-2  p-6">
          <p className="font-medium text-gray-500">Internship was deleted successfully.</p>
          <button
            onClick={() => setOpen(false)}
            className="px-6 bg-[#15803d] py-2 rounded text-white cursor-pointer hover:opacity-70 active:opacity-50"
          >
            Ok
          </button>
        </div>

      </DialogContent>
    </Dialog>
  );
}