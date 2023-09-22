import { Text3D } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

const ThreeDText = ({text, position,scale,grav}) => {

    return <>
        <RigidBody gravityScale={grav} friction={0.7}>
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
                scale={scale || 1}
            >
                {text}
                <meshNormalMaterial />
            </Text3D>
        </RigidBody>
    </>
}
export default ThreeDText