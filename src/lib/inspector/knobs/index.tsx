import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { haveKnobs, addKnobSubscriber, getKnobs, getKnobRenderer } from '../state-handler'

const Container = styled.div``

export default function Knobs() {
    const [ knobs, setKnobs ] = useState({})

    useEffect(() => {
        if (haveKnobs()) {
            setKnobs({ ...getKnobs() })
        }

        addKnobSubscriber((knob: any) => {
            if (typeof knob === 'string') {
                setKnobs((previousKnobs: any) => {
                    delete previousKnobs[knob]

                    return { ...previousKnobs }
                })
            } else {
                setKnobs((previousKnobs: any) => ({
                    ...previousKnobs,
                    ...{ [knob.name]: knob },
                }))
            }
        })
    }, [])

    if (Object.entries(knobs).length == 0) {
        return null
    }

    return (
        <Container>
            {Object.entries(knobs).map(([ name, knob ]: any) => {
                const Component = getKnobRenderer(knob.type)
                return <Component {...knob} />
            })}
        </Container>
    )
}
