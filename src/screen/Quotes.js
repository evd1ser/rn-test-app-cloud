import React, {useContext, useEffect, useState, useCallback} from 'react'

import {SafeAreaView, VirtualizedList} from 'react-native'
import {ApiContext} from '../context/ApiContext'
import QuoteItem from '../components/quotes/QuoteItem'
import QuoteError from '../components/quotes/QuoteError'
import QuoteLoad from '../components/quotes/QuoteLoad'

const Quotes = ({ navigation }) => {
  const apiInstance = useContext(ApiContext)
  const [quotesData, setQuotesData] = useState({})
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')

  //создаем функцию для загрузки данных
  const loadData = () => {
    // очищаем ошибки которые были ранее
    setError('')
    // используем инстанс api для загрузки данных
    apiInstance
      .loadTracks()
      .then(data => {
        // при успешной загрузке и получении json сохраняем данные
        setQuotesData(data)
      })
      .catch(error => {
        // при ошибке выводим текст ошибки "ошибка" и в консоль пишем данные
        setError('ошибка')
        console.log(error)
      })
      .finally(() => {
        // финально ставим загрузку в статус true - нужно для первого раза
        setLoaded(true)
      })
  }

  useEffect(() => {
    // инициализируем начальную загрузку
    loadData()
  }, [])

  // отслеживаем изменение роутера и ставим события на вход на экран и покидании
  useEffect(() => {
    // создаем идектификатор для очистки таймера
    let timerId = 0
    // создаем подписку на событие когда попадаем на экран и ставим таймер
    const unsubscribeFocus = navigation.addListener('focus', () => {
      timerId = setInterval(loadData, 5 * 1000)
    })

    // чистим таймер когда уходим со страницы
    const unsubscribeBlur = navigation.addListener('blur', () => {
      clearInterval(timerId)
    })

    // возвращаем очистку обеих подписок
    return () => {
      unsubscribeFocus()
      unsubscribeBlur()
    }
  }, [navigation])


  // генерируем формат по своему желанию
  const preGenerateData = Object.entries(quotesData).map(([name, value]) => {
    return {
      name,
      last: value.last,
      highestBid: value.highestBid,
      percentChange: value.percentChange,
    }
  })

  // логика рендера загрука или нет есть ошибка или нет и использование базового компонента для вывода списка
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loaded ? (
        <React.Fragment>
          {error ? <QuoteError error={error} /> : null}
          <VirtualizedList
            data={preGenerateData}
            initialNumToRender={10}
            renderItem={({ item }) => (
              <QuoteItem item={item} />
            )}
            keyExtractor={item => item.name}
            getItemCount={()=>{
              return preGenerateData.length
            }}
            getItem={(data, index) => {
              return data[index]
            }}
          />
        </React.Fragment>
      ) : (
        <QuoteLoad />
      )}
    </SafeAreaView>
  )
}

export default Quotes
