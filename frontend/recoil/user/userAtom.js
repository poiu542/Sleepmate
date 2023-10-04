import { atom } from "recoil";

export const userSeq = atom({
    key: "userSeq", // 전역적으로 고유한 값
    default: 1, // 초깃값
});