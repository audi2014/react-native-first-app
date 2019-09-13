import {useStorageSubscription, saveAsync, removeAsync} from "../core/effector";

export const STORE_KEY_PROFILE_TOKEN = '@profile:token';
export const STORE_KEY_PROFILE_FIRST_NAME = '@profile:first_name';
export const STORE_KEY_PROFILE_LAST_NAME = '@profile:last_name';
export const STORE_KEY_PROFILE_EMAIL = '@profile:email';
export const STORE_KEY_PROFILE_AVATAR_URI = '@profile:avatar_uri';

export const STORE_KEYS_PROFILE = [
    STORE_KEY_PROFILE_FIRST_NAME,
    STORE_KEY_PROFILE_LAST_NAME,
    STORE_KEY_PROFILE_EMAIL,
    STORE_KEY_PROFILE_TOKEN,
    STORE_KEY_PROFILE_AVATAR_URI,
];

export const useProfileToken = () => useStorageSubscription(STORE_KEY_PROFILE_TOKEN);
export const useProfileFirstName = () => useStorageSubscription(STORE_KEY_PROFILE_FIRST_NAME);
export const useProfileLastName = () => useStorageSubscription(STORE_KEY_PROFILE_LAST_NAME);
export const useProfileEmail = () => useStorageSubscription(STORE_KEY_PROFILE_EMAIL);
export const useProfileAvatarUri = () => useStorageSubscription(STORE_KEY_PROFILE_AVATAR_URI);

export const useProfile = () => {
    const email = useProfileEmail() || '';
    const firstName = useProfileFirstName() || '';
    const lastName = useProfileLastName() || '';
    const avatarUri = useProfileAvatarUri() || null;
    const token = useProfileToken() || null;
    return {email, firstName, lastName, avatarUri, token}
};


export const setProfileToken = (v) => saveAsync(STORE_KEY_PROFILE_TOKEN, v);
export const setProfileFirstName = (v) => saveAsync(STORE_KEY_PROFILE_FIRST_NAME, v);
export const setProfileLastName = (v) => saveAsync(STORE_KEY_PROFILE_LAST_NAME, v);
export const setProfileEmail = (v) => saveAsync(STORE_KEY_PROFILE_EMAIL, v);
export const setProfileAvatarUri = (v) => saveAsync(STORE_KEY_PROFILE_AVATAR_URI, v);

export const clearProfile = () => {
    return Promise.all([
        removeAsync(STORE_KEY_PROFILE_TOKEN),
        removeAsync(STORE_KEY_PROFILE_FIRST_NAME),
        removeAsync(STORE_KEY_PROFILE_LAST_NAME),
        removeAsync(STORE_KEY_PROFILE_EMAIL),
        removeAsync(STORE_KEY_PROFILE_AVATAR_URI),
    ]);
};

export const IfTokenAsync = (renderOk, renderNeedLogin, renderSpinner = null) => {
    const token = useStorageSubscription(STORE_KEY_PROFILE_TOKEN);
    if (token === undefined) {
        return renderSpinner ? renderSpinner() : null;
    } else if (token) {
        return renderOk(token);
    } else {
        return renderNeedLogin();
    }
};

// const initStoreProfile = async () => fetchByKeysFromStoreAsync(STORE_KEYS_PROFILE);
// initStoreProfile();
/*
const STORE_KEY_PROFILE_FIRST_NAME = '@profile:first_name';
const profileFirstNameChange = createEvent('profile first_name change');
const fetchProfileFirstNameFromAsyncStorage = createEffect({
  handler: async () => '' + await AsyncStorage.getItem(STORE_KEY_PROFILE_FIRST_NAME),
});
const updateProfileFirstNameInAsyncStorage = createEffect({
  handler: async v => {
    try {
      await AsyncStorage.setItem(
        STORE_KEY_PROFILE_FIRST_NAME, v + '',
        err => {
          if (err) console.error(err)
        })
    } catch (err) {
      console.error(err)
    }
  },
});
 */