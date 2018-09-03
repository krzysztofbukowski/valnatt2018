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
import { Area, mapAreaIdToAreaLevel, AREA_LEVEL } from './utils/map';

interface AppPropsDispatch {
  onAreaChanged: (areaId: string) => void
}

export interface AppProps {
  name: string;
  lan: Array<Area>;
  kommun: Array<Area>;
  valkrets: Array<Area>;
  valdistrikt: Array<Area>;
  currentElections: any[];
  pastElections: any[];
  dispatch: AppPropsDispatch;
}

export class App extends React.Component<AppProps, {}> {
  render() {
    return (
      <div className="App">
        <div className="search-nav">
          <Button label="Rensa" />
          <SearchBox placeholder="SKRIV IN DIN ADRESS" />
          <div className="search-nav__election-selector">
            <Select
              optionGroups={[
                {
                  label: 'Aktualla val',
                  options: this.props.currentElections
                },
                {
                  label: 'Gamla valdata',
                  options: this.props.pastElections
                }
              ]}
              name="election"
              current="election_val2018R"
            />
          </div>
        </div>

        <SelectGroup name="area">
          <Select options={this.props.lan}
            name="county"
            title="Välj län"
            onChange={this.props.dispatch.onAreaChanged}
          />
          <Select options={this.props.kommun}
            name="municipality"
            title="Välj kommun"
            onChange={this.props.dispatch.onAreaChanged}
          />
          <Select options={this.props.valkrets}
            name="division"
            title="Välj valkrets"
            onChange={this.props.dispatch.onAreaChanged}
          />
          <Select options={this.props.valdistrikt}
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

const mapStateToProps = (state: AppState): AppProps => ({
  lan: state.lan,
  kommun: state.kommun,
  valkrets: state.valkrets,
  valdistrikt: state.valdistrikt,
  name: '',
  currentElections: state.currentElections,
  pastElections: state.pastElections,
  dispatch: {} as AppPropsDispatch
});

const mapDispatchToProps = dispatch => ({
  dispatch: {
    onAreaChanged: (areaId: string) => {
      dispatch(actions.resetSelect(mapAreaIdToAreaLevel(areaId) as AREA_LEVEL));
      dispatch(actions.setAreaId(areaId));
      dispatch(actions.loadDataForArea(areaId));
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);