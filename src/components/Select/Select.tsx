import * as React from 'react';
import './Select.scss';
import className from '../../utils/className';

export interface OptionGroup {
  label: string;
  options: { id: string, name: string }[];
}

export interface SelectProps {
  name: string;
  title?: string;
  options?: {id: string, name: string}[];
  optionGroups?: Array<OptionGroup>;
  current?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onReset?: () => void;
}

interface SelectState {
  isSelected: boolean;
}

class Select extends React.Component<SelectProps, SelectState> {

  constructor(props: SelectProps) {
    super(props);

    this.state = {
      isSelected: !!props.current
    };
  }

  render() {
    const { options, name, current, title, optionGroups } = this.props;
    const hasOptions = this.hasOptions(options);
    const hasOptionGroups = this.hasOptionGroups(optionGroups);

    const classes = {
      'select': true,
      'selected': this.state.isSelected && hasOptions,
    };

    return (
      <select
        name={name}
        className={className(classes)}
        disabled={!!this.props.disabled}
        defaultValue={current}
        onChange={this.onChange}
      >
        {title && <option key={-1} value={null}>- {title} -</option>}
        {hasOptionGroups && this.renderOptionGroups(optionGroups)}
        {!hasOptionGroups && hasOptions && this.renderOptions(options)}
      </select>
    );
  }

  componentDidUpdate(prevProps: SelectProps) {
    if (this.props !== prevProps && !this.hasOptions(prevProps.options)) {
      this.setState({
        isSelected: false
      });
    }
  }

  private hasOptions(options: {id: string, name: string}[]) {
    return options && options.length > 0;
  }

  private hasOptionGroups(options: Array<OptionGroup>) {
    return options && Object.keys(options).length > 0;
  }

  private renderOptions(options: {id: string, name: string}[]) {
    return options.map((option: {id: string, name: string}, optionIndex: number) => {
      return (
        <option key={optionIndex} value={option.id}>{option.name}</option>
      );
    });
  }

  private renderOptionGroups(optionGroups: Array<OptionGroup>) {
    return optionGroups &&
      optionGroups.map((optionGroup: OptionGroup, key: number) => {
        return (
          <optgroup
            key={key}
            label={optionGroup.label}>
            {this.renderOptions(optionGroup.options)}
          </optgroup>
        );
      });
  }

  private onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const isSelected = event.target.value !== `- ${this.props.title} -`;
    this.setState({
      isSelected: isSelected
    });

    if (isSelected && this.props.onChange) {
      this.props.onChange(event.target.value);
    } else if (!isSelected && this.props.onReset) {
      this.props.onReset();
    }
  }
}

export default Select;