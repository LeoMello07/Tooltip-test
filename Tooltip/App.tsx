import { arrow, offset, shift, useFloating } from '@floating-ui/react-native';
import React, { useRef, useState } from 'react';
import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const arrowRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const buttonRef1 = useRef(null);
  const buttonRef2 = useRef(null);
  const buttonRef3 = useRef(null);

  const { refs, floatingStyles, update, middlewareData } = useFloating({
    placement: 'top',
    middleware: [offset(20), shift(), arrow({ element: arrowRef })],
  });

  const handleButtonPress = (ref: any) => {
    if (isOpen) {
      setIsOpen(false);
      update();
    } else {
      refs.setReference(ref);
      update();
      setIsOpen(true);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: 'gray',
          flexDirection: 'row',
          gap: 20,
        }}
      >
        <View ref={buttonRef1}>
          <Pressable
            style={[styles.button, { backgroundColor: 'red' }]}
            onPress={() => handleButtonPress(buttonRef1.current)}
          >
            <Text style={styles.buttonText}>Botão</Text>
          </Pressable>
        </View>

        <View ref={buttonRef2}>
          <Pressable
            style={[styles.button, { backgroundColor: 'green' }]}
            onPress={() => handleButtonPress(buttonRef2.current)}
          >
            <Text style={styles.buttonText}>Botão</Text>
          </Pressable>
        </View>

        <View ref={buttonRef3}>
          <Pressable
            style={[styles.button, { backgroundColor: 'blue' }]}
            onPress={() => handleButtonPress(buttonRef3.current)}
          >
            <Text style={styles.buttonText}>Botão</Text>
          </Pressable>
        </View>

        {isOpen && (
          <View
            ref={refs.setFloating}
            style={[floatingStyles, styles.tooltip]}
            collapsable={false}
          >
            <Text style={styles.tooltipText}>Tooltip com seta</Text>
            <View
              ref={arrowRef}
              style={{
                backgroundColor: 'red',
                width: 12,
                height: 12,
                transform: [{ rotate: '45deg' }],
                position: 'absolute',
                left: middlewareData.arrow?.x,
                top: middlewareData.arrow?.y,
                bottom: -6,
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
  tooltip: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    width: 255,
    height: 44,
    alignItems: 'center',
  },
  tooltipText: {
    color: 'white',
  },
});

export default App;
