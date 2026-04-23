import { stitch } from "@google/stitch-sdk";

if (!process.env.STITCH_API_KEY) {
  throw new Error("Missing STITCH_API_KEY environment variable");
}

if (!process.env.STITCH_PROJECT_ID) {
  throw new Error("Missing STITCH_PROJECT_ID environment variable");
}

export const stitchProject = stitch.project(process.env.STITCH_PROJECT_ID);

export async function generateDynamicLayout(prompt: string) {
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
