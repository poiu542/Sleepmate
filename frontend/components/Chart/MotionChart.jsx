import { BarChart } from "react-native-gifted-charts";
import {View, Text} from 'react-native';
import tw from 'twrnc';

const MotionChart = () => {
    const data = [
        {value: 2500, frontColor: '#006DFF', gradientColor: '#009FFF', spacing: 6, label:'군인형'},
        {value: 2400, frontColor: '#3BE9DE', gradientColor: '#93FCF8'},
    
        {value: 3500, frontColor: '#006DFF', gradientColor: '#009FFF', spacing: 6, label:'태아형'},
        {value: 3000, frontColor: '#3BE9DE', gradientColor: '#93FCF8'},
    
        {value: 4500, frontColor: '#006DFF', gradientColor: '#009FFF', spacing: 6, label:'자유낙하형'},
        {value: 4000, frontColor: '#3BE9DE', gradientColor: '#93FCF8'},
    
        {value: 5200, frontColor: '#006DFF', gradientColor: '#009FFF', spacing: 6, label:'불가사리형 '},
        {value: 4900, frontColor: '#3BE9DE', gradientColor: '#93FCF8'},
    
        {value: 3000, frontColor: '#006DFF', gradientColor: '#009FFF', spacing: 6, label:'통나무형'},
        {value: 2800, frontColor: '#3BE9DE', gradientColor: '#93FCF8'},
      ];
    
      return(
        <View
          style={{
            margin: 10,
            padding: 10,
            borderRadius: 20,
            backgroundColor: '#091B35',
          }}>
          <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>
            별 5점과 나를 비교합니다
          </Text>
          <View style={{padding: 0, alignItems: 'center'}}>
            <BarChart
              data={data}
              barWidth={50}
              initialSpacing={10}
              spacing={15}
              barBorderRadius={4}
              yAxisThickness={0}
              xAxisType={'dashed'}
              xAxisColor={'lightgray'}
              yAxisTextStyle={{color: 'lightgray'}}
              stepValue={20}
              maxValue={6000}
              noOfSections={6}
              yAxisLabelTexts={['0%', '10%', '20%', '40%', '60%', '80%', '100%']}
              labelWidth={40}
              xAxisLabelTextStyle={{color: 'lightgray', textAlign: 'center'}}
              showLine
              lineConfig={{
                color: '#F29C6E',
                thickness: 3,
                curved: true,
                hideDataPoints: true,
                shiftY: 20,
                initialSpacing: -30,
              }}
            />
          </View>
        </View>
    );
}


export default MotionChart;