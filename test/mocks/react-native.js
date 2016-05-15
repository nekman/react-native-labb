import React from 'react';

const RN = React;

export const PropTypes = React.PropTypes;

const createComponent = (type) => {
  return React.createClass({
    displayName: type,
    propTypes: {
      children: React.PropTypes.node
    },
    render() {
      return <div {...this.props}>{this.props.children}</div>;
    }
  });
};

RN.StyleSheet = {
  create: (style) => style
};


// RN.Component = createComponent('Component');
RN.Linking = createComponent('Linking');
RN.View = createComponent('View');
RN.Text = createComponent('Text');
RN.ActivityIndicatorIOS = createComponent('ActivityIndicatorIOS');
RN.Image = createComponent('Image');
RN.TouchableHighlight = createComponent('TouchableHighlight');
RN.ScrollView = createComponent('ScrollView');

export default RN;
