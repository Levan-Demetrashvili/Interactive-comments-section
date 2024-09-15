import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store.ts';
import App from './App.tsx';
import './index.css';

import { fetchComments } from './features/comments/comments.ts';
import { fetchCurrentUser } from './features/CurrentUser/currentUser.ts';

store.dispatch(fetchComments());
store.dispatch(fetchCurrentUser());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
