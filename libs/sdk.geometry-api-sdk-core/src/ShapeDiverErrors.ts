export const ShapeDiverErrorType = {
  Generic: "sd_gb_sdk_generic",
  Request: "sd_gb_sdk_request",
  Response: "sd_gb_sdk_response",
} as const;
export type ShapeDiverErrorType =
  (typeof ShapeDiverErrorType)[keyof typeof ShapeDiverErrorType];

export class ShapeDiverError extends Error {
  public readonly errorType: ShapeDiverErrorType = ShapeDiverErrorType.Generic;

  constructor(message: string) {
    super(message);
  }
}

export class ShapeDiverRequestError extends ShapeDiverError {
  public readonly errorType: ShapeDiverErrorType = ShapeDiverErrorType.Request;

  constructor(
    public readonly desc: string,
    message: string,
  ) {
    super(message);
  }
}

export class ShapeDiverResponseError extends ShapeDiverError {
  public readonly errorType: ShapeDiverErrorType = ShapeDiverErrorType.Response;

  constructor(
    message: string,
    public readonly status: number,
    public readonly error: string,
    public readonly desc: string,
    public readonly headers: { [key: string]: any },
  ) {
    super(message);
  }
}
