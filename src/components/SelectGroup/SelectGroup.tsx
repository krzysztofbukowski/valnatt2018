import * as React from 'react';
import './SelectGroup.scss';
import Select, { SelectProps } from '../Select/Select';

export interface SelectGroupProps {
  name: string;
}

export interface SelectGroupState {
  isSelected: boolean[];
}

class SelectGroup extends React.Component<SelectGroupProps, SelectGroupState> {
  constructor(props: SelectGroupProps) {
    super(props);

    // Adding one element extra to the array to avoid index out of range errors in the render method
    const length = this.props.children ? (this.props.children as Select[]).length + 1 : 0;

    this.state = {
      // fill first element with true and the rest with false
      isSelected: (Array.apply(null, { length })).map((i, k) => k === 0)
    };

  }
  render() {
    const {children} = this.props;
    if (children === undefined) {
      throw new TypeError('SelectGroup component needs to have at least 2 children');
    }

    if (!(children as Object).hasOwnProperty('length')) {
      throw new TypeError('SelectGroup component needs to have at least 2 children');
    }

    return (
      <div className="select-group">
        {
           (children as React.ReactElement<SelectProps>[]).map(
              (component: React.ReactElement<SelectProps>, key: number) => {
                const props = {
                  ...component.props,
                  disabled: !this.state.isSelected[key],
                  options: !this.state.isSelected[key] ? {} : component.props.options,
                  current: !this.state.isSelected[key] ? undefined : component.props.current,
                  onChange: (value: string) => {
                    this.onChange(key, component, value);
                  },
                  onReset: () => {
                    this.onReset(key, component);
                  },
                };

                return (
                  <component.type key={`select-${key}`} {...props} />
                );
              }
            )
        }
      </div>
    );
  }

  private onReset(key: number, component: React.ReactElement<SelectProps>) {
    this.setState((prevState: SelectGroupState) => {
      for (let i = key + 1; i < prevState.isSelected.length; i++) {
        prevState.isSelected[i] = false;
      }
      return prevState;
    });
    if (component.props.onReset) {
      component.props.onReset();
    }
  }

  private onChange(key: number, component: React.ReactElement<SelectProps>, value: string) {
    this.setState((prevState: SelectGroupState) => {
      prevState.isSelected[key + 1] = true;
      return prevState;
    });
    if (component.props.onChange) {
      component.props.onChange(value);
    }
  }
}

export default SelectGroup;