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
  lan: any[];
  kommun: any[];
  valkrets: any[];
  valdistrikt: any[];
  dispatch: {
    onAreaChanged: (areaId: string) => void
  };
}

export class App extends React.Component<AppProps, {}> {
  render() {
    const counties = {
    };

    const municipalities = {
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
            onChange={this.props.dispatch.onAreaChanged}
          />
          <Select options={municipalities}
            name="municipality"
            title="Välj kommun"
            onChange={this.props.dispatch.onAreaChanged}
          />
          <Select options={{}}
            name="division"
            title="Välj valkrets"
            onChange={this.props.dispatch.onAreaChanged}
          />
          <Select options={{}}
            name="constituency"
            title="Välj valdistrikt"
            onChange={this.props.dispatch.onAreaChanged}
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

  public componentWillMount() {
    this.props.dispatch.onAreaChanged('national');
  }
}

const mapStateToProps = (state: AppState) => ({
  lan: [],
  kommun: [],
  valkrets: [],
  valdistrikt: []
});

const mapDispatchToProps = dispatch => ({
  dispatch: {
    onAreaChanged: (areaId: string) => {
      dispatch(actions.setAreaId(areaId));
      dispatch(actions.loadElectionResultsAction(areaId));
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);