import React from 'react';
import './styles.css';

export const Content: React.FC<{}> = (props) => {
  return <div className="content">{props.children}</div>;
};
