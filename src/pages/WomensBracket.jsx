import TournamentPrediction from '../components/TournamentPrediction';
import BracketNav from '../components/BracketNav';

const womensDivisionTeams = {
  A: ['Fury', 'Phoenix', 'Flipside', 'Underground'],
  B: ['Molly Brown', 'Scandal', 'Parcha', 'Nemesis'],
  C: ['Raleigh Radiance', 'Pop', 'Fight Club', 'Bent'],
  D: ['Siege', 'Schwa', 'Wildfire', 'Traffic'],
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
