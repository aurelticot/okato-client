import { useSnackbar, VariantType } from "notistack";

export const useFeedback = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showFeedback = (message: string, variant: VariantType = "default") => {
    enqueueSnackbar(message, {
      variant,
      persist: false,
    });
  };

  const showInfo = (message: string) => {
    showFeedback(message, "info");
  };

  const showSuccess = (message: string) => {
    showFeedback(message, "success");
  };

  const showError = (message: string) => {
    showFeedback(message, "error");
  };

  return {
    showFeedback,
    showInfo,
    showError,
    showSuccess,
  };
};
