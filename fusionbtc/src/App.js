import Search from './components/Search'
import './styles/bootstrap.css'
import './styles/styles.css'

// Just the container, nothing suspicious here Sir.

function App() {
  return (
    <>
    <h2 className="text-center primary-title">Fusion<span style={{color: "#6aa3e7"}}>BTC</span></h2>
    <div className="container">
      <div className="row">
        <div key="1" className="col"></div>
        <div key="2" className="col-8">
          <Search/>
        </div>
        <div key="3" className="col"></div>
      </div>
    </div>
    </>
  );
}

export default App;
