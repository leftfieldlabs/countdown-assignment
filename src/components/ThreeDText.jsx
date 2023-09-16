import { Text3D } from "@react-three/drei";

const ThreeDText = ({text, position}) => {

    return <>
        <Text3D
            position={position}
            font='/helvetiker_regular.typeface.json'
            castShadow
            curveSegments={ 12 }
            bevelEnabled
            bevelThickness={ 0.02 }
            bevelSize={ 0.02 }
            bevelOffset={ 0 }
            bevelSegments={ 5 }
        >
            {text}
        </Text3D>
    </>
}
export default ThreeDText