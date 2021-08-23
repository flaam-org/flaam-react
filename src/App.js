import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import RoutingComp from './router';
import { manageLoginAsync } from './slices/authSlice';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(manageLoginAsync())

  },[dispatch])


  return <RoutingComp />;
}

export default App;
