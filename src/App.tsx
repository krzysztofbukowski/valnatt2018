import * as React from 'react';
import * as styles from './App.scss';
import Button from './components/Button/Button';
import Select from './components/Select/Select';
import Tabs from './components/Tabs/Tabs';
import TabContent from './components/Tabs/TabContent';
import SearchBox from './components/SearchBox/SearchBox';
import { connect } from 'react-redux';

import AppState from './state';
import * as actions from './actions';
import { Area, mapAreaToAreaLevel, AREA_LEVEL, decodeArea } from './utils/map';
import ButtonGroup from './components/ButtonGroup/ButtonGroup';
import Messenger from './components/Messenger/Messenger';
import AreaSelector from './components/AreaSelector/AreaSelector';

interface AppPropsDispatch {
  onAreaChanged: (area: string, election: string) => void;
  loadDataForArea: (area: string, election: string) => void;
}

export interface AppProps {
  currentArea: string;
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
    const { lan, kommun, valkrets, valdistrikt } = this.props;

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

        <AreaSelector
          current={this.props.currentArea}
          onChange={this.handleAreaChange}
          lan={lan}
          kommun={kommun}
          valdistrikt={valdistrikt}
          valkrets={valkrets}
        />

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
    const decodedArea = decodeArea(this.props.currentArea);

    const areas = Object
      .values(decodedArea)
      .filter((area: string | null) => area !== null);

    areas.unshift('national');

    areas.forEach((area: string) => {
      this.props.dispatch.loadDataForArea(area, this.props.currentElection);      
    });
  }

  handleAreaChange = (area: string) => {
    this.props.dispatch.onAreaChanged(area || 'national', this.props.currentElection);
  }
}

const mapStateToProps = (state: AppState): AppProps => ({
  currentArea: state.area,
  lan: state.lan,
  kommun: state.kommun,
  valkrets: state.valkrets,
  valdistrikt: state.valdistrikt,
  name: '',
  currentElections: state.currentElections,
  pastElections: state.pastElections,
  currentElection: state.election,
  dispatch: {} as AppPropsDispatch
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: {
    loadDataForArea: (area: string | null, election: string) => {
      dispatch(actions.loadDataForArea(area, election));
    },
    onAreaChanged: (area: string, election: string) => {
      // dispatch(actions.resetSelect(mapAreaToAreaLevel(area) as AREA_LEVEL));
      dispatch(actions.setArea(area));
      dispatch(actions.loadDataForArea(area, election));
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);