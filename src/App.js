import logo from './logo.svg';
import './App.css';

import MovieReview from './components/MovieReview';
import { Provider } from 'react-redux';
import { store } from './app/store';

function App() {
  return (
    <Provider store={store}>
    <div>
      <MovieReview></MovieReview>
    </div>
    </Provider>
  );
}

export default App;
