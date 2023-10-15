import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ExamplePanGesture } from '../screens/ExamplePanGesture';

import { ROUTES } from './routes';
import { HomeScreen } from '../screens/HomeScreen';
import { ExampleTransitions } from '../screens/ExampleTransitions';
import { ExampleBubbleLoader } from '../screens/ExampleBubbleLoader';
import { ExampleSwiping } from '../screens/ExampleSwiping';

const Stack = createNativeStackNavigator();

export const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTES.home}>
      <Stack.Screen name={ROUTES.home} component={HomeScreen} options={{ title: 'Home' }} />
      <Stack.Screen
        name={ROUTES.panGesture}
        component={ExamplePanGesture}
        options={{ title: 'Pan Gesture' }}
      />
      <Stack.Screen
        name={ROUTES.transitions}
        component={ExampleTransitions}
        options={{ title: 'Transitions' }}
      />
      <Stack.Screen
        name={ROUTES.bubbleLoader}
        component={ExampleBubbleLoader}
        options={{ title: 'Bubble loader' }}
      />
      <Stack.Screen
        name={ROUTES.swiping}
        component={ExampleSwiping}
        options={{ title: 'Swiping' }}
      />
    </Stack.Navigator>
  );
};
