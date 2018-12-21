import * as React from 'react';
import * as styles from './App.scss';
import Button from './components/Button/Button';
import Select from './components/Select/Select';
import SelectGroup from './components/SelectGroup/SelectGroup';
import Tabs from './components/Tabs/Tabs';
import TabContent from './components/Tabs/TabContent';
import SearchBox from './components/SearchBox/SearchBox';
import { connect } from 'react-redux';
import AppState, { MessageState } from './state';
import * as actions from './actions';
import { Area, mapAreaIdToAreaLevel, AREA_LEVEL } from './utils/map';
import ButtonGroup from './components/ButtonGroup/ButtonGroup';
import Messenger from './components/Messenger/Messenger';

interface AppPropsDispatch {
  onAreaChanged: (areaId: string, election: string) => void;
}

export interface AppProps {
  name: string;
  lan: Array<Area>;
  kommun: Array<Area>;
  valkrets: Array<Area>;
  valdistrikt: Array<Area>;
  currentElection: string;
  currentElections: any[];
  pastElections: any[];
  dispatch: AppPropsDispatch;
}

export class App extends React.Component<AppProps, {}> {
  public render() {
    return (
      <div className={styles.app}>
        <Messenger />
        <div className={styles.searchNav}>
          <Button label="Rensa" />
          <SearchBox placeholder="SKRIV IN DIN ADRESS" />
          <div className={styles.searchNavElectionSelector}>
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
            onChange={this.handleAreaChange}
          />
          <Select options={this.props.kommun}
            name="municipality"
            title="Välj kommun"
            onChange={this.handleAreaChange}
          />
          <Select options={this.props.valkrets}
            name="division"
            title="Välj valkrets"
            onChange={this.handleAreaChange}
          />
          <Select options={this.props.valdistrikt}
            name="constituency"
            title="Välj valdistrikt"
            onChange={this.handleAreaChange}
          />
        </SelectGroup>
        <Tabs tabs={['Alla partier', 'Välj ett parti']}>
          <TabContent>
            <ButtonGroup>
              <Button label="PROCENT" />
              <Button label="RÖSTER" />
              <Button label="MANDAT" />
            </ButtonGroup>
          </TabContent>
          <TabContent>
            Välj ett parti content
          </TabContent>
        </Tabs>
      </div>
    );
  }

  public componentDidMount() {
    this.handleAreaChange('national');
  }

  handleAreaChange = (areaId: string) => {
    this.props.dispatch.onAreaChanged(areaId, this.props.currentElection);
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
  currentElection: state.currentElection,
  dispatch: {} as AppPropsDispatch
});

const mapDispatchToProps = dispatch => ({
  dispatch: {
    onAreaChanged: (areaId: string, election: string) => {
      dispatch(actions.resetSelect(mapAreaIdToAreaLevel(areaId) as AREA_LEVEL));
      dispatch(actions.setAreaId(areaId));
      dispatch(actions.loadDataForArea(areaId, election));
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);