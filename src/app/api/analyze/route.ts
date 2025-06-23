import { NextRequest, NextResponse } from 'next/server';
import { AIAnalysisService } from '@/lib/ai-service';
import { AnalysisRequest, ModelType } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: { text: string; model?: ModelType } = await request.json();
    
    if (!body.text || !body.text.trim()) {
      return NextResponse.json(
        { error: 'Text content is required' },
        { status: 400 }
      );
    }

    // Initialize AI service with environment variables
    const aiService = new AIAnalysisService({
      apiKey: process.env.TOGETHER_API_KEY || '',
    });

    const analysisRequest: AnalysisRequest = {
      text: body.text,
      model: body.model || 'llama-70b',
      options: {
        includeRewrites: true,
        includeSuggestions: true,
        detailedAnalysis: true,
        maxSuggestions: 10
      }
    };

    const result = await aiService.analyzePrompt(analysisRequest);
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Analysis failed' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data
    });

  } catch (error) {
    console.error('API Analysis Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'AI Analysis API - Use POST method to analyze prompts' },
    { status: 200 }
  );
} 