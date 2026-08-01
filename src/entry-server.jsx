import React from "react";
import { renderToString } from "react-dom/server";
import { CurrentRoute } from "./main.jsx";

export function renderRoute(pathname, options = {}) {
  return renderToString(
    <CurrentRoute pathname={pathname} initialLanguage={options.initialLanguage} />,
  );
}
