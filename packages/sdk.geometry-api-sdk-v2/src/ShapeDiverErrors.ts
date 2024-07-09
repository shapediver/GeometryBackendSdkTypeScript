import {
  ShapeDiverResponseError as ShapeDiverResponseErrorDto,
  ShapeDiverResponseErrorType,
} from "@shapediver/api.geometry-api-dto-v2";
import {
  ShapeDiverError,
  ShapeDiverErrorType,
  ShapeDiverResponseError as ShapeDiverResponseErrorCore,
} from "@shapediver/sdk.geometry-api-sdk-core";

/* Replaces core/ShapeDiverErrors/ShapeDiverResponseError with DTOv2-types */
export class ShapeDiverResponseError
  extends ShapeDiverError
  implements ShapeDiverResponseErrorDto
{
  public readonly errorType: ShapeDiverErrorType = ShapeDiverErrorType.Response;

  public readonly status: number;
  public readonly error: ShapeDiverResponseErrorType;
  public readonly desc: string;

  constructor(e: ShapeDiverResponseErrorCore) {
    super(e.message);

    this.status = e.status;
    this.desc = e.desc;

    this.error = Object.values(ShapeDiverResponseErrorType).includes(
      e.error as any,
    )
      ? (e.error as ShapeDiverResponseErrorType)
      : ShapeDiverResponseErrorType.UNKNOWN;
  }
}
