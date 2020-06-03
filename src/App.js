import React from "react";
import { Switch, Route } from "react-router-dom";

import PublicLayout from "./layouts/Public";
import PrivateLayout from "./layouts/Private";

import routes from "./routes";

import "./App.css";

function App() {
  const { publicPages, privatePages } = routes;

  const renderPrivatePages = function (pages) {
    return null;
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
            <PublicLayout>
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
      </Switch>
    </div>
  );
}

export default App;
