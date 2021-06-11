import React from 'react'

import {Text, View, StyleSheet} from 'react-native'

const QuoteError = ({ error }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorMessage}>
        {error}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: 'center',
  },
  errorMessage: {
    textAlign: 'center',
    fontSize: 16,
    color: '#f00',
  },
})

export default QuoteError
