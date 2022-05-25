import PokemonsContainer from './containers/PokemonsContainer';
import axios from 'axios';
import { API_BASE_URL } from './shared/constants/api_base_url';

axios.defaults.baseURL = API_BASE_URL;

function App() {
  return (
    <PokemonsContainer />
  );
}

export default App;
