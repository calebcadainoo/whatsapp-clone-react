import React, { useEffect, useState } from 'react'
import '../css/Sidebar.css'
import { Avatar, IconButton } from '@material-ui/core'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import ChatTabs from '../components/ChatTabs'
import db from '../firebase'
import { useDataLayerValue } from '../DataLayer'

function Sidebar() {
	const [rooms, setRooms] = useState([])
	const [{ user }, dispatch] = useDataLayerValue()

	useEffect(() => {
		const unsubscribe = db.collection('rooms').onSnapshot(snapshot => {
			setRooms(snapshot.docs.map(doc => (
				{
					id: doc.id,
					data: doc.data(),
				}
			)))
		})

		// clean up function
		return () => {
			unsubscribe()
		}
	}, [])

	return (
		<div className="sidebar">
			{/* header */}
			<header className="sidebar-header">
				<Avatar src={user?.photoURL} />
				{/* <img src={user?.photoURL} alt="" /> */}
				<div className='sidebar-header-right'>
					
					<IconButton>
						<DonutLargeIcon />
					</IconButton>
					
					<IconButton>
						<ChatIcon />
					</IconButton>
					
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</div>
			</header>

			{/* search */}
			<div className="sidebar-search">
				<div className="sidebar-search-box">
					<SearchOutlined />
					<input type="text" placeholder="Search or start new chat" />
				</div>
			</div>

			{/* chats tabs */}
			<div className="sidebar-chat-tabs">
				<ChatTabs addNewChat />
				{rooms.map(room => (
					<ChatTabs 
						key={room.id} 
						id={room.id} 
						name={room.data.name}
					/>
				))}

				{/* <ChatTabs addNewChat />
				<ChatTabs />
				<ChatTabs />
				<ChatTabs /> */}
			</div>
		</div>
	)
}

export default Sidebar
