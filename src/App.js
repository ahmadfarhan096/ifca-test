import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import StudentList from './pages/student-list'

import 'antd/dist/antd.css';

function App() {
  return (
    <div>
 
      <Switch>
        <Route
          path='/'
          exact={true}
          component={StudentList}
        />

      </Switch>
        
    
    </div>
  );
}

export default App;
