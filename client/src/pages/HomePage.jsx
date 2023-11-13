import NavigationBar from "../components/NavigationBar.js";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function HomePage() {
  return (
      <div>
          <NavigationBar/>
      </div>
  );
}

export default HomePage;
