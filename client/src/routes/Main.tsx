import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

import PageLayout from '../components/PageLayout';

const Main = () => {
  const initialized = useInit();

  if (!initialized) return null;

  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
};

// TODO: add proper initialization logic...
const useInit = () => {
  const [initialized, setInitialized] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    setTimeout(() => {
      setInitialized(true);
      navigate('home');
    }, 500);
  }, []); // eslint-disable-line

  return initialized;
};



export default Main;
