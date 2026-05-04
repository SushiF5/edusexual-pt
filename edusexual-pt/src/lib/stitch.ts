import { stitch } from "@google/stitch-sdk";

function getStitchProject() {
  if (!process.env.STITCH_API_KEY) {
    throw new Error("Missing STITCH_API_KEY environment variable");
  }
  if (!process.env.STITCH_PROJECT_ID) {
    throw new Error("Missing STITCH_PROJECT_ID environment variable");
  }
  return stitch.project(process.env.STITCH_PROJECT_ID);
}

export async function generateDynamicLayout(prompt: string) {
  if (!process.env.STITCH_API_KEY || !process.env.STITCH_PROJECT_ID) {
    return { htmlUrl: null, imageUrl: null, id: null };
  }

  const stitchProject = getStitchProject();
  try {
    const screen = await stitchProject.generate(prompt);
    const htmlUrl = await screen.getHtml();
    const imageUrl = await screen.getImage();

    return {
      htmlUrl,
      imageUrl,
      id: screen.id
    };
  } catch (error) {
    console.error("Error generating Stitch layout:", error);
    throw error;
  }
}
