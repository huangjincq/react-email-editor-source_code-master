import { createBrowserHistory } from 'history'
import { Router } from 'react-router-dom'
import EmailEditor from './components/EmailEditor'

function App() {
  const history = createBrowserHistory()

  return (
    <Router history={history}>
      <EmailEditor defaultBlockList={[]} />
    </Router>
  )
}

export default App
