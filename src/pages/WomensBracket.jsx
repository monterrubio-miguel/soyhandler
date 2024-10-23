import TournamentPrediction from '../components/TournamentPrediction';
import BracketNav from '../components/BracketNav';

const womensDivisionTeams = {
  A: ['Fury', 'Flipside', 'Traffic', 'Nemesis'],
  B: ['Scandal', 'BENT', 'Schwa', 'Parcha'],
  C: ['Brute Squad', 'Molly Brown', '6ixers', 'Pop'],
  D: ['Phoenix', 'Seattle Riot', 'Iris', 'Grit'],
};

function WomensBracket() {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <BracketNav />
        <TournamentPrediction initialTeams={womensDivisionTeams} division="womens" />
      </div>
    </div>
  );
}

export default WomensBracket;
