import axios, { AxiosInstance, InternalAxiosRequestConfig , AxiosResponse, AxiosError } from "axios"
import Storage from "expo-storage";
import {Alert} from 'react-native';
import {useRecoilState} from 'recoil';

const nonAuthHttp = axios.create({
    // baseURL : import.meta.env.VITE_APP_SERVER as string,
    baseURL : "https://j9b103.p.ssafy.io",
    timeout: 100000,
    // headers: {
    //     'Content-Type': 'application/json',
    // },
    withCredentials : true,
})

// const accessToken = Storage.getItem('accessToken');
// const authHttp = axios.create({
//     baseURL : "https://j9b103.p.ssafy.io/",
//     timeout: 10000,
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + accessToken,
//     },
//     withCredentials : true,
// });

export {nonAuthHttp}

// 사용 예시 :
// 다른 파일에서 http 임포트 후
// function getCalendar(){
//     async function requestCalendar(): Promise<void> {
//         try {
//             const response: AxiosResponse<CalendarData> = await authHttp.get<CalendarData>(`/calendar/study?user=${pk}`);
//             const {calendar} = response.data;
//             if(calendar){
//               setData(calendar)
//             }
//         } catch (error) {
//             const err = error as AxiosError
//             console.log(err);
//         }
//     }
//     requestCalendar()
// }