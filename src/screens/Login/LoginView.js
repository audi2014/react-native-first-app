import {ServerErrorMessage} from "../../components";
import React from "react";
import {Card, Input} from "react-native-elements";
import {Button, View} from "react-native";

export const LoginView = ({message, success, response, username, password, setPassword, setUsername, onSubmitClick, onGoToRegisterClick}) =>
  <View>
    <Card>
      <ServerErrorMessage response={response}/>
      <Input
        autoCompleteType={'name'}
        value={username}
        onChangeText={setUsername}
        placeholder='Username'
      />
      <Input
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
        placeholder='Password'
      />

      <Button
        title="Login"
        onPress={onSubmitClick}
      />
      <Button
        type="outline"
        title="Go to Register"
        onPress={onGoToRegisterClick}
      />
    </Card>
  </View>
;