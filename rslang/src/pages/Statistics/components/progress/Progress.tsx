import { FC, useState, useEffect } from 'react';
import './Progress.scss';

export interface IProgressBar {
  progress: number;
}

const Progress: FC<IProgressBar> = ({ progress }) => {
  useEffect(() => {
    setTimeout(() => {
      const progressBar = document.querySelector('.progress-circle') as HTMLDivElement;
      let progressValue = 0;

      const tick = () => {
        progressValue += 1;

        progressBar.style.background = `conic-gradient(rgba(171, 71, 188, 1) ${
          progressValue * 3.6
        }deg, rgba(96, 136, 25, 0.15) ${progressValue * 3.6}deg)`;

        if (progressValue < progress) {
          requestAnimationFrame(tick);
        }
      };

      tick();
    }, 1000);
  }, []);

  return (
    <div className="progress-wrapper">
      <h2>Accuracy</h2>
      <div className="circle progress-circle">
        <h2>{`${progress} %`}</h2>
      </div>
    </div>
  );
};

export { Progress };
