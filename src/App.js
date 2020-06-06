import React from "react";
import { Switch, Route } from "react-router-dom";

import PublicLayout from "./layouts/Public";
import PrivateLayout from "./layouts/Private";

import NotFound from "./pages/404";

import routes from "./routes";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

function App() {
  const { publicPages, privatePages } = routes;

  const renderPrivatePages = function (pages) {
    return pages.map((page) => {
      const { id, component: Component, path } = page;
      return (
        <Route
          exact
          path={path}
          key={id}
          render={(route) => (
            <PrivateLayout route={route}>
              <Component route={route} />
            </PrivateLayout>
          )}
        />
      );
    });
  };

  const renderPublicPages = function (pages) {
    return pages.map((page) => {
      const { id, component: Component, path } = page;
      return (
        <Route
          exact
          path={path}
          key={id}
          render={(route) => (
            <PublicLayout route={route}>
              <Component route={route} />
            </PublicLayout>
          )}
        />
      );
    });
  };

  return (
    <div className="App">
      <Switch>
        {renderPublicPages(publicPages)}
        {renderPrivatePages(privatePages)}
        <Route render={() => <NotFound />} />
      </Switch>
    </div>
  );
}

export default App;
