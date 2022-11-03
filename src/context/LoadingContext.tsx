import { ErrorObject } from "@commercetools/platform-sdk";
import { Context, createContext } from "react";

interface ILoading {
  loading: boolean;
  error: ErrorObject | null;
  setLoading: (state: boolean) => void;
  setLoadingError: (error: ErrorObject | null) => void
}

export const LoadingContext: Context<ILoading> = createContext<ILoading>({
  loading: false,
  error: {} as ErrorObject,
  setLoading: (state: boolean) => Function,
  setLoadingError: (error: ErrorObject | null) => Function
});