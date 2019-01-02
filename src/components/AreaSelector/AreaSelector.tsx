import * as React from 'react';
import SelectGroup from '../SelectGroup/SelectGroup';
import Select from '../Select/Select';
import { Area, decodeArea } from '../../utils/map';

export interface AreaSelectorProps {
  current: string;
  lan: Array<Area>;
  kommun: Array<Area>;
  valkrets: Array<Area>;
  valdistrikt: Array<Area>;
  onChange?: (value: string | null) => void;
}

interface AreaSelectorState {
  currentValues: string[];
}

export default class AreaSelector extends React.PureComponent<AreaSelectorProps, AreaSelectorState> {

  constructor(props: AreaSelectorProps) {
    super(props);

    const decodedArea = decodeArea(this.props.current);

    const currentValues = new Array<null|string>(React.Children.count(this.props.children));

    currentValues[0] = decodedArea.lan;
    currentValues[1] = decodedArea.kommun;
    currentValues[2] = decodedArea.valkrets;
    currentValues[3] = decodedArea.valdistrikt;

    this.state = {
      currentValues
    };
  }

  public render() {
    return (
      <SelectGroup name="area" onChange={this.handleAreaChange}>
        <Select options={this.props.lan}
          name="county"
          title="Välj län"
          current={this.state.currentValues[0]}
        />
        <Select options={this.props.kommun}
          name="municipality"
          title="Välj kommun"
          current={this.state.currentValues[1]}
        />
        <Select options={this.props.valkrets}
          name="division"
          title="Välj valkrets"
          current={this.state.currentValues[2] || this.state.currentValues[1]}
        />
        <Select options={this.props.valdistrikt}
          name="constituency"
          title="Välj valdistrikt"
          current={this.state.currentValues[3]}
        />
      </SelectGroup>
    );
  }

  handleAreaChange = (area: string) => {
    if (this.props.onChange) {
      this.props.onChange.call(this, area);
    }
  }
}