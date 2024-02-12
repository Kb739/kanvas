import './App.css';
import Canvas from './components/canvas';
import data from './components/canvas/sample.json'
function App() {
  return (
    <div className="App">
      <Canvas data={data} />
    </div>
  );
}

export default App;
