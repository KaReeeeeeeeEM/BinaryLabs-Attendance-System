import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Router from './Routes'
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {Router.map(route => <Route key={route.key} path={route.path} element={route.element} />)}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
