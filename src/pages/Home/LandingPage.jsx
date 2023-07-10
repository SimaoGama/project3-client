import { useContext } from 'react';
import { ColorModeContext } from '../../context/theme.context';

const LandingPage = () => {
  const { theme } = useContext(ColorModeContext);

  return (
    <>
      <h1>
        <div>LANDING PAGE</div>
      </h1>
    </>
  );
};

export default LandingPage;
