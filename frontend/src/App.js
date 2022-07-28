import "./App.css";
import Home from "./components/index";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
