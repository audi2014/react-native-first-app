import AsyncStorage from "@react-native-community/async-storage";

export const writeAsync = async (key, value) => {
    if (value !== undefined) {
        await AsyncStorage.setItem(key, value);
    }
    return value;
};

export const removeAsync = async (key) => {
    return await AsyncStorage.removeItem(key);
};

export const getItemAsync = key => AsyncStorage.getItem(key);
export const multiGetAsync = keys => AsyncStorage.multiGet(keys)



