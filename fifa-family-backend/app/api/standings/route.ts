import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    const { rows } = await sql`
      SELECT
        t.id AS team_id,
        t.name AS name,
        o.name AS owner_name,
        COALESCE(COUNT(m.id), 0) AS played,
        COALESCE(SUM(
          CASE
            WHEN (m.home_team_id = t.id AND m.home_goals > m.away_goals)
              OR (m.away_team_id = t.id AND m.away_goals > m.home_goals)
            THEN 1 ELSE 0
          END
        ), 0) AS wins,
        COALESCE(SUM(
          CASE
            WHEN m.home_goals = m.away_goals THEN 1
            ELSE 0
          END
        ), 0) AS draws,
        COALESCE(SUM(
          CASE
            WHEN (m.home_team_id = t.id AND m.home_goals < m.away_goals)
              OR (m.away_team_id = t.id AND m.away_goals < m.home_goals)
            THEN 1 ELSE 0
          END
        ), 0) AS losses,
        COALESCE(SUM(
          CASE WHEN m.home_team_id = t.id THEN m.home_goals
               WHEN m.away_team_id = t.id THEN m.away_goals
               ELSE 0 END
        ), 0) AS goals_for,
        COALESCE(SUM(
          CASE WHEN m.home_team_id = t.id THEN m.away_goals
               WHEN m.away_team_id = t.id THEN m.home_goals
               ELSE 0 END
        ), 0) AS goals_against,
        COALESCE(SUM(
          CASE WHEN m.home_team_id = t.id THEN m.home_goals - m.away_goals
               WHEN m.away_team_id = t.id THEN m.away_goals - m.home_goals
               ELSE 0 END
        ), 0) AS goal_diff,
        COALESCE(SUM(
          CASE
            WHEN m.home_goals = m.away_goals THEN 1
            WHEN (m.home_team_id = t.id AND m.home_goals > m.away_goals)
              OR (m.away_team_id = t.id AND m.away_goals > m.home_goals)
            THEN 3
            ELSE 0
          END
        ), 0) AS points
      FROM teams t
      LEFT JOIN owners o ON o.id = t.owner_id
      LEFT JOIN matches m
        ON m.home_team_id = t.id OR m.away_team_id = t.id
      GROUP BY t.id, t.name, o.name
      ORDER BY points DESC, goal_diff DESC, goals_for DESC, t.name ASC;
    `;

    return Response.json({ ok: true, data: rows });
  } catch (error) {
    console.error(error);
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }
}
