import OpenAI from 'openai';
import { OPENAI_API_KEY } from '@env';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // required for React Native / browser use
});

export const getRizz = async (chatContext: string, tone: string = "flirty"): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a GenZ AI wingman. Your job is to help users flirt and sound cool using a "${tone}" tone.`,
        },
        {
          role: 'user',
          content: chatContext,
        },
      ],
    });

    return response.choices[0].message?.content?.trim() ?? 'Could not generate rizz.';
  } catch (error) {
    console.error('OpenAI Error:', error);
    return 'Something went wrong with WingmanAI 😢';
  }
};
