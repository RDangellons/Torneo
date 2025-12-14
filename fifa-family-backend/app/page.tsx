'use client';

import { useEffect, useState } from 'react';

// 1. Tipo de cada fila de la tabla
type StandingRow = {
  team_id: number;
  name: string;
  owner_name: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goals_for: number;
  goals_against: number;
  goal_diff: number;
  points: number;
};


export default function Home() {
  // 2. Tipar el estado
  const [standings, setStandings] = useState<StandingRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStandings() {
      try {
        const res = await fetch('/api/standings');
        const data = await res.json();
        if (data.ok) {
          setStandings(data.data);
        } else {
          console.error(data.error);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadStandings();
  }, []);

  return (
    <main className="page-container">
      <h1 className="title">FIFA FAMILY TOURNAMENT</h1>
      <p className="subtitle">
        Tabla de posiciones en tiempo real (36 equipos)
      </p>

      {loading ? (
        <div className="card">Cargando tabla de posiciones...</div>
      ) : (
        <div className="card">
          <div className="table-wrapper">
            <table className="standings-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Equipo</th>
                  <th>Dueño</th>
                  <th>PJ</th>
                  <th>G</th>
                  <th>E</th>
                  <th>P</th>
                  <th>GF</th>
                  <th>GC</th>
                  <th>DG</th>
                  <th>Pts</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((team, index) => (
                  // 3. Key única usando el id del equipo
                  <tr key={team.team_id ?? index}>
                    <td>{index + 1}</td>
                    <td>{team.name}</td>
                    <td>{team.owner_name}</td>
                    <td>{team.played}</td>
                    <td>{team.wins}</td>
                    <td>{team.draws}</td>
                    <td>{team.losses}</td>
                    <td>{team.goals_for}</td>
                    <td>{team.goals_against}</td>
                    <td>{team.goal_diff}</td>
                    <td>{team.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="hint">
            En cada partido sólo capturas los goles y el ganador, y aquí se
            actualiza todo automático 🔥
          </p>
        </div>
      )}
    </main>
  );
}
