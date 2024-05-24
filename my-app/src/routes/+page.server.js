import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    const { answers } = await request.json();

    const cookieValue = JSON.stringify(answers);
    const headers = new Headers();
    headers.append('Set-Cookie', `answers=${cookieValue}; Path=/; HttpOnly; SameSite=Strict`);

    return json({ success: true }, { headers });
}