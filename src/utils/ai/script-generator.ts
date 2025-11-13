// AI Script Generator for Presentation Coach

interface SlideScript {
  slideIndex: number;
  text: string;
  keyPoints: string[];
  estimatedTime: number;
  suggestions?: string[];
}

// Generate professional speaking script from slide content
export async function generatePresentationScript(
  slideContents: string[],
  presentationTitle: string
): Promise<SlideScript[]> {
  // In production, use OpenAI GPT-4 API
  // For MVP, use template-based generation

  const scripts: SlideScript[] = [];

  slideContents.forEach((content, index) => {
    let scriptText = "";
    const keyPoints = extractKeyPoints(content);

    if (index === 0) {
      // Opening slide
      scriptText = generateOpeningScript(presentationTitle, content);
    } else if (index === slideContents.length - 1) {
      // Closing slide
      scriptText = generateClosingScript(content);
    } else {
      // Content slides
      scriptText = generateContentScript(content, keyPoints);
    }

    scripts.push({
      slideIndex: index,
      text: scriptText,
      keyPoints,
      estimatedTime: estimateSpeakingTime(scriptText),
      suggestions: generateSuggestions(index, content),
    });
  });

  return scripts;
}

// Generate opening script
function generateOpeningScript(title: string, content: string): string {
  return `Good morning everyone, and thank you for joining me today. I'm excited to present "${title}". ${content ? `In this presentation, we'll explore ${content.toLowerCase()}.` : ""} Let's dive right in.`;
}

// Generate closing script
function generateClosingScript(content: string): string {
  return `In conclusion, ${content.toLowerCase()} Thank you for your attention. I'm happy to answer any questions you might have.`;
}

// Generate content script
function generateContentScript(content: string, keyPoints: string[]): string {
  if (keyPoints.length === 0) {
    return `Now, let's discuss ${content.toLowerCase()}. This is an important aspect of our topic that deserves careful consideration.`;
  }

  const intro = `Let me walk you through this next point. `;
  const points = keyPoints.map((point, i) => {
    if (i === 0) return `First, ${point.toLowerCase()}.`;
    if (i === keyPoints.length - 1) return `Finally, ${point.toLowerCase()}.`;
    return `Additionally, ${point.toLowerCase()}.`;
  }).join(" ");

  return intro + points;
}

// Extract key points from slide content
function extractKeyPoints(content: string): string[] {
  // Simple bullet point extraction
  const bullets = content.match(/[•\-\*]\s*(.+)/g);
  if (bullets) {
    return bullets.map(b => b.replace(/[•\-\*]\s*/, "").trim());
  }

  // If no bullets, split by sentences
  const sentences = content
    .split(/[.!?]\s+/)
    .filter(s => s.trim().length > 10)
    .slice(0, 4);

  return sentences;
}

// Estimate speaking time (words / 140 WPM)
function estimateSpeakingTime(text: string): number {
  const words = text.split(/\s+/).length;
  return Math.round((words / 140) * 60); // seconds
}

// Generate slide-specific suggestions
function generateSuggestions(slideIndex: number, content: string): string[] {
  const suggestions: string[] = [];

  if (slideIndex === 0) {
    suggestions.push("Make eye contact with the audience");
    suggestions.push("Speak with confidence and enthusiasm");
    suggestions.push("Set the stage for what's to come");
  } else {
    if (content.length > 200) {
      suggestions.push("Break down complex information into digestible parts");
    }
    if (content.match(/\d+%|\$[\d,]+/)) {
      suggestions.push("Emphasize key numbers and statistics");
    }
    suggestions.push("Pause briefly after each main point");
  }

  return suggestions;
}

// Generate GPT-4 based script (for production)
export async function generateAIScript(
  slideContent: string,
  slideIndex: number,
  totalSlides: number,
  apiKey: string
): Promise<string> {
  // Example OpenAI integration
  /*
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a professional presentation coach. Generate natural, engaging speaking scripts for presentation slides."
        },
        {
          role: "user",
          content: `Generate a professional speaking script for slide ${slideIndex + 1} of ${totalSlides}. Slide content: "${slideContent}". Keep it conversational and engaging, around 30-40 seconds of speaking time.`
        }
      ],
      temperature: 0.7,
      max_tokens: 200,
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content;
  */

  // Fallback for MVP
  return generateContentScript(slideContent, extractKeyPoints(slideContent));
}

// Real-time script matching during practice
export function matchSpokenTextToScript(
  spokenText: string,
  scriptSegments: string[]
): {
  matchedSegmentIndex: number;
  matchScore: number;
} {
  // Simple word overlap matching
  // In production, use semantic similarity or embeddings

  const spokenWords = new Set(
    spokenText.toLowerCase()
      .split(/\s+/)
      .filter(w => w.length > 3)
  );

  let bestMatch = 0;
  let bestScore = 0;

  scriptSegments.forEach((segment, index) => {
    const segmentWords = new Set(
      segment.toLowerCase()
        .split(/\s+/)
        .filter(w => w.length > 3)
    );

    const intersection = [...spokenWords].filter(w => segmentWords.has(w));
    const score = intersection.length / segmentWords.size;

    if (score > bestScore) {
      bestScore = score;
      bestMatch = index;
    }
  });

  return {
    matchedSegmentIndex: bestMatch,
    matchScore: Math.round(bestScore * 100),
  };
}
