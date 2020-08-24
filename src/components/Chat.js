import React, { useEffect, useState } from 'react'
import '../css/Chat.css'
import { Avatar, IconButton } from '@material-ui/core'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import AttachFile from '@material-ui/icons/AttachFile'
import MoreVert from '@material-ui/icons/MoreVert'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import { useParams } from 'react-router-dom'
import db from '../firebase'
import { useDataLayerValue } from '../DataLayer'
import firebase from 'firebase'

function Chat() {
	const [seed, setSeed] = useState('')
	const [input, setInput] = useState('')
	const { roomid } = useParams()
	const [roomName, setRoomName] = useState('')
	const [messages, setMessages] = useState([])
	const [{ user }, dispatch] = useDataLayerValue()

	// useEffect(() => {
	// 	setSeed(Math.floor(Math.random() * 5000))
	// }, [])

	// room id use effect
	useEffect(() => {
		// create new avatar
		setSeed(Math.floor(Math.random() * 5000))
		// load clicked room
		if(roomid){
			db.collection('rooms').doc(roomid).onSnapshot(snapshot => {
				setRoomName(snapshot.data().name)
			})

			db.collection('rooms').doc(roomid)
				.collection('messages').orderBy('timestamp', 'asc')
				.onSnapshot(snapshot => {
					setMessages(snapshot.docs.map(doc => 
						doc.data()
				))
			})
		}
	}, [roomid])

	const sendMessage = (e) => {
		e.preventDefault()
		console.log('you typed: '+ input)

		db.collection('rooms').doc(roomid).collection('messages').add({
			message: input,
			name: user.displayName,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		})

		setInput('')
	}

	return (
		<div className="chat">
			<header className="chat-header">
				<Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
				
				<div className="chat-header-info">
					<h5>{roomName}</h5>
					<p>
						{`Last seen at ${new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}`}
					</p>
				</div>

				<div className="chat-header-right">
					<IconButton>
						<SearchOutlined />
					</IconButton>

					<IconButton>
						<AttachFile />
					</IconButton>

					<IconButton>
						<MoreVert />
					</IconButton>
				</div>
			</header>

			<section className="chat-body">
				{messages.map(message => (
					<div className={`chat-message ${message.name===user.displayName && 'chat-receiver'}`}>
						<span className="chat-name">{message.name}</span>
						<p>{message.message}</p>
						<span className="chat-timestamp">
							{new Date(message.timestamp?.toDate()).toUTCString()}
						</span>
					</div>
				))}
			</section>

			<footer className="chat-footer">
				<IconButton>
					<InsertEmoticonIcon />
				</IconButton>
				<form>
					<input type="text" 
						placeholder="Type a message"
						value={input}
						onChange={e => setInput(e.target.value)}
					/>
					<button type="submit" onClick={sendMessage}>Send message</button>
				</form>
				<IconButton>
					<MicIcon />
				</IconButton>
			</footer>
		</div>
	)
}

export default Chat
