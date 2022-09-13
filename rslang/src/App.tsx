import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { About, Audio, Dictionary, Main, Sprint, Statistics } from './pages';
import { Layout } from './layout/Layout';
import './App.scss';

function App() {
  const [isGameOpenFromMenu, setIsGameOpenFromMenu] = useState<boolean>(true);

  const handleGameOpenFromMenu = (value: boolean) => {
    setIsGameOpenFromMenu(value);
  };

  return (
    <Routes>
      <Route path="/" element={<Layout handleGameOpenFromMenu={handleGameOpenFromMenu} />}>
        <Route index element={<Main />} />
        <Route
          path="/dictionary"
          element={<Dictionary handleGameOpenFromMenu={handleGameOpenFromMenu} />}
        />
        <Route path="/audio" element={<Audio isGameOpenFromMenu={isGameOpenFromMenu} />} />
        <Route path="/sprint" element={<Sprint isGameOpenFromMenu={isGameOpenFromMenu} />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Main />} />
      </Route>
    </Routes>
  );
}

export default App;
