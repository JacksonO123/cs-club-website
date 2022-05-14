import './App.scss';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Router from './pages/Router/Router';

function App() {
  return (
    <div className="app col">
      <Header></Header>
      <div className="content row">
        <Sidebar></Sidebar>
        <Router></Router>
      </div>
    </div>
  );
}

export default App;