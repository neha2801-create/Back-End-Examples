import React, {useRef} from 'react'

const Login = () => {

    return (
        <form action="/users/login" method="post">
            <label htmlFor="username">Username: </label>
            <input type="text" name="username" id="username" />
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" id="password" />
            <input type="submit" value="Login" />
        </form>
    )
}

export default Login