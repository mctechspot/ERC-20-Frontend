import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai";
export async function POST(request: NextRequest, response: NextResponse) {
    try {
        const payload = await request.json();
        const generatedToken = await generateToken(payload.prompt);
        return NextResponse.json({ "response": generatedToken }, { status: 200 });

    } catch (error: any) {
        console.log(`Error generation token: ${error.message}.`)
        return NextResponse.json({ "error": error.message }, { status: 500 });
    }
}

// Function to generate token and token image
const generateToken = async (prompt: string) => {
    const openai = new OpenAI();
    const token = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: `You are a helpful assistant designed to output JSON to create an ERC-20 token.\
        Return the following keys: name (token name), symbol(token symbol). \ 
        Use this user prompt for inspiration: ${prompt}. Be creative. Don't include the word token in the name. \
        Don't include spaces in the name. Token should be three characters and capitalised.`,
            },
        ],
        model: "gpt-3.5-turbo-0125",
        response_format: { type: "json_object" }
    });

    // Get token image
    let image_url = null;

    const tokenImage = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
    });
    image_url = tokenImage.data[0].url;

    const tokenChoice = JSON.parse(token.choices[0].message.content!);
    return { ...tokenChoice, image: image_url };
}