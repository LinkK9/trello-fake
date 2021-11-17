import React from 'react'
import { CardContainer } from '../../styles'

export type CardProps = {
	text: string
}
const Card = ( {text}: CardProps) => {
	return (
		<CardContainer>{text}</CardContainer>
	)
}

export default Card
