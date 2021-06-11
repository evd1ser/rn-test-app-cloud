import React from 'react'

import {Text, View, StyleSheet} from 'react-native'

const AboutBox = ({ item }) => {
  return (
    <View style={styles.box}>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.content}>
        {item.components.map((paragraph, index) => (
          <Text style={styles.paragraph} key={index}>{paragraph}</Text>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    marginTop: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#000000',
  },
  title: {
    fontSize: 24,
  },
  content: {
    marginTop: 14,
  },
  paragraph: {
    fontSize: 16,
    marginTop: 4,
  },
})

export default AboutBox
