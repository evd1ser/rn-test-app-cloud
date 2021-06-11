import React from 'react'

import {View, ActivityIndicator, StyleSheet} from 'react-native'

const QuoteLoad = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#41a6ff" />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default QuoteLoad
