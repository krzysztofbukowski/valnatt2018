import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './ButtonGroup.scss';
import { ButtonProps } from '../Button/Button';
import className from '../../utils/className';

interface ButtonGroupState {
  selectedIndex: number;
  borderLeft: number;
  borderWidth: number;
  enableAnimation: boolean;
}

export interface ButtonGroupProps {

}

export default class ButtonGroup extends React.Component<ButtonGroupProps, ButtonGroupState> {

  private ref: React.RefObject<HTMLDivElement>[];

  constructor(props: React.Props<ButtonGroupProps>) {
    super(props);

    this.state = {
      selectedIndex: 0,
      borderLeft: 0,
      borderWidth: 0,
      enableAnimation: false
    };

    this.ref = (props.children as React.ReactElement<ButtonProps>[]).map((e) => {
      return React.createRef();
    });
  }

  public render() {
    const { children } = this.props;
    const classNameString = className({
      'button-group__border': true,
      'button-group__border--animated': this.state.enableAnimation,
    });

    return (
      <div className="button-group">
        <div
          className={classNameString}
          style={{ left: this.state.borderLeft, width: this.state.borderWidth }}
        />
        {
          (children as React.ReactElement<ButtonProps>[]).map(
            (component: React.ReactElement<ButtonProps>, key: number) => {
              const props: ButtonProps = {
                ...component.props,
                onClick: () => {
                  this.onButtonClick(key, component);
                }
              };

              return (
                <div key={`button-${key}`} ref={this.ref[key]} className="button-group__button">
                  <component.type {...props} />
                </div>
              );
            }
          )
        }
      </div>
    );
  }

  public componentDidMount() {
    // this method fires before css is rendered so need to delay getting the initial width

    setTimeout(
      () => {
        const currentNodeRef = this.ref[this.state.selectedIndex].current;

        this.setState({
          borderLeft: currentNodeRef.offsetLeft,
          borderWidth: currentNodeRef.offsetWidth,
        });

        setTimeout(
          () => {
            this.setState({
              enableAnimation: true
            });
          },
          0
        );
      },
      0
    );
  }

  private onButtonClick = (key: number, component: React.ReactElement<ButtonProps>) => {
    const currentNodeRef = this.ref[key].current;

    this.setState({
      selectedIndex: key,
      borderLeft: currentNodeRef.offsetLeft,
      borderWidth: currentNodeRef.offsetWidth
    });

    if (component.props.onClick) {
      component.props.onClick.call(this);
    }
  }
}