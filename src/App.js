import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostDetails from './pages/PostDetails';
import PostList from './pages/PostList';

function App() {

  return (
    <BrowserRouter>
      <h1>Lowen's adventures blog</h1>
      <Routes>
        <Route path='/' element={<PostList/>} />
        <Route path='/post/:id/' element={<PostDetails/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
