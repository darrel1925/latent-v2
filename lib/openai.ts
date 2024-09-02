import OpenAI from "openai";

class OpenAIClient {
  private client: OpenAI;

  constructor() {
    const organization = process.env.OPENAI_ORGANIZATION || "";
    const project = process.env.OPENAI_PROJECT || "";

    this.client = new OpenAI({
      project,
      organization,
    });
  }

  public async getEmbedding(text: string): Promise<number[]> {
    const response = await this.client.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });

    const embedding = response.data[0].embedding;
    return embedding;
  }
}

const openai = new OpenAIClient();
export { openai };
