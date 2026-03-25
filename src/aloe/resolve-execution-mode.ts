import type {
  AloeExecutionMode,
  ConnectorAvailability,
} from "./execution-envelope.js";

export function resolveExecutionMode(args: {
  connectors: ConnectorAvailability;
  requiredCapabilities: string[];
}) {
  const { connectors, requiredCapabilities } = args;

  const capabilityMap: Record<string, boolean> = {
    supabase: Boolean(connectors.supabase),
    vercel: Boolean(connectors.vercel),
    stripe: Boolean(connectors.stripe),
  };

  const missingCapabilities = requiredCapabilities.filter(
    (capability) => !capabilityMap[capability],
  );

  const mode: AloeExecutionMode =
    missingCapabilities.length === 0
      ? "connected_execution"
      : "external_implementation";

  const rationale =
    mode === "connected_execution"
      ? "All required capabilities are available through connected platforms."
      : `Missing capabilities prevent direct execution: ${missingCapabilities.join(", ")}.`;

  return {
    mode,
    missingCapabilities,
    rationale,
  };
}
