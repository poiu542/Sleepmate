import { atom } from "recoil";

export const sleepBackState = atom({
    key: "sleepBackState", // 전역적으로 고유한 값
    default: 1, // 초깃값
});