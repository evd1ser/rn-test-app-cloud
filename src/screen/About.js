import React from 'react'

import {Text, View, ScrollView, SafeAreaView, StyleSheet} from 'react-native'
import AboutBox from '../components/about/AboutBox'
import aboutInformation from '../data/about-information.json'

const About = () => {
  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <Text style={styles.title}>О компании</Text>
        <Text style={styles.information}>
          Наш продукт создан для решения Ваших бизнес задач
        </Text>
        {aboutInformation.map((item, index) => (
          <AboutBox item={item} key={index} />
        ))}
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 40,
    color: '#000000',
  },
  information: {
    marginTop: 16,
    fontSize: 34,
    color: '#62598a',
  },
})

export default About
