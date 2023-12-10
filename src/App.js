import {
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";
import HomePage from './components/Homepage';
function App() {
  return (
    <div className="Main">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
