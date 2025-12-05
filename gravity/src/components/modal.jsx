import { useEffect, useState } from 'react'
import * as _ from './modal.js'

export const Main_modal = ({ mass, height, PE, KE, v, onClose }) => {
    const [url, setUrl] = useState('');
    useEffect(()=>{console.log(url)},[url])
    return (
        <_.main>
            <_.modalBox>
                <_.top>
                    <_.topT>자유낙하 시뮬레이션</_.topT>
                </_.top>
                <_.mid>
                    <_.midMid>
                        <_.midMidMid>
                            <_.midMidMidLeft>
                                <_.midMidMidLeftTdiv>
                                    <_.midMidMidLeftT>속도 : {v.toFixed(2)}</_.midMidMidLeftT>
                                    <_.midMidMidLeftT>운동에너지 : {KE}</_.midMidMidLeftT>
                                </_.midMidMidLeftTdiv>
                                <_.midMidMidLeftScreen></_.midMidMidLeftScreen>
                            </_.midMidMidLeft>
                            <_.midMidMidRight>
                                <_.midMidMidRightlineDiv>
                                    <_.midMidMidRightlineDivT>{height }높이(m)</_.midMidMidRightlineDivT>
                                    <_.midMidMidline></_.midMidMidline>
                                    <_.midMidMidline></_.midMidMidline>
                                    <_.midMidMidline></_.midMidMidline>
                                    <_.midMidMidline></_.midMidMidline>
                                    <_.midMidMidline></_.midMidMidline>
                                    <_.midMidMidline></_.midMidMidline>
                                    <_.midMidMidline></_.midMidMidline>
                                    <_.midMidMidline></_.midMidMidline>
                                    <_.midMidMidline></_.midMidMidline>
                                    <_.midMidMidline></_.midMidMidline>
                                    <_.midMidMidline></_.midMidMidline>
                                </_.midMidMidRightlineDiv>
                            </_.midMidMidRight>
                        </_.midMidMid>
                    </_.midMid>
                </_.mid>
                <_.buttom>
                    <_.buttomMid>
                        <_.buttomMidT>질량 : {mass} kg | 초기 높이 : {height}m </_.buttomMidT>
                        <_.buttomButtonDiv>
                            <_.buttomBtton placeholder='이미지 경로' type='url' onChange={(e)=>{setUrl(e.target.value)}}></_.buttomBtton>
                            <_.buttomBtton2>추가하기</_.buttomBtton2>
                            <_.buttomBtton2>재생</_.buttomBtton2>
                            <_.buttomBtton3>리셋</_.buttomBtton3>
                            <_.buttomBtton4 onClick={onClose}>닫기</_.buttomBtton4>
                        </_.buttomButtonDiv>
                    </_.buttomMid>
                </_.buttom>
            </_.modalBox>
        </_.main>
    )
}