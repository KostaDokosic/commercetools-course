import { HttpErrorType } from "@commercetools/sdk-client-v2";

export interface ErrorResponse {
  body: any;
  error: HttpErrorType;
  statusCode: number;
}