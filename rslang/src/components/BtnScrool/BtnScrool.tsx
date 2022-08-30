import cn from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import './BtnScrool.scss';

export const BtnScrool = () => {
  const handlerScrollUp = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  const [scroll, setScroll] = useState(0);
  const onScroll = useCallback(() => setScroll(Math.round(window.scrollY)), []);
  useEffect(() => {
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  return (
    <div className={cn('btn-scroll-up', { active: scroll > 0 })} onClick={handlerScrollUp}>
      &#9650;
    </div>
  );
};
