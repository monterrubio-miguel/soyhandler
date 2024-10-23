import TournamentPrediction from '../components/TournamentPrediction';
import BracketNav from '../components/BracketNav';

const mensDivisionTeams = {
  A: ['Chicago Machine', 'Sockeye', 'PoNY', 'Raleigh-Durham United'],
  B: ['DiG', 'Ring of Fire', 'GOAT', 'Mallard'],
  C: ['Johnny Bravo', 'Rhino Slam!', 'Chain Lightning', 'Furious George'],
  D: ['Revolver', 'Truck Stop', 'Doublewide', 'Shrimp'],
};

function MensBracket() {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <BracketNav />
        <TournamentPrediction initialTeams={mensDivisionTeams} division="mens" />
      </div>
    </div>
  );
}

export default MensBracket;
