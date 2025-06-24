import ProductoList from './components/Catalogo';
import UsuarioList from './components/UsuarioList';
import BarList from './components/BarList';

interface AppProps {
  title: string;
}

function App({ title }: AppProps) {
  return (
    <div>
      <h1>{title}</h1>
      <ProductoList />
      <UsuarioList />
      <BarList/>
    </div>
  );
}

export default App;