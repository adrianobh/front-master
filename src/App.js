import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./views/Login";
import Index from "./views/Index";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faCheckSquare,
  faCoffee,
  faBox,
} from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Container } from "react-bootstrap";

library.add(fab, faCheckSquare, faCoffee, faBox);
function App() {
  return (
    <div className="App">
      <Container fluid>
        <Row>
          <Col>
            <BrowserRouter>
              <Switch>
                <Route
                  path="/"
                  exact
                  render={(props) => <Login {...props} />}
                />
                <Route path="/home" render={(props) => <Index {...props} />} />
              </Switch>
            </BrowserRouter>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
