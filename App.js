import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import data from './data.js'
import React from 'react'
import { Transition,Transitioning } from 'react-native-reanimated';

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200} />
    <Transition.Change />
    <Transition.Out type="fade" durationMs={200} />
  </Transition.Together>
);

export default function App() {
  const ref = React.useRef();
  const [currentIndex, setcurrentIndex] = React.useState(null)
  return (
    <Transitioning.View 
    transition={transition}
    ref={ref}
    style={styles.container}>
      {
        data.map((item, index) => {
          return (
            <TouchableOpacity
              style={styles.box}
              key={index}
              onPress={() => {
                ref.current.animateNextTransition();
                setcurrentIndex(index===currentIndex?null:index)
              }}
              activeOpacity={0.9}
            >
              <View style={[styles.innerbox, { backgroundColor: item.bg }]}>
                <Text style={[styles.text, { color: item.color }]}>{item.category}</Text>
                {index === currentIndex && <View style={styles.subList}>
                  {
                    item.subCategories.map((subitem, subindex) => {
                      return (
                        <Text style={[styles.body, { color: item.color }]} key={subindex}>{subitem}</Text>
                      )
                    })
                  }
                </View>}
              </View>
            </TouchableOpacity>
          )
        }
        )}

    </Transitioning.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  box: {
    flexGrow: 1,
  },
  text: {
    fontSize: 30,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: -2
  },
  innerbox: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",

  },
  body: {
    fontSize: 12,
    lineHeight: 15 * 1.5,
    textTransform: "uppercase",

  }
});
