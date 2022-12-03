import { NavBar } from '../components/NavBar';
import { useState } from 'react';
import { Entity } from './Entity';
import { Dashboard } from './Dashboard';
import { Verifier } from './Verifier';

export const TabsView = () => {
  const [page, setPage] = useState<string>('entity');
  const renderPage = () => {
    if (page === 'entity') {
      return (<Entity />);
    } else if (page === 'dashboard') {
      return (<Dashboard />);
    } else if (page === 'verifier') {
      return (<Verifier />);
    }
  }
  return (
    <div>
      <NavBar page={page} setPage={setPage}>
        {
          renderPage()
        }
      </NavBar>
    </div>
  )
}