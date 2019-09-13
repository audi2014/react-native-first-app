import {ServerErrorMessage,} from "../../components";
import React from "react";
import {Button, Card, Input} from "react-native-elements";
import {View} from "react-native";

export const RegisterView = ({response, username, password, setPassword, setUsername, onSubmitClick, onGoToLoginClick}) =>
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
        placeholder='Username'
      />
      <Button
        title="Register"
        onPress={onSubmitClick}
      />
    </Card>
  </View>
;