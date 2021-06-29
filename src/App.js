import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import StudentList from './pages/student-list'
import { GlobalProvider } from './context/GlobalState';

import 'antd/dist/antd.css';

function App() {
  return (
    <div>
      <GlobalProvider>
      <Switch>
        <Route
          path='/'
          exact={true}
          component={StudentList}
        />

      </Switch>
        
      </GlobalProvider>
    </div>
  );
}

export default App;
