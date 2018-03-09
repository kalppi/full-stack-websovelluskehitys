import React from 'react'

const Login = ({onSubmit, username, password, onChange}) => (
	<div>
		<h2>Kirjaudu sovellukseen</h2>
		<form onSubmit={onSubmit}>
			<div>
				Nimi:
				<input type="text" name="username" value={username} onChange={onChange} />
			</div>
			<div>
				Salasana:
				<input type="password" name="password" value={password} onChange={onChange} />
			</div>
			<div>
				<button type="submit">kirjaudu</button>
			</div>
		</form>
	</div>
)

export default Login