import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import moment from 'moment'

const Date = ({ date, onSelectDate, selected }) => {
  /**
   * use moment to compare the date to today
   * if today, show 'Today'
   * if not today, show day of the week e.g 'Mon', 'Tue', 'Wed'
   */
  const day = moment(date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') ? 'Today' : moment(date).format('ddd')
  // get the day number e.g 1, 2, 3, 4, 5, 6, 7
  const dayNumber = moment(date).format('D')

  // get the full date e.g 2021-01-01 - we'll use this to compare the date to the selected date
  const fullDate = moment(date).format('YYYY-MM-DD')
  return (
    <TouchableOpacity
      onPress={() => {onSelectDate(fullDate)}}
      style={[styles.card, selected === fullDate && { backgroundColor: "#888" }]}
    >
      <Text
        style={[styles.big, selected === fullDate && { color: "#fff" }]}
      >
        {day}
      </Text>
      <View style={{ height: 5 }} />
      <Text
        style={[
          styles.medium,
          selected === fullDate && { color: "#fff", fontWeight: 'bold', fontSize: 15 },
        ]}
      >
        {dayNumber}
      </Text>
    </TouchableOpacity>
  )
}

export default Date
const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 3,
    marginVertical: 20,
    alignItems: 'center',
    height: 50,
    width: 55,
    margin: 1,
  },
  big: {
    fontSize: 13,
    color : "#eee"
  },
  medium: {
    fontSize: 15,
    fontWeight : 'bold',
    color : "#eee"

  },
})