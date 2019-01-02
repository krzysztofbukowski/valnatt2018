import * as React from 'react';
import * as styles from './SelectGroup.scss';
import { SelectProps } from '../Select/Select';

export interface SelectGroupProps {
  name: string;
  onChange?: (value: string | null) => void;
}

export interface SelectGroupState {
  currentValue: string[];
}

class SelectGroup extends React.Component<SelectGroupProps, SelectGroupState> {
  constructor(props: SelectGroupProps) {
    super(props);

    let currentValue = new Array(React.Children.count(this.props.children));    

    React.Children.forEach(this.props.children, (child: React.ReactElement<SelectProps>, index: number) => {
      currentValue[index] = child.props.current;
    });

    this.state = {
      currentValue
    };
  }

  render() {
    const { children } = this.props;
    if (children === undefined) {
      throw new TypeError('SelectGroup component needs to have at least 2 children');
    }

    if (!(children as Object).hasOwnProperty('length')) {
      throw new TypeError('SelectGroup component needs to have at least 2 children');
    }

    return (
      <div className={styles.selectGroup}>
        {
          React.Children.map(this.props.children, this.mapChild)
        }
      </div>
    );
  }

  mapChild = (child: React.ReactElement<SelectProps>, key: number) => {
    const Component = child.type;
    const { options } = child.props;
    const { currentValue } = this.state;

    const props = {
      ...child.props,
      disabled: key > 0 && typeof (currentValue[key - 1]) !== 'string',
      options: options,
      current: currentValue[key],
      onChange: (value: string) => {
        this.onChange(key, value);
      }
    };

    return (<Component key={`select-${key}`} {...props} />);
  }

  onChange = (key: number, value: string | null) => {
    this.setState((prevState: SelectGroupState) => {
      const newValues = Array.from(prevState.currentValue);
      newValues[key] = value;

      for (let i = key + 1; i < newValues.length; i++) {
        newValues[i] = null;
      }

      return { ...prevState, currentValue: newValues };
    });

    let nextValue = value;
    if (nextValue === null && key > 0) {
      nextValue = this.state.currentValue[key - 1];
    }

    if (this.props.onChange) {
      this.props.onChange(nextValue);
    }
  }
}

export default SelectGroup;