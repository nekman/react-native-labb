import React from 'react';
import * as RN from 'react-native';

const createComponent = type => {
  return class FakeComponent extends React.Component {
    constructor(props) {
      super(props);
      this.displayName = type;
      this.propTypes = {
        children: React.PropTypes.node
      };
    }

    render() {
      return <div {...this.props}>{this.props.children}</div>;
    }
  };
};

RN.StyleSheet = {
  create: style => style
};

RN.Linking = createComponent('Linking');
RN.View = createComponent('View');
RN.Text = createComponent('Text');
RN.ActivityIndicatorIOS = createComponent('ActivityIndicatorIOS');
RN.Image = createComponent('Image');
RN.TouchableHighlight = createComponent('TouchableHighlight');
RN.ScrollView = createComponent('ScrollView');

export const PropTypes = React.PropTypes;
export default RN;
