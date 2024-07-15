import logo from './logo.svg';
import './App.css';

import MovieReview from './components/MovieReview';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter as Router } from 'react-router-dom';
import MoviesList from './components/MoviesList';

function App() {
  return (
    <Provider store={store}>
    <div>
      <MoviesList></MoviesList>
      <MovieReview></MovieReview>
    </div>
    </Provider>
  );
}

export default App;
