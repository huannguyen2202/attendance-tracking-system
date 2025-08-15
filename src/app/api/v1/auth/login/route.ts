import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/server/config/db';
import { loginHandler } from '@/server/controllers/auth.controller';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { user, accessToken, cookieSerialized } = await loginHandler(body);

    return new NextResponse(JSON.stringify({ user, accessToken }), {
      status: 200,
      headers: {
        'Set-Cookie': cookieSerialized,
        'Content-Type': 'application/json'
      }
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Login API Error:', error);
    return NextResponse.json(
      { message: error.message || 'Internal Server Error' },
      { status: error.status || 500 }
    );
  }
}