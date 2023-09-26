import { atom } from "recoil";

export const motionModalState = atom({
    key: "motionModalState", // 전역적으로 고유한 값
    default: false, // 초깃값
});