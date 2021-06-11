import React, {useRef, useEffect, useState} from 'react'

import {Text, View, StyleSheet, Animated} from 'react-native'

// создание хука чтобы можно было отслеживать изменения в стейтлес компонентах
function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

const QuoteItem = ({ item }) => {

  // подписка на предыдущие значение
  const quotePrev = usePrevious(item)
  // создание анимаци
  const colorAnimRef = useRef(new Animated.Value(0)).current

  // какой цвет у процентов
  let styleColor =
    item.percentChange > 0
      ? styles.positive
      : item.percentChange < 0
      ? styles.negative
      : null


  // запуск анимации
  useEffect(() => {
    colorAnimRef.setValue(0)

    Animated.timing(
      colorAnimRef,
      {
        toValue: 1,
        duration: 3000,
        useNativeDriver: false,
      },
    ).start()
  }, [quotePrev, colorAnimRef])

  let backgroundStyle = {}

  // проверка что состояние обновлено
  if (quotePrev && JSON.stringify(quotePrev) !== JSON.stringify(item)) {
    backgroundStyle = {
      backgroundColor: colorAnimRef.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['#fff', '#41a6ff', '#fff'],
      }),
    }
  }

  return (
    <Animated.View style={[styles.container, backgroundStyle]}>
      <View style={styles.mainView}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.last}>{item.last}</Text>
      </View>
      <View style={styles.infoView}>
        <Text style={[styles.textBase, styles.highestBid]}>{item.highestBid}</Text>
        <Text style={[
          styles.textBase,
          styles.percentChange,
          styleColor,
        ]}>{item.percentChange}</Text>
      </View>
    </Animated.View>
  )
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#000',
  },
  mainView: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    color: '#000',
  },
  last: {
    fontSize: 10,
    marginTop: 10,
    color: '#aaa',
  },
  infoView: {
    justifyContent: 'space-between',
  },
  textBase: {
    textAlign: 'right',
    fontSize: 10,
  },
  highestBid: {
    fontSize: 18,
  },
  percentChange: {},
  positive: {
    color: '#0f0',
  },
  negative: {
    color: '#f00',
  },
})

export default QuoteItem
