import { useEffect, useState } from "react"
import ThreeDText from "./ThreeDText"
import { Center, OrbitControls } from "@react-three/drei"


const CountdownFunc = (props) => {
    const [countDown, setCountDown] = useState({
        days: 0, 
        hours: 0,
        min: 0, 
        sec: 0
    })

    useEffect(() => {
        const calculateCountdown = (endDate) => {
            let diff = (Date.parse(new Date(endDate)) -Date.parse(new Date())) / 1000
            
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
        const interval = setInterval(() => {
            const date = calculateCountdown(props.date)
            date ? setCountDown(date) : console.log('date is falsy') //the countdown should not be negative, momentary console.log
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

    return <>
            <OrbitControls />
            <color args ={ [ '#AFEEEE']} attach="background" />
            <ambientLight intensity={ 0.5 } />

            <Center>
                <group>
                    <ThreeDText text={addLeadingZeros(countDown.days)} position={[-12,0,0]} />
                    <ThreeDText text={'Days'} position={[-12,-1,0]} scale={0.5}/>
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
            </Center>
        </>
} 
export default CountdownFunc
