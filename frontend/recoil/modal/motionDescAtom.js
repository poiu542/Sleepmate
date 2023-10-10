import { atom } from "recoil";

export const motionDescState = atom({
    key: "motionDescState", // 전역적으로 고유한 값
    default: {
        type:1,
        imgSrc:null,
        desc:"FW(Forward) 바른자세 유형입니다."
    } // 초깃값
});