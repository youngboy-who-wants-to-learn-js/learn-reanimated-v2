import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ExamplePanGesture } from '../screens/ExamplePanGesture';

import { ExampleBubbleLoader } from '../screens/ExampleBubbleLoader';
import { ExampleDragToSort } from '../screens/ExampleDragToSort';
import { ExampleLikeAnim } from '../screens/ExampleLikeAnim';
import { ExampleSwiping } from '../screens/ExampleSwiping';
import { ExampleTransitions } from '../screens/ExampleTransitions';
import { HomeScreen } from '../screens/HomeScreen';
import { ROUTES } from './routes';

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
      <Stack.Screen
        name={ROUTES.dragToSort}
        component={ExampleDragToSort}
        options={{ title: 'Swiping' }}
      />
      <Stack.Screen
        name={ROUTES.heart}
        component={ExampleLikeAnim}
        options={{ title: 'Swiping' }}
      />
    </Stack.Navigator>
  );
};
