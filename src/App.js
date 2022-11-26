import Style from './App.module.scss';
import { BrowserRouter } from 'react-router-dom'
import MainRoute from './routes/MainRoute';

function App() {
  return (
    <BrowserRouter>
      <MainRoute style={Style} />
    </BrowserRouter>
  );
}

export default App;
