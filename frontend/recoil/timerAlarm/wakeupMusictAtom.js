import { atom } from "recoil";

export const wakeupMusicState = atom({
    key: "wakeupMusicState", // 전역적으로 고유한 값
    default: false, // 초깃값
});