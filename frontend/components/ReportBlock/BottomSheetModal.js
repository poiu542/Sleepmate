import React from "react";
import { View, Text, Image } from "react-native";
import { BottomSheet } from "react-native-btr";
import tw from "twrnc";
import image1 from "../../assets/images/circadian-modal.png";
import image2 from "../../assets/images/breath-modal.png";
import image3 from "../../assets/images/rem-modal.png";

const getContents = (modalN) => {
    switch (modalN) {
        case 1:
            return {
                title: "일주기 리듬 수면",
                description:
                    "쾌적한 잠을 자기 위해서는 수면 시간이 일주기 리듬(Circadian rhythms)의 수면 시간과 일치해야 합니다. 우리 몸은 하루를 주기로 하는 일주기 리듬을 따르는데, 이를 통해 수면각성리듬과 체온, 호르몬 등을 조절합니다. 생체 리듬은 아침 시간의 빛 노출과 관련이 있기 때문에 기상 시 조도를 상승시키면 도움이 됩니다.",
                imageSource: image1,
                width: 130,
                height: 130,
            };
        case 2:
            return {
                title: "심박수 안정도",
                description:
                    "수면 시 불규칙한 심박수의 대표적인 원인은 수면 무호흡입니다. 수면무호흡증 환자는 잠자는 동안 혈중 산소 농도가 낮아지고 심장이 빨리 뛰면서 혈압이 상승합니다. 잠을 자는 자세도 무호흡에 영향을 줍니다. 옆으로 누울 때보다 똑바로 눕게 되면 코골이나 무호흡이 심해집니다. 또한 일반적으로 과체중이나 비만일 시 수면 무호흡증의 확률이 높아집니다.",
                imageSource: image2,
                width: 200,
                height: 120,
            };
        case 3:
            return {
                title: "렘 수면 행동장애",
                description:
                    "렘수면(rapid eye movement sleep, REM sleep) 기간 동안 근육의 긴장도가 증가되고 꿈과 관련된 과도한 움직임과 이상행동을 보이는 질환입니다. 나이가 많을수록, 남성일수록 흔하게 발생하며, 대표적으로 파킨슨병과 같은 다양한 신경계 퇴행성 질환과 연관성이 높습니다.",
                imageSource: image3,
                width: 200,
                height: 120,
            };
    }
};
const BottomSheetModal = ({ isVisible, onClose, modalN }) => {
    const { title, description, imageSource, width, height } =
        getContents(modalN);
    return (
        <BottomSheet
            visible={isVisible}
            onBackButtonPress={onClose}
            onBackdropPress={onClose}
        >
            <View style={tw`bg-white h-1/2 rounded-5 p-5`}>
                <Text style={tw`text-base font-bold `}>{title}</Text>
                <View style={tw`mt-2 items-center justify-center`}>
                    <Image
                        style={{
                            width: width,
                            height: height,
                            alignItems: "center",
                        }}
                        source={imageSource}
                    ></Image>
                    <Text style={tw`leading-5 p-1 mt-2`}>{description}</Text>
                </View>
            </View>
        </BottomSheet>
    );
};

export default BottomSheetModal;
