import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import UserList from './pages/user-list'

import 'antd/dist/antd.css';

function App() {
  return (
    <div>
 
      <Switch>
        <Route
          path='/'
          exact={true}
          component={UserList}
        />

      </Switch>
        
    
    </div>
  );
}

export default App;
