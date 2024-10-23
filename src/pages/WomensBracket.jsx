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
    <div>
      <BracketNav />
      <TournamentPrediction initialTeams={womensDivisionTeams} division="womens" />
    </div>
  );
}

export default WomensBracket;
