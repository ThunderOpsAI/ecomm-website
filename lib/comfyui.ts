export class ComfyUIClient {
  private baseUrl: string;

  constructor(baseUrl: string = process.env.COMFYUI_URL || 'http://127.0.0.1:8188') {
    this.baseUrl = baseUrl;
  }

  /**
   * Submits a ComfyUI workflow JSON to the API.
   * @param promptJson The ComfyUI API JSON format (exported from the UI)
   * @returns The prompt_id which can be used to check status
   */
  async queuePrompt(promptJson: Record<string, any>): Promise<string> {
    const response = await fetch(`${this.baseUrl}/prompt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: promptJson }),
    });

    if (!response.ok) {
      throw new Error(`Failed to queue prompt: ${response.statusText}`);
    }

    const data = await response.json();
    return data.prompt_id;
  }

  /**
   * Checks the history for a specific prompt_id to see if it's finished.
   * @param promptId The ID returned by queuePrompt
   * @returns The history object if finished, or null if still processing
   */
  async getHistory(promptId: string): Promise<any | null> {
    const response = await fetch(`${this.baseUrl}/history/${promptId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch history: ${response.statusText}`);
    }

    const data = await response.json();
    if (data[promptId]) {
      return data[promptId];
    }
    
    return null; // Not finished yet
  }

  /**
   * Helper to construct an image URL for the frontend or for downloading.
   */
  getImageUrl(filename: string, subfolder: string = '', folderType: string = 'output'): string {
    const params = new URLSearchParams({
      filename,
      subfolder,
      type: folderType,
    });
    return `${this.baseUrl}/view?${params.toString()}`;
  }

  /**
   * Waits for a prompt to complete and returns the generated image filenames.
   */
  async waitForCompletion(promptId: string, pollIntervalMs = 2000, maxAttempts = 60): Promise<string[]> {
    for (let i = 0; i < maxAttempts; i++) {
      const history = await this.getHistory(promptId);
      if (history) {
        // Extract output filenames from the history object
        const outputs = history.outputs;
        let filenames: string[] = [];
        
        for (const nodeId in outputs) {
          const nodeOutput = outputs[nodeId];
          if (nodeOutput.images) {
            filenames.push(...nodeOutput.images.map((img: any) => img.filename));
          }
        }
        return filenames;
      }
      // Wait before polling again
      await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
    }
    
    throw new Error('Timeout waiting for ComfyUI prompt to complete');
  }
}

// Export a singleton instance for standard use
export const comfyUI = new ComfyUIClient();
