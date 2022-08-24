import { useState } from 'react';
import background from '../../images/sprint-greetings-bg.jpg';
import './Audio.scss';
import AudioGreetings from './components/AudioGreetings';

export const Audio: React.FC = () => {
  const [level, setLevel] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleSetLevel = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    const textContent = target.textContent as string;
    setLevel(textContent);
    handleLoading();
  };

  return (
    <div className="audio-wrapper">
      <img src={background} alt="Audio Background" className="audio-wrapper__bg" />
      <AudioGreetings onClick={handleSetLevel} />
    </div>
  );
};
