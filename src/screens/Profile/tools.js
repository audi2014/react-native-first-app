
import ImageCropPicker from "react-native-image-crop-picker";
import {StackActions, NavigationActions} from 'react-navigation';


export const resetNavigation = (navigation) => {
  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: 'mainFlow'})],
  });
  navigation.dispatch(resetAction);
};

// export const saveAvatarBase64Async = base64 => {
//   writeAndEmmitStorageValue('avatarUri', 'data:image/jpeg;base64,' + base64);
//   return base64;
// };
export const selectImageAsync = () => {
  return ImageCropPicker.openPicker({
    width: 300,
    height: 400,
    cropping: true,
    includeBase64: true,
  })
};



