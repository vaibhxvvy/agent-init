// agent-init opencode plugin — skill companion (ponytail-style packaging).
// Loads cleanly via `plugin: ["agent-init"]`. No hooks in v1; reserved for future guards.
export const AgentInitPlugin = async ({ client }) => {
  try {
    await client.app.log({
      body: { service: "agent-init", level: "info", message: "agent-init skill loaded" },
    });
  } catch {}
  return {};
};
