/* Objective: define the shared Aloe action model so the registry and resolver can reason over actions consistently. */

export type AloeExecutionMode =
  | "connected_execution"
  | "external_implementation";

export type AloeArtifactKind =
  | "setup_manifest"
  | "environment_propagation"
  | "environment_sync"
  | "secret_input"
  | "secret_sync"
  | "bootstrap_readiness"
  | "app_bootstrap"
  | "deployment_source_connection"
  | "first_deployment_trigger"
  | "first_deployment_execution"
  | "post_deployment_validation"
  | "client_handoff"
  | "client_handoff_export"
  | "stripe_connection"
  | "stripe_validation"
  | "stripe_handoff"
  | "execution_envelope";

export type AloeActionCategory =
  | "planning"
  | "infrastructure"
  | "deployment"
  | "billing"
  | "handoff";

export type AloeViewKey =
  | "operator_mission_control"
  | "client_handoff"
  | "executive_summary";

export type AloeActionKey =
  | "generate_setup_manifest"
  | "generate_env_propagation"
  | "sync_vercel_env"
  | "save_secret_input"
  | "sync_vercel_secrets"
  | "generate_bootstrap_readiness"
  | "generate_app_bootstrap"
  | "generate_execution_envelope"
  | "generate_deployment_source_connection"
  | "generate_first_deployment_trigger"
  | "generate_first_deployment_execution"
  | "generate_post_deployment_validation"
  | "generate_client_handoff"
  | "generate_client_handoff_export"
  | "generate_stripe_connection"
  | "generate_stripe_validation"
  | "generate_stripe_handoff";

export type AloeActionDefinition = {
  key: AloeActionKey;
  label: string;
  category: AloeActionCategory;
  executionModes: AloeExecutionMode[];
  producedArtifact: AloeArtifactKind;
  prerequisites: AloeArtifactKind[];
  rerunnable: boolean;
  visibleInViews: AloeViewKey[];
  description: string;
};

export type AloeActionStatus = "satisfied" | "available" | "blocked";

export type AloeResolvedAction = {
  key: AloeActionKey;
  label: string;
  category: AloeActionCategory;
  producedArtifact: AloeArtifactKind;
  status: AloeActionStatus;
  rerunnable: boolean;
  missingPrerequisites: AloeArtifactKind[];
  reason: string;
};

export type AloeResolvedActionState = {
  executionMode: AloeExecutionMode;
  available: AloeResolvedAction[];
  satisfied: AloeResolvedAction[];
  blocked: AloeResolvedAction[];
  nextRecommended: AloeResolvedAction | null;
};
