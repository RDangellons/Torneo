import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

// GET -> lista todos los partidos
export async function GET() {
  try {
    const result = await sql/*sql*/`
      SELECT 
        m.id,
        m.home_team_id,
        ht.name  AS home_team_name,
        m.away_team_id,
        at.name  AS away_team_name,
        m.home_goals,
        m.away_goals,
        m.played_at
      FROM matches m
      JOIN teams ht ON m.home_team_id = ht.id
      JOIN teams at ON m.away_team_id = at.id
      ORDER BY m.played_at DESC;
    `;

    return NextResponse.json({
      ok: true,
      matches: result.rows,
    });
  } catch (error: any) {
    console.error("Error al obtener partidos:", error);
    return NextResponse.json(
      {
        ok: false,
        error: error.message || "Error al obtener los partidos",
      },
      { status: 500 }
    );
  }
}

// POST -> registra un nuevo partido
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const homeTeamId = Number(body.homeTeamId);
    const awayTeamId = Number(body.awayTeamId);
    const homeGoals = Number(body.homeGoals);
    const awayGoals = Number(body.awayGoals);

    if (
      !homeTeamId ||
      !awayTeamId ||
      isNaN(homeGoals) ||
      isNaN(awayGoals)
    ) {
      return NextResponse.json(
        { ok: false, error: "Datos incompletos o inválidos" },
        { status: 400 }
      );
    }

    if (homeTeamId === awayTeamId) {
      return NextResponse.json(
        { ok: false, error: "Un equipo no puede jugar contra sí mismo" },
        { status: 400 }
      );
    }

    const result = await sql/*sql*/`
      INSERT INTO matches (home_team_id, away_team_id, home_goals, away_goals)
      VALUES (${homeTeamId}, ${awayTeamId}, ${homeGoals}, ${awayGoals})
      RETURNING id, home_team_id, away_team_id, home_goals, away_goals, played_at;
    `;

    return NextResponse.json({
      ok: true,
      match: result.rows[0],
    });
  } catch (error: any) {
    console.error("Error al registrar partido:", error);
    return NextResponse.json(
      {
        ok: false,
        error: error.message || "Error al registrar el partido",
      },
      { status: 500 }
    );
  }
}
