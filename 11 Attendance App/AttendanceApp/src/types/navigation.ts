import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  GetStarted: undefined;
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>; 