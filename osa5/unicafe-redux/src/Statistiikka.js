import React from 'react';

const Statistiikka = ({stats}) => {
  const palautteita = stats.good + stats.ok + stats.bad;
console.log(stats)
  if (palautteita === 0) {
    return (
      <div>
        <h2>stataistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  const avg = (stats.good + (-stats.bad)) / (stats.good + stats.ok + stats.bad);
  const positive = stats.good / (stats.good + stats.ok + stats.bad) * 100;

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{stats.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{stats.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{stats.bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{avg.toFixed(2)}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{Math.round(positive) + '%'}</td>
          </tr>
        </tbody>
      </table>

      <button>nollaa tilasto</button>
    </div >
  )
};

export default Statistiikka;