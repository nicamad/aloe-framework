# Execution Modes

## connected_execution

Use this mode when the required capabilities are available through currently connected platforms.

Typical examples:
- Supabase is connected for data/backend needs
- Vercel is connected for deployment
- Stripe is connected for billing

In this mode, Aloe Operator should:
- provision and wire the stack
- validate the deployment
- generate handoff artifacts

## external_implementation

Use this mode when the requested service cannot be fully executed through the currently connected platform set.

Typical examples:
- a required connector is missing
- the service depends on unsupported infrastructure
- the implementation requires an external integration path

In this mode, Aloe Operator should:
- generate the execution envelope
- identify missing capabilities
- produce aloe.yaml and an external build plan
- preserve handoff outputs for operator/client review
