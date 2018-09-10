import * as React from 'react';

import './tabs.scss';
import className from '../../utils/className';
import { TabContentProps } from './TabContent';

export interface TabsProps {
  tabs: string[];
}

interface TabsState {
  activeIndex: number;
}

export default class Tabs extends React.Component<TabsProps, TabsState> {

  constructor(props: TabsProps) {
    super(props);

    this.state = {
      activeIndex: 0
    };
  }

  public render() {
    return (
      <div className="tabs">
        <div className="tabs__header">
          {
            this.props.tabs.map((tab: string, key: number) => {
              return (
                <div key={key}
                  className={
                    className({
                      'tabs__tab': true,
                      'tabs__tab--active': key === this.state.activeIndex
                    })
                  }
                  onClick={() => {
                    this.tabClickHandler(key);
                  }}>
                  {tab}
                </div>
              );
            })
          }
        </div>
        <div className="tabs__content">
          {(this.props.children as React.ReactElement<TabContentProps>[])
            .map((e: React.ReactElement<TabContentProps>, key: number) => {
              const props = {
                ...e.props,
                visible: this.state.activeIndex === key
              };

              return (
                <e.type
                  key={key}
                  {...props}
                />
              );
            })}
        </div>
      </div>
    );
  }

  private tabClickHandler = (index: number) => {
    this.setState({
      activeIndex: index
    });
  };
}