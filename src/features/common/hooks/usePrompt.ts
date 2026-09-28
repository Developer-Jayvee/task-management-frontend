import { useEffect, useState } from "react";

export default function usePrompt() {
  const [open, setOpen] = useState<boolean>(false);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [isCancelled, setIsCancelled] = useState<boolean>(false);
  const [promptId, setPromptId] = useState<string | null>(null);
  const [promptDetails, setPromptDetails] = useState<{
    title: string;
    description?: string;
  }>({
    title: "",
    description: "",
  });
  const [afterFn, setAfterFn] = useState<(() => void) | null>(null);
  const configurePrompt = ({
    title,
    description,
    callback,
    promptId,
  }: {
    title: string;
    description ?: string;
    callback: (() => void) | null;
    promptId: string | null;
  }) => {
    if (!promptId) throw new Error("Component ID is required.");
    setPromptId(promptId);
    setPromptDetails({ title, description });
    if (typeof callback != "function")
      throw new Error("Callback is not a function");
    else setAfterFn(() => callback);
  };
  const showPrompt = () => {
    setOpen(!open);
  };
  const confirm = () => {
    try {
      setPromptId(prev => null);
      setIsConfirm(prev => true);
      setOpen(!open);
      afterFn?.();
      resetAll()
    } catch (error) {
      console.warn("Error found in custom prompt", error);
    }
  };

  const cancel = () => {
    setIsConfirm(false);
    setOpen(!open);
    setIsCancelled(false);
  };

  const resetAll = () => {
    if(! promptId) {
        setOpen(prev => false);
        setIsConfirm(prev => false);
        setIsCancelled(prev => false);
        setPromptId(prev => null);
        setPromptDetails(prev => ({ title: "" , description: undefined}));
        setAfterFn(prev => null);
    }
  };
  useEffect(() => {
    resetAll();
  }, [promptId]);

  useEffect(() => {
    console.log(open)
  },[open])
  return {
    open,
    setOpen,
    promptDetails,
    setPromptDetails,
    confirm,
    cancel,
    isConfirm,
    isCancelled,
    configurePrompt,
    showPrompt,
  };
}
