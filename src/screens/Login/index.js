import React from "react";

import {login} from "../../api";
import {LoginView} from "./LoginView";


export const LoginScreen = ({navigation, ...props}) => {
  const onSuccess = (navigation.state.params || {}).onSuccess;
  const [username, setUsername] = React.useState(props.username || '');
  const [password, setPassword] = React.useState(props.password || '');
  const [response, setResponse] = React.useState(null);
  const handleLogin = () => {
    login({
      username,
      password,
    }).then(r => {
      setResponse(r);
      return r;
    }).then(r => {
      if (r.success) {
        if (onSuccess) {
          onSuccess(navigation);
        } else {
          navigation.navigate('Products')
        }
      }
    })
  };

  return (
    <LoginView {...{
      username, password, response,
      setUsername, setPassword, setResponse,
      onSubmitClick: handleLogin,
      onGoToRegisterClick: () => navigation.navigate('Register', {username, password, onSuccess}),
    }}/>

  );
};
LoginScreen.navigationOptions = {
  title: 'Login',
};