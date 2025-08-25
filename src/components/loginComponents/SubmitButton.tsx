import { useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";

function SubmitButton({
  title,
  toggleModifyModel,
  isModel,
}: {
  title: string;
  toggleModifyModel: (product: undefined) => void | undefined;
  isModel: boolean;
}) {
  const { pending } = useFormStatus();
  const wasSubmittedRef = useRef(false);
  const prevPendingRef = useRef(pending);

  useEffect(() => {
    if (prevPendingRef.current && !pending) {
      wasSubmittedRef.current = true;
    }
    prevPendingRef.current = pending;

    if (isModel && wasSubmittedRef.current && !pending) {
      toggleModifyModel(undefined);
      // Reset for next use
      wasSubmittedRef.current = false;
    }
  }, [isModel, pending, toggleModifyModel]);

  return (
    <div className="flex flex-col md:mt-3">
      <button
        disabled={pending}
        type="submit"
        className={`sm:text-xl cursor-pointer bg-main font-bold px-6 py-3 md:text-3xl
           mx-auto w-3/4 shadow-sm rounded-lg text-white
           ${pending ? "opacity-70" : ""}
          `}
      >
        {pending ? "Loading..." : title}
      </button>
    </div>
  );
}

export default SubmitButton;