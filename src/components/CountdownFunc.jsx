import { useEffect, useState } from "react"
import ThreeDText from "./ThreeDText"
import { Center, OrbitControls, ContactShadows, Text3D } from "@react-three/drei"
import ExplosionConfetti from "./Confetti"
import { Physics, RigidBody } from "@react-three/rapier"


const CountdownFunc = (props) => {
    const [countDown, setCountDown] = useState({
        days: 0, 
        hours: 0,
        min: 0, 
        sec: 0, 
        past: false
    })

    // const [depleted, setDepleted ] = useState({
    //     days: false
    // })

    useEffect(() => {
        const calculateCountdown = (endDate) => {
            let diff = (Date.parse(new Date(endDate)) -Date.parse(new Date())) / 1000

            if(diff <= 0) {
                console.log('it is in the past')
            }
            else {

                const timeLeft = {
                    years: 0,
                    days: 0,
                    hours: 0,
                    min: 0,
                    sec: 0,
                    millisec: 0,
                }
                
                if (diff >= 365.25 * 86400) {
                    timeLeft.years = Math.floor(diff / (365.25 * 86400));
                    diff -= timeLeft.years * 365.25 * 86400;
                }
                if (diff >= 86400) {
                    timeLeft.days = Math.floor(diff / 86400);
                    diff -= timeLeft.days * 86400;
                }
                if (diff >= 3600) {
                    timeLeft.hours = Math.floor(diff / 3600);
                    diff -= timeLeft.hours * 3600;
                }
                if (diff >= 60) {
                    timeLeft.min = Math.floor(diff / 60);
                    diff -= timeLeft.min * 60;
                }
                timeLeft.sec = diff;
                
                return timeLeft;
            }
            
        }
        const interval = setInterval(() => {
            const date = calculateCountdown(props.date)
            date ? setCountDown(date) : setCountDown((prevState) => ({...prevState, past: true})) //once the timer runs out past will evaluate to true
        }, 1000)
        return () => clearInterval(interval)
    }, [props.date]) //rerender each time date changes, will be every second

    const addLeadingZeros = (value) => {
        value = String(value)
        while (value.length < 2) {
            value = '0' + value;
        }
        return value
    }

    

    //if/when timer has runout this component will be rendered
    if(countDown.past) {
        return <>
            <Center>
                <ExplosionConfetti isExploding={true}/>
                <Text3D
                font="/helvetiker_regular.typeface.json"
                position={[-6,0,0]}
                curveSegments={ 12 }
                bevelEnabled
                bevelThickness={ 0.02 }
                bevelSize={ 0.02 }
                bevelOffset={ 0 }
                bevelSegments={ 5 }
                >
                    HAPPY BIRTHDAY !
                    <meshNormalMaterial />
            </Text3D>
            </Center>
        </>
    }
    else 
    return <>
            <OrbitControls />
            <color args ={ [ '#AFEEEE']} attach="background" />
            <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 3.5 } />
            <ambientLight intensity={ 0.5 } />

            <Center>
                    <group>
                <Physics gravity={[0, -9.08, 0]}>
                        <group>
                            <ThreeDText text={addLeadingZeros(countDown.days)} position={[-10,0,0]} grav={false}/>
                            <ThreeDText text={'Days'} position={[-10,-1,0]} scale={0.5}/>
                        </group>
                        <group>
                            <ThreeDText text={addLeadingZeros(countDown.hours)} position={[-7,0,0.5]} />
                            <ThreeDText text={'Hours'} position={[-7,-1,0.5]} scale={0.5} />
                        </group>
                        <group>
                            <ThreeDText text={addLeadingZeros(countDown.min)} position={[-3,0,1]} />
                            <ThreeDText text={'Minutes'} position={[-3,-1,1]} scale={0.5} />
                        </group>
                        <group>
                            <ThreeDText text={addLeadingZeros(countDown.sec)} position={[2,0,1.5]} />
                            <ThreeDText text={'Seconds'} position={[2,-1,1.5]} scale={0.75} />
                        </group>
                        <RigidBody
                        type="fixed"
                        restitution={ 0 }
                        friction={ 0.7 }
                    >
                    <mesh receiveShadow position-y={ - 2.25 }>
                        <boxGeometry args={ [ 20, 0.5, 10 ] } />
                        <meshStandardMaterial color="greenyellow" />
                    </mesh>
                </RigidBody>

                </Physics>
                    </group>
                <ContactShadows
                    position-y={ -1.99 }
                    opacity={ 0.4 }
                    scale={ 29 }
                    blur={ 0.4 }
                />
            </Center>
        </>
} 
export default CountdownFunc