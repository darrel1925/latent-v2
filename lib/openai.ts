import { NECESSITY_LETTER_PROMPT } from "@/constants/prompts";
import OpenAI from "openai";
import { ReadableStream } from "stream/web";

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

  public async getResponse(prompt: string): Promise<string> {
    const resp = await this.client.chat.completions.create({
      messages: [{ role: "user", content: NECESSITY_LETTER_PROMPT }],
      model: "gpt-4o-mini",
    });

    // Check if the response is valid
    if (!resp.choices[0].message || !resp.choices[0].message.content) {
      throw new Error("No response from Open AI");
    }

    return resp.choices[0].message.content;
  }

  // public async streamCompletion(prompt: string): Promise<ReadableStream> {
  //   const stream = await this.client.chat.completions.create({
  //     model: "gpt-4o-mini",
  //     messages: [{ role: "user", content: NECESSITY_LETTER_PROMPT }],
  //     stream: true,
  //   });

  //   const encoder = new TextEncoder();

  //   return new ReadableStream({
  //     async start(controller) {
  //       for await (const chunk of stream) {
  //         const content = chunk.choices[0]?.delta?.content || "";
  //         controller.enqueue(encoder.encode(content));
  //         console.log(content);
  //       }
  //       console.log("Stream completed");
  //       controller.close();
  //     },
  //   });
  // }
}

const openai = new OpenAIClient();
export { openai };
