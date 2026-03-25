export type AloeExecutionMode =
  | "connected_execution"
  | "external_implementation";

export type ConnectorAvailability = {
  supabase: boolean;
  vercel: boolean;
  stripe: boolean;
  [key: string]: boolean;
};

export type StarlingToAloeEnvelope = {
  version: "1.0";
  projectId: string;
  sessionId: string;

  objective: {
    title: string;
    problem: string;
    targetUser: string;
    desiredOutcome: string;
  };

  synthesis: {
    summary: string;
    requirements: string[];
    assumptions: string[];
    risks: string[];
    recommendedFramework: string;
  };

  execution: {
    availableConnectors: ConnectorAvailability;
    missingCapabilities: string[];
    mode: AloeExecutionMode;
    rationale: string;
  };

  outputs: {
    shouldProvision: boolean;
    shouldDeploy: boolean;
    shouldGenerateAloeYaml: boolean;
    shouldProduceHandoff: boolean;
  };
};
