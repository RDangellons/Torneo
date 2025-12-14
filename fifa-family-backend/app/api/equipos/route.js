// src/app/api/equipos/route.js
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    // 👇 Cambia 'equipos' y los campos si tu tabla se llama distinto
    const { rows } = await sql`
      SELECT id, name
      FROM teams
      ORDER BY id;
    `;

    return NextResponse.json({
      ok: true,
      equipos: rows,
    });
  } catch (error) {
    console.error('Error consultando equipos:', error);
    return NextResponse.json(
      {
        ok: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
