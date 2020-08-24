import React, { useEffect, useState, useReducer } from 'react'
import '../css/ChatTabs.css'
import { Avatar } from '@material-ui/core'
import db from '../firebase'
import { Link } from 'react-router-dom'
import { useDataLayerValue } from '../DataLayer'
import firebase from 'firebase'

function ChatTabs({ id, name, addNewChat }) {
	const [seed, setSeed] = useState('')
	const [{ user }, dispatch] = useDataLayerValue()
	const [messages, setMessages] = useState('')

	useEffect(() => {
		setSeed(Math.floor(Math.random() * 5000))

		if(id){
			db.collection('rooms').doc(id).collection('messages').orderBy('timestamp', 'desc')
			.onSnapshot(snapshot => setMessages(snapshot.docs.map(doc => doc.data())))
		}
	}, [id])

	const createChat = () => {
		const roomName = prompt('Please enter name for chat')
		
		if(roomName){
			// do some clever db stuff
			db.collection('rooms').add({
				name: roomName,
				date_created: firebase.firestore.FieldValue.serverTimestamp(),
				created_by: user.displayName,
			})
		}
	}

	return !addNewChat ? (
		<Link to={`/rooms/${id}`}>
			<div className="chattab">
				<Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
				<div className="chattab-info">
					<h5>{name}</h5>
					<p>
						{messages[0]?.message}
					</p>
				</div>
			</div>
		</Link>
	) : (
		<div onClick={createChat} className="chattab-new">
			<h5>Add new Chat</h5>
		</div>
	)
}

export default ChatTabs
