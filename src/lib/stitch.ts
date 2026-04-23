// Stitch SDK wrapper — initialised lazily so missing env vars don't crash the build

export async function generateDynamicLayout(prompt: string) {
  const apiKey = process.env.STITCH_API_KEY;
  const projectId = process.env.STITCH_PROJECT_ID;

  if (!apiKey || !projectId) {
    throw new Error("Missing STITCH_API_KEY or STITCH_PROJECT_ID environment variables");
  }

  // Dynamically import the SDK so it is never evaluated at build-time
  const { stitch } = await import("@google/stitch-sdk");

  const project = stitch.project(projectId);
  const screen = await project.generate(prompt);
  const htmlUrl = await screen.getHtml();
  const imageUrl = await screen.getImage();

  return {
    htmlUrl,
    imageUrl,
    id: screen.id,
  };
}
