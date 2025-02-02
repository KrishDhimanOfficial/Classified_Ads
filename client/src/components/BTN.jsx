import React, { Component } from 'react';

class BTN extends Component {
  render() {
    const { type, text, icon = '', ref, ...props } = this.props;

    return (
      <button
        type={type}
        ref={ref}
        {...props}
      >
        {icon}
        {text}
      </button>
    );
  }
}

export default React.memo(BTN)