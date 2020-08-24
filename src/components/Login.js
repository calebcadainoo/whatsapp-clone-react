import React from 'react'
import '../css/Login.css'
import { Button } from '@material-ui/core'
import { auth, provider } from '../firebase'
import { useDataLayerValue } from '../DataLayer'
import { actionTypes } from '../reducer'

function Login() {
	const [{}, dispatch] = useDataLayerValue()

	const signIn = () => {
		auth.signInWithPopup(provider)
			.then(result => {
				dispatch({
					type: actionTypes.SET_USER,
					user: result.user,
				})

				console.log(result)
			})
			.catch((error) => alert(error.message))

	}

	return (
		<div className='login'>
			<div className="login-container">
				<img 
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/597px-WhatsApp.svg.png" 
					alt="" 
				/>
				<div className="login-text">
					<h1>Sign In to WhatsApp</h1>
				</div>

				<Button type="submit" onClick={signIn}>
					Sign in With Google
				</Button>
			</div>
		</div>
	)
}

export default Login
