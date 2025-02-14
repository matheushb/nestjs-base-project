export interface HttpExceptionResponse {
  message: string | string[];
  path: string;
  statusCode: number;
  timestamp: Date;
}
