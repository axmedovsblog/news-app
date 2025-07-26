import React from 'react'
import News from './News'
import { useParams } from 'react-router-dom'

const ClientNews = () => {
	const {id} =  useParams();
	return (
		<div>
			<News user_id = {id}/>
		</div>
	)
}

export default ClientNews