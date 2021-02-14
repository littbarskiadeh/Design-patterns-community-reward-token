import { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import PostComment from './Components/PostComment'
import LoginForm from './Components/LoginForm'
import Error from './Components/Error'
import Navbar from './Components/Navbar'

function App() {
  const divstyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5rem',
  }

  const navStyle = {
    padding: '2rem',
  }

  const [user, setUser] = useState(null)

  return (
    <div style={navStyle}>
      <Navbar />
      <div style={divstyle}>
        <Switch>
          <Route path="/" component={LoginForm} exact />
          <Route
            path="/home"
            render={(props) => <PostComment status="Add a question" />}
          />
          <Route component={Error} />
        </Switch>
      </div>
    </div>
  )
}

export default App
