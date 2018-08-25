import * as React from 'react';
import './App.scss';
import Button from './components/Button/Button';
import Select from './components/Select/Select';
import SelectGroup from './components/SelectGroup/SelectGroup';
import Tabs from './components/Tabs/Tabs';
import TabContent from './components/Tabs/TabContent';
import SearchBox from './components/SearchBox/SearchBox';
import { connect } from 'react-redux';
import AppState from './state';
import * as actions from './actions';

interface AppProps {
  name: string;
  dispatch: {
    onAreaSelected: (areaId: string) => void
  };
}

export class App extends React.Component<AppProps, {}> {
  render() {
    const counties = {
      '10': 'Blekinge län',
      '20': 'Dalarnas län',
      '09': 'Gotlands län',
      '21': 'Gävleborgs län',
      '13': 'Hallands län',
      '23': 'Jämtlands län',
      '06': 'Jönköpings län',
      '08': 'Kalmar län',
      '07': 'Kronobergs län',
      '25': 'Norrbottens län',
      '12': 'Skåne län',
      '01': 'Stockholms län',
      '04': 'Södermanlands län',
      '03': 'Uppsala län',
      '17': 'Värmlands län',
      '24': 'Västerbottens län',
      '22': 'Västernorrlands län',
      '19': 'Västmanlands län',
      '14': 'Västra Götalands län',
      '18': 'Örebro län',
      '05': 'Östergötlands län'
    };

    const municipalities = {
      '1082': 'Karlshamn',
      '1080': 'Karlskrona',
      '1060': 'Olofström',
      '1081': 'Ronneby',
      '1083': 'Sölvesborg'
    };

    const elections = {
      'election_val2018R': 'Riksdagsval 2018',
      'election_val2018K': 'Landstingsval 2018',
      'election_val2018L': 'Kommunalval 2018'
    };

    return (
      <div className="App">
        <div className="search-nav">
          <Button label="Rensa" />
          <SearchBox placeholder="SKRIV IN DIN ADRESS" />
          <div className="search-nav__election-selector">
            <Select
              options={elections}
              optionGroups={[
                {
                  label: 'Aktualla val',
                  options: elections
                },
                {
                  label: 'Gamla valdata',
                  options: elections
                }
              ]}
              name="election"
              current="election_val2018R"
            />
          </div>
        </div>

        <SelectGroup name="area">
          <Select options={counties}
            name="county"
            title="Välj län"
            onChange={this.props.dispatch.onAreaSelected}
          />
          <Select options={municipalities}
            name="municipality"
            title="Välj kommun"
            onChange={this.props.dispatch.onAreaSelected}
          />
          <Select options={{}}
            name="division"
            title="Välj valkrets"
            onChange={this.props.dispatch.onAreaSelected}
          />
          <Select options={{}}
            name="constituency"
            title="Välj valdistrikt"
            onChange={this.props.dispatch.onAreaSelected}
          />
        </SelectGroup>
        <Tabs tabs={['Alla partier', 'Välj ett parti']}>
          <TabContent>
            Alla partier content
          </TabContent>
          <TabContent>
            Välj ett parti content
          </TabContent>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({

});

const mapDispatchToProps = dispatch => ({
  dispatch: {
    onAreaSelected: (areaId: string) => {
      dispatch(actions.loadResultsAction(areaId));
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);