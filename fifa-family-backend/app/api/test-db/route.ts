import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    const result = await sql`SELECT NOW() AS now`;
    return NextResponse.json({
      ok: true,
      now: result.rows[0].now,
    });
  } catch (error: any) {
    console.error('DB error:', error);
    return NextResponse.json(
      {
        ok: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
