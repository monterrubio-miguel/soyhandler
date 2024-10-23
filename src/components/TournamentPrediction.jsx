import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/card';
import { ChevronUp, ChevronDown, Share2 } from 'lucide-react';

const TournamentPrediction = ({ initialTeams, division }) => {
  const [rankings, setRankings] = useState(() => {
    const saved = localStorage.getItem(`poolRankings-${division}`);
    return saved
      ? JSON.parse(saved)
      : {
          A: [...initialTeams.A],
          B: [...initialTeams.B],
          C: [...initialTeams.C],
          D: [...initialTeams.D],
        };
  });

  const [showBracket, setShowBracket] = useState(false);
  const [bracketResults, setBracketResults] = useState(() => {
    const saved = localStorage.getItem(`bracketResults-${division}`);
    return saved
      ? JSON.parse(saved)
      : {
          preQuarters: Array(4).fill({ team1: null, team2: null, winner: null }),
          quarterFinals: Array(4).fill({ team1: null, team2: null, winner: null }),
          semiFinals: Array(2).fill({ team1: null, team2: null, winner: null }),
          finals: [{ team1: null, team2: null, winner: null }],
        };
  });

  useEffect(() => {
    localStorage.setItem(`poolRankings-${division}`, JSON.stringify(rankings));
  }, [rankings, division]);

  useEffect(() => {
    localStorage.setItem(`bracketResults-${division}`, JSON.stringify(bracketResults));
  }, [bracketResults, division]);

  useEffect(() => {
    // With HashRouter, we need to parse the hash part of the URL
    const hash = window.location.hash;
    const searchParams = new URLSearchParams(hash.split('?')[1]);
    const encodedData = searchParams.get('state');

    if (encodedData) {
      try {
        const decodedData = JSON.parse(atob(encodedData));
        // Only load if the division matches
        if (decodedData.division === division) {
          setRankings(decodedData.rankings);
          setBracketResults(decodedData.bracketResults);
          setShowBracket(true);
        }
      } catch (e) {
        console.error('Failed to load state from URL');
      }
    }
  }, [division]);

  const shareState = () => {
    const state = {
      rankings,
      bracketResults,
      division, // Include division in shared state
    };
    const encodedState = btoa(JSON.stringify(state));
    // For HashRouter, we need to include the current path
    const url = `${window.location.origin}${window.location.pathname}#${window.location.pathname}?state=${encodedState}`;

    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(url)
        .then(() => alert('Link copied to clipboard!'))
        .catch(() => alert('Failed to copy link. Please copy the URL manually.'));
    } else {
      alert('Please copy the URL from your browser address bar to share.');
    }
  };

  const moveTeam = (groupLetter, currentIndex, direction) => {
    if ((direction === 'up' && currentIndex === 0) || (direction === 'down' && currentIndex === rankings[groupLetter].length - 1)) {
      return;
    }

    setRankings(prev => {
      const newRankings = { ...prev };
      const newGroupOrder = [...prev[groupLetter]];
      const swapIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      [newGroupOrder[currentIndex], newGroupOrder[swapIndex]] = [newGroupOrder[swapIndex], newGroupOrder[currentIndex]];
      newRankings[groupLetter] = newGroupOrder;
      return newRankings;
    });
  };

  const generateBracket = () => {
    // Get teams from each pool
    const pools = {};
    Object.entries(rankings).forEach(([pool, teams]) => {
      pools[pool] = {
        first: teams[0],
        second: teams[1],
        third: teams[2],
      };
    });

    // Create pre-quarters matchups according to seeding
    const preQuarters = [
      // Game 1: P2 of Pool B vs P3 of Pool C
      {
        team1: pools.B.second,
        team2: pools.C.third,
        winner: null,
        feedsIntoQuarter: 0,
      },
      // Game 2: P3 of Pool B vs P2 of Pool C
      {
        team1: pools.B.third,
        team2: pools.C.second,
        winner: null,
        feedsIntoQuarter: 1,
      },
      // Game 3: P2 of Pool D vs P3 of Pool A
      {
        team1: pools.D.second,
        team2: pools.A.third,
        winner: null,
        feedsIntoQuarter: 2,
      },
      // Game 4: P3 of Pool D vs P2 of Pool A
      {
        team1: pools.D.third,
        team2: pools.A.second,
        winner: null,
        feedsIntoQuarter: 3,
      },
    ];

    // Set up quarter-finals with pool winners
    const quarters = [
      // Game 1: P1 of Pool A vs Winner of Pre Quarters Game 1
      {
        team1: pools.A.first,
        team2: null,
        winner: null,
      },
      // Game 2: P1 of Pool D vs Winner of Pre Quarters Game 2
      {
        team1: pools.D.first,
        team2: null,
        winner: null,
      },
      // Game 3: P1 of Pool C vs Winner of Pre Quarters Game 3
      {
        team1: pools.C.first,
        team2: null,
        winner: null,
      },
      // Game 4: P1 of Pool B vs Winner of Pre Quarters Game 4
      {
        team1: pools.B.first,
        team2: null,
        winner: null,
      },
    ];

    setBracketResults({
      preQuarters,
      quarterFinals: quarters,
      semiFinals: [
        { team1: null, team2: null, winner: null },
        { team1: null, team2: null, winner: null },
      ],
      finals: [{ team1: null, team2: null, winner: null }],
    });
  };

  const handleWinner = (round, matchIndex, winner) => {
    setBracketResults(prev => {
      const newResults = JSON.parse(JSON.stringify(prev));
      newResults[round][matchIndex].winner = winner;

      if (round === 'preQuarters') {
        const quarterIndex = newResults.preQuarters[matchIndex].feedsIntoQuarter;
        newResults.quarterFinals[quarterIndex].team2 = winner;
      } else if (round === 'quarterFinals') {
        const nextMatchIndex = Math.floor(matchIndex / 2);
        if (matchIndex % 2 === 0) {
          newResults.semiFinals[nextMatchIndex].team1 = winner;
        } else {
          newResults.semiFinals[nextMatchIndex].team2 = winner;
        }
      } else if (round === 'semiFinals') {
        if (matchIndex === 0) {
          newResults.finals[0].team1 = winner;
        } else {
          newResults.finals[0].team2 = winner;
        }
      }

      return newResults;
    });
  };

  const BracketMatch = ({ match, round, matchIndex }) => (
    <div className="flex flex-col gap-2 p-3 bg-white rounded-lg shadow transition-all duration-300 flex-1">
      <div
        onClick={() => match.team1 && handleWinner(round, matchIndex, match.team1)}
        className={`p-2 rounded cursor-pointer text-sm transition-all duration-300 w-full
          ${match.winner === match.team1 ? 'bg-green-100 transform scale-105' : 'hover:bg-gray-100'}`}
      >
        {match.team1 || 'TBD'}
      </div>
      <div
        onClick={() => match.team2 && handleWinner(round, matchIndex, match.team2)}
        className={`p-2 rounded cursor-pointer text-sm transition-all duration-300 w-full
          ${match.winner === match.team2 ? 'bg-green-100 transform scale-105' : 'hover:bg-gray-100'}`}
      >
        {match.team2 || 'TBD'}
      </div>
    </div>
  );

  const GroupStage = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Object.entries(rankings).map(([poolLetter, teams]) => (
        <Card key={poolLetter} className="p-4">
          <h3 className="text-lg font-bold mb-4">Pool {poolLetter}</h3>
          <div className="space-y-2">
            {teams.map((team, index) => (
              <div
                key={team}
                className={`p-2 rounded flex items-center justify-between transition-all duration-300
                  ${
                    index === 0
                      ? 'bg-blue-100' // 1st place
                      : index < 3
                      ? 'bg-green-100' // 2nd and 3rd
                      : 'bg-gray-100'
                  }`} // 4th
              >
                <span>
                  {index + 1}. {team}
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => moveTeam(poolLetter, index, 'up')}
                    className="p-1 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded transition-colors duration-200"
                    disabled={index === 0}
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveTeam(poolLetter, index, 'down')}
                    className="p-1 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded transition-colors duration-200"
                    disabled={index === teams.length - 1}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-100 rounded"></div>
              <span>Straight to Quarters</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-100 rounded"></div>
              <span>To Pre-Quarters</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-8 text-center">Bracket USAU Nationals</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Fase de Grupos</h2>
        <p className="mb-4 text-gray-600">
          Usa las flechas para reordenar los equipos y predecir su posición final en cada grupo
          <span className="text-blue-600"> Primer lugar</span> avanza directamente a cuartos de final
          <span className="text-green-600"> Segundo y tercer lugar</span> juegan pre-cuartos
        </p>
        <GroupStage />
      </div>

      <div className="text-center space-x-4">
        <button
          onClick={() => {
            setShowBracket(!showBracket);
            if (!showBracket) generateBracket();
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
        >
          {showBracket ? 'Hide Bracket' : 'Generate Bracket'}
        </button>

        {showBracket && (
          <button
            onClick={shareState}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 inline-flex items-center gap-2 transition-colors duration-200"
          >
            <Share2 className="w-4 h-4" />
            Compartir Bracket
          </button>
        )}
      </div>

      {showBracket && (
        <div className="mt-8 transition-all duration-300">
          <h2 className="text-xl font-semibold mb-4">Championship Bracket</h2>
          <Card className="p-4 lg:p-6">
            <div className="flex flex-col lg:flex-row lg:justify-between gap-8 lg:gap-6">
              <div className="flex flex-col gap-4 lg:gap-8">
                <div className="sticky top-0 bg-white z-10 py-2">
                  <h3 className="font-semibold">Pre-Cuartos</h3>
                </div>
                {bracketResults.preQuarters.map((match, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-8 text-sm text-gray-500">G{i + 1}</div>
                    <BracketMatch match={match} round="preQuarters" matchIndex={i} />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4 lg:gap-8">
                <div className="sticky top-0 bg-white z-10 py-2">
                  <h3 className="font-semibold">Cuartos de Final</h3>
                </div>
                {bracketResults.quarterFinals.map((match, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-8 text-sm text-gray-500">G{i + 1}</div>
                    <BracketMatch match={match} round="quarterFinals" matchIndex={i} />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4 lg:gap-8 lg:mt-16">
                <div className="sticky top-0 bg-white z-10 py-2">
                  <h3 className="font-semibold">Semifinal</h3>
                </div>
                {bracketResults.semiFinals.map((match, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-8 text-sm text-gray-500">G{i + 1}</div>
                    <BracketMatch match={match} round="semiFinals" matchIndex={i} />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4 lg:mt-32">
                <div className="sticky top-0 bg-white z-10 py-2">
                  <h3 className="font-semibold">Final</h3>
                </div>
                {bracketResults.finals.map((match, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-8 text-sm text-gray-500">G{i + 1}</div>
                    <BracketMatch match={match} round="finals" matchIndex={i} />
                  </div>
                ))}
              </div>
            </div>

            {bracketResults.finals[0].winner && (
              <div className="mt-8 text-center">
                <h3 className="text-xl font-bold">Campeón</h3>
                <div className="text-2xl text-green-600 font-bold mt-2">{bracketResults.finals[0].winner}</div>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};

export default TournamentPrediction;
