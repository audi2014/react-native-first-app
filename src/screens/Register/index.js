import React from "react";

import {register} from "../../api";
import {RegisterView} from "./RegisterView";


export const RegisterScreen = ({navigation, ...props}) => {
  const onSuccess = (navigation.state.params || {}).onSuccess;
  const [username, setUsername] = React.useState(props.username || '');
  const [password, setPassword] = React.useState(props.password || '');
  const [response, setResponse] = React.useState(null);
  const handleSubmit = () => {
    register({
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
    <RegisterView {...{
      username, password, response,
      setUsername, setPassword, setResponse,
      onSubmitClick: handleSubmit,
      // onGoToLoginClick :() => navigation.goBack(),
      // onGoToLoginClick: () => navigation.navigate('Login', {username, password}),
    }}/>

  );
};
RegisterScreen.navigationOptions = {
  title: 'Register',
};