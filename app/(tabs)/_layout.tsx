import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import { useId } from '@/src/services/zustand/UserIdZustand';
import Colors from '@/src/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const idUser = useId((state) => state.id) 
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor:"green",
        headerShown: useClientOnlyValue(false, true ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="leaf" color={color} />,
          headerRight: () => (
            <Link href="/login" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="user"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}    
                    />
                )}
              </Pressable>
            </Link>)
        }}
      />
      <Tabs.Screen
        name="Upload"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="upload" color={color} />,
          href: idUser ? "/Upload" : null,
          headerRight: () => (
            <Link href="/login" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="user"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}    
                    />
                )}
              </Pressable>
            </Link>)
        }}
      /> 
      <Tabs.Screen
        name="Inst"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="info-circle" color={color} />,
          headerRight: () => (
            <Link href="/login" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="user"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}    
                    />
                )}
              </Pressable>
            </Link>)
        }}
      />
    </Tabs>
  );
}
