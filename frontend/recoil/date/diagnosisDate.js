import { atom } from "recoil";
const today = new Date().toISOString().slice(0, 9)+"6";
export const diagnosisDateState = atom({
    key: "diagnosisDateState", // 전역적으로 고유한 값
    default: today, // 초깃값
});
console.log(today);