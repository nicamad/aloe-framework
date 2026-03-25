/* Objective: resolve action state dynamically from the execution envelope and latest artifacts. */

import { ALOE_ACTION_REGISTRY } from "./registry.js";
import type {
  AloeArtifactKind,
  AloeExecutionMode,
  AloeResolvedAction,
  AloeResolvedActionState,
} from "./types.js";

export function resolveAloeActions(args: {
  executionMode: AloeExecutionMode;
  presentArtifacts: AloeArtifactKind[];
}) : AloeResolvedActionState {
  const present = new Set(args.presentArtifacts);

  const resolved: AloeResolvedAction[] = ALOE_ACTION_REGISTRY
    .filter((action) => action.executionModes.includes(args.executionMode))
    .map((action) => {
      const missingPrerequisites = action.prerequisites.filter((kind) => !present.has(kind));
      const alreadyProduced = present.has(action.producedArtifact);

      if (alreadyProduced) {
        return {
          key: action.key,
          label: action.label,
          category: action.category,
          producedArtifact: action.producedArtifact,
          status: "satisfied" as const,
          rerunnable: action.rerunnable,
          missingPrerequisites: [],
          reason: "Artifact already exists.",
        };
      }

      if (missingPrerequisites.length === 0) {
        return {
          key: action.key,
          label: action.label,
          category: action.category,
          producedArtifact: action.producedArtifact,
          status: "available" as const,
          rerunnable: action.rerunnable,
          missingPrerequisites: [],
          reason: "All prerequisites are satisfied.",
        };
      }

      return {
        key: action.key,
        label: action.label,
        category: action.category,
        producedArtifact: action.producedArtifact,
        status: "blocked" as const,
        rerunnable: action.rerunnable,
        missingPrerequisites,
        reason: `Missing prerequisites: ${missingPrerequisites.join(", ")}.`,
      };
    });

  const available = resolved.filter((x) => x.status === "available");
  const satisfied = resolved.filter((x) => x.status === "satisfied");
  const blocked = resolved.filter((x) => x.status === "blocked");

  return {
    executionMode: args.executionMode,
    available,
    satisfied,
    blocked,
    nextRecommended: available[0] ?? null,
  };
}
