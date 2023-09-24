import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import moment from 'moment'
import Date from './util/Date'
import tw from 'twrnc';

const CalendarHorizontal = ({ onSelectDate, selected }) => {
    const [dates, setDates] = useState([])
    const [scrollPosition, setScrollPosition] = useState(0)
    const [currentMonth, setCurrentMonth] = useState()
  
    const getDates = () => {
        const _dates = []
        for (let i = 0; i < 10; i++) {
          const date = moment().add(i, 'days')
          _dates.push(date)
        }
        setDates(_dates)
      }
    
      useEffect(() => {
        getDates()
      }, [])
  
    /**
     * scrollPosition is the number of pixels the user has scrolled
     * we divide it by 60 because each date is 80 pixels wide and we want to get the number of dates
     * we add the number of dates to today to get the current month
     * we format it as a string and set it as the currentMonth
     */
    const getCurrentMonth = () => {
      const month = moment(dates[0]).add(scrollPosition / 60, 'days').format('MMMM')
      setCurrentMonth(month)
    }
  
    useEffect(() => {
      getCurrentMonth()
    }, [scrollPosition])

  return (
    <>
      <View style={tw`w-full pl-5`}>
        <Text style={tw`text-[25px] text-black text-left font-bold`}>{currentMonth}</Text>
      </View>
      <View style={styles.dateSection}>
        <View style={styles.scroll}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            // onScroll is a native event that returns the number of pixels the user has scrolled
            scrollEventThrottle={16}
            onScroll={(e) => setScrollPosition(e.nativeEvent.contentOffset.x)}
          >
            {dates.map((date, index) => {
                return(
                    <Date
                        key={index}
                        date={date}
                        onSelectDate={onSelectDate}
                        selected={selected}
                    />
                )
            })}
          </ScrollView>
        </View>
      </View>
    </>
  )
}

export default CalendarHorizontal

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color:"white",
    textAlign:"left",
  },
  dateSection: {
    width: '100%',
    padding: 5,
  },
  scroll: {
    height: 150,
  },
})