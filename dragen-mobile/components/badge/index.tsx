import React from 'react';
import classnames from 'classnames';
import BasePropsType from './PropsType';

export interface BadageProps extends BadageProps{
  prefixCls?: string;
  className?: string;
  hot?: boolean;
}

export default class Badage extends React.Component<BadageProps, any>{
  static defaultProps = {
    prefixCls: 'am-badage',
    size: 'small',
    overflowCount: 99,
    dot: false,
    corner: false
  };

  render(){
    let { className, prefixCls, children } = this.props;
    return (
      <span className={}>
      </span>
    )
  }
}
