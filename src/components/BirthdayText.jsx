import { Text3D, Center, ContactShadows } from "@react-three/drei";
import ExplosionConfetti from "./Confetti"


const BirthdayText = () => {

    return <>
        <Center>
                <ExplosionConfetti isExploding={true}/>
                <Text3D
                font="/helvetiker_regular.typeface.json"
                position={[-3.5,0,0]}
                curveSegments={ 12 }
                bevelEnabled
                bevelThickness={ 0.02 }
                bevelSize={ 0.02 }
                bevelOffset={ 0 }
                bevelSegments={ 5 }
                >
                    {'  '}HAPPY {'\n'}BIRTHDAY !
                    <meshNormalMaterial />
            </Text3D>
            <ContactShadows
                    position-y={ -2.99 }
                    opacity={ 0.4 }
                    scale={ 29 }
                    blur={ 0.4 }
                />
            </Center>
    </>
}

export default BirthdayText;