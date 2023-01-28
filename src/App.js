import Board from './Board';

function App() {
  return (
    <div className="App text-center">
      <h1 className="text-center">Tic Tac Toe</h1>
      <Board />
      <span>
        Developed By
        {' '}
        {' '}
        <a className="text-center" target="_blank" href="https://www.facebook.com/freera4bia" rel="noreferrer"> Mustafa Ahmed</a>
      </span>
    </div>
  );
}

export default App;
