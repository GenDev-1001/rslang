import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Layout } from './layout/Layout';
import { About } from './pages/About/About';
import { Audio } from './pages/Audio/Audio';
import { Dictionary } from './pages/Dictionary/Dictionary';
import { Main } from './pages/Main/Main';
import { Sprint } from './pages/Sprint/Sprint';
import { Statistics } from './pages/Statistics/Statistics';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />} />
        <Route path="/dictionary" element={<Dictionary />} />
        <Route path="/audio" element={<Audio />} />
        <Route path="/sprint" element={<Sprint />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Main />} />
      </Route>
    </Routes>
  );
}

export default App;
