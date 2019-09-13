import React from "react";
import {ActivityIndicator,} from 'react-native';
import {IfTokenAsync} from "../storage/profile";
import {withNavigation} from 'react-navigation';
import {Button, Text} from "react-native-elements";


export const If = ({value, children}) => {
  const ch1 = Array.isArray(children) ? children[0] : children;
  const ch2 = Array.isArray(children) ? children[1] : null;
  const r = (value ? ch1 : ch2) || null;
  if (r && typeof r === 'function') {
    console.log('If hoc');
    return r(value)
  } else {
    console.log('If ch');
    return r;
  }
};

export const ServerErrorMessage = ({response}) => <If value={response && !response.success && response.message}>
  {v => <Text>{v}</Text>}
</If>;

export const NavigationRight = withNavigation(({navigation}) => {
  return IfTokenAsync(
    () => <Button type={'clear'} style={{marginEnd:5}} onPress={() => navigation.navigate('Profile')} title={'Profile'}/>,
    () => <Button type={'clear'} style={{marginEnd:5}} onPress={() => navigation.navigate('Login')} title={'Login'}/>,
    () => <ActivityIndicator/>,
  );
});
