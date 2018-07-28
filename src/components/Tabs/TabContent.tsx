import * as React from 'react';

export interface TabContentProps extends React.Props<{}> {
  visible?: boolean;
}

const TabContent = (props: TabContentProps) => (
  <div style={{ display: props.visible ? 'block' : 'none' }}>{props.children}</div>
);

export default TabContent;