import { useEffect, useState } from "react"
import ThreeDText from "./ThreeDText"
import { Center, OrbitControls, ContactShadows } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { Physics, RigidBody } from "@react-three/rapier"
import BirthdayText from "./BirthdayText"


const CountdownFunc = (props) => {
    const [countDown, setCountDown] = useState({
        years: 0,
        days: 0, 
        daysDepleted: false,
        hours: 0,
        hoursDepleted: false,
        min: 0, 
        minDepleted: false,
        sec: 0, 
        secDepleted: false,
        past: false
    })

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
                    daysDepleted: 0,
                    hours: 0,
                    hoursDepleted: 0,
                    min: 0, 
                    minDepleted: 0,
                    sec: 0, 
                    secDepleted: 0,
                    past: false
                }
                
                if (diff >= 365.25 * 86400) {
                    timeLeft.years = Math.floor(diff / (365.25 * 86400));
                    diff -= timeLeft.years * 365.25 * 86400;
                    
                }
                if (diff >= 86400) {
                    timeLeft.days = Math.floor(diff / 86400);
                    diff -= timeLeft.days * 86400;

                    if (timeLeft.days === 0) {
                        setCountDown((prevState) => ({
                            ...prevState,
                            daysDepleted: true,
                        }));
                    }
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
            const date = calculateCountdown(props.date);
            
            if (date) {
                setCountDown(prevState => {
                    return {
                        ...date,
                        daysDepleted: date.days === 0 ? 1.1 : 0,
                        hoursDepleted: date.days === 0 && date.hours === 0 ? 1.05 : 0,
                        minDepleted: date.days === 0 && date.hours === 0 && date.min === 0 ? 1.08 : 0,
                        secDepleted: date.days === 0 && date.hours === 0 && date.min === 0 && date.sec === 0 ? 1.15 : 0,
                    };
                });
            } else {
                setCountDown((prevState) => ({ ...prevState, past: true }));
            }
        }, 1000);
        return () => clearInterval(interval)
    }, [props.date]) //rerender each time date changes, will be every second

    const addLeadingZeros = (value) => {
        value = String(value)
        while (value.length < 2) {
            value = '0' + value;
        }
        return value
    }
    // const screenWidth = window.innerWidth/120

    // console.log(screenWidth*120)
    // const {camera} = useThree()
    // camera.position.set(0,0,screenWidth)

    
    //if/when timer has runout this component will be rendered
    if(countDown.past) {
        return <>
            <BirthdayText />
        </>
    }
    else 
    console.log(countDown)
    return <>
            <OrbitControls />
            <color args ={ [ '#AFEEEE']} attach="background" />
            <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 3.5 } />
            <ambientLight intensity={ 0.5 } />
            <camera />

            <Center>
                    <group >
                <Physics gravity={[0, -9.08, 0]}>
                        <group key={1 + countDown.daysDepleted}>
                            <ThreeDText text={addLeadingZeros(countDown.days)} position={[-2,0,0]} grav={countDown.daysDepleted} />
                            <ThreeDText text={'Days'} position={[-2,-1,0]} scale={0.5} grav={countDown.daysDepleted} />
                        </group>
                        <group key={2 + countDown.hoursDepleted}>
                            <ThreeDText text={addLeadingZeros(countDown.hours)} position={[1,0,0.3]} grav={countDown.hoursDepleted}/>
                            <ThreeDText text={'Hours'} position={[1,-1,0.5]} scale={0.5} grav={countDown.hoursDepleted} />
                        </group>
                        <group key={3 + countDown.minDepleted}  >
                            <ThreeDText text={addLeadingZeros(countDown.min)} position={[-3,3,0.9]} grav={countDown.minDepleted} />
                            <ThreeDText text={'Minutes'} position={[-3,2,1]} scale={0.5} grav={countDown.minDepleted} />
                        </group>
                        <group key={4 + countDown.secDepleted}>
                            <ThreeDText text={addLeadingZeros(countDown.sec)} position={[1,3,1.3]} grav={countDown.secDepleted} />
                            <ThreeDText text={'Seconds'} position={[0.5,2,1.5]} scale={0.55} grav={countDown.secDepleted} />
                        </group>
                        <RigidBody
                        type="fixed"
                        restitution={ 0 }
                        friction={ 0.7 }
                    >
                    {/* the mesh below serves as a landing ground for the timer text */}
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
export default CountdownFunc;