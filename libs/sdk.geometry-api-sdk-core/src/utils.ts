/**
 * Function to indicate unreachable paths to the TypeScript compiler.
 * @param _
 * @throws {@link ShapeDiverError} if called.
 */
import { ShapeDiverError } from "./ShapeDiverErrors";

export function sdAssertUnreachable(_: never): never {
  throw new ShapeDiverError("Reached unreachable block");
}
