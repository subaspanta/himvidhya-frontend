import { useEffect } from "react";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";

interface ErrorResponse {
  message?: string;
  error?: string;
}

const STATUS_CODES = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
};

const ERROR_MESSAGES: Record<number, string> = {
  [STATUS_CODES.BAD_REQUEST]: "Invalid request. Please check your input.",
  [STATUS_CODES.UNAUTHORIZED]: "Please log in to continue.",
  [STATUS_CODES.FORBIDDEN]: "You don't have permission to perform this action.",
  [STATUS_CODES.NOT_FOUND]: "The requested resource was not found.",
  [STATUS_CODES.CONFLICT]: "This resource already exists.",
  [STATUS_CODES.UNPROCESSABLE_ENTITY]: "Unable to process your request.",
  [STATUS_CODES.INTERNAL_SERVER_ERROR]: "Something went wrong on our end.",
};

/**
 * Hook for handling API error responses with toast notifications
 * @param error - The Axios error object from API call
 * @param options - Optional configuration for error handling
 */
export function useErrorResponse(
  error?: AxiosError<ErrorResponse> | null,
  options?: {
    showToast?: boolean;
    onError?: (error: AxiosError<ErrorResponse>) => void;
  },
) {
  const { showToast = true, onError } = options || {};

  useEffect(() => {
    if (!error) return;

    const errorCode = error.response?.status;
    const errorData = error.response?.data;

    // Get error message from response or use default
    const errorMessage =
      errorData?.message ||
      errorData?.error ||
      (errorCode && ERROR_MESSAGES[errorCode]) ||
      error.message ||
      "An unexpected error occurred";

    // Show toast notification
    if (showToast) {
      if (errorCode === STATUS_CODES.UNAUTHORIZED) {
        toast.error("Session expired. Please log in again.", {
          duration: 4000,
        });
      } else if (errorCode === STATUS_CODES.FORBIDDEN) {
        toast.error("Access denied", {
          duration: 3000,
        });
      } else if (errorCode && errorCode >= 500) {
        toast.error("Server error. Please try again later.", {
          duration: 4000,
        });
      } else {
        toast.error(errorMessage, {
          duration: 3000,
        });
      }
    }

    // Call optional error callback
    if (onError) {
      onError(error);
    }

    // Log error in development
    if (process.env.NODE_ENV === "development") {
      console.error("API Error:", {
        status: errorCode,
        message: errorMessage,
        url: error.config?.url,
        method: error.config?.method,
      });
    }
  }, [error, showToast, onError]);

  return {
    errorCode: error?.response?.status,
    errorMessage:
      error?.response?.data?.message || error?.response?.data?.error,
    isAuthError: error?.response?.status === STATUS_CODES.UNAUTHORIZED,
    isForbidden: error?.response?.status === STATUS_CODES.FORBIDDEN,
    isNotFound: error?.response?.status === STATUS_CODES.NOT_FOUND,
    isServerError: error?.response?.status
      ? error.response.status >= 500
      : false,
  };
}

/**
 * Utility function to check if error is a specific type
 */
export function isErrorType(
  error: AxiosError | undefined,
  statusCode: number,
): boolean {
  return error?.response?.status === statusCode;
}

/**
 * Utility function to extract error message from AxiosError
 */
export function getErrorMessage(error: AxiosError<ErrorResponse>): string {
  return (
    error.response?.data?.message ||
    error.response?.data?.error ||
    error.message ||
    "An unexpected error occurred"
  );
}
