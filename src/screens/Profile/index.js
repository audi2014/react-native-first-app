import {Button, Card, Icon, Input, withTheme} from "react-native-elements";
import React from "react";
import {resetNavigation, selectImageAsync} from "./tools";
import {ActivityIndicator, View} from "react-native";
import {
  clearProfile,
  setProfileAvatarUri,
  setProfileEmail,
  setProfileFirstName,
  setProfileLastName, useProfile
} from "../../storage/profile";


const _ProfileScreen = ({theme, navigation}) => {
  const {email, firstName, lastName, avatarUri, token} = useProfile();

  React.useEffect(() => {
    if (!token) {
      resetNavigation(navigation);
    }
  }, [token]);

  const primary = theme.colors.primary;
  const handleSelectImage = () => {
    selectImageAsync()
      .then(image => image.data)
      .then(base64 => setProfileAvatarUri('data:image/jpeg;base64,' + base64))
      .catch(e => alert(e))
    ;
  };


  return <View>
    <Card
      title="Edit Profile"
      imageProps={{
        PlaceholderContent: <ActivityIndicator/>,
        resizeMode: 'contain',
      }}
      image={avatarUri ? {uri: avatarUri} : null}
    >
      <Button
        onPress={handleSelectImage}
        title="Select Avatar"
      />
      <Input
        value={email}
        onChangeText={setProfileEmail}
        keyboardType={'email-address'}
        placeholder='Email'
        leftIcon={<Icon name='email' color={primary}/>}
      />
      <Input
        value={firstName}
        onChangeText={setProfileFirstName}
        placeholder='First Name'
        leftIcon={<Icon name='edit' color={primary}/>}
      />
      <Input
        value={lastName}
        onChangeText={setProfileLastName}
        placeholder='Last Name'
        leftIcon={<Icon name='edit' color={primary}/>}
      />
      <Button
        type="outline"
        onPress={clearProfile}
        title="Logout"
      />
    </Card>

  </View>
};
export const ProfileScreen = withTheme(_ProfileScreen);
ProfileScreen.displayName = 'ProfileScreenWithTheme';