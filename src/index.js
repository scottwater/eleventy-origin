import "./styles/styles.scss";

import { Application } from "stimulus";
import { definitionsFromContext } from "stimulus/webpack-helpers";
import turbolinks from "turbolinks";

const application = Application.start();
const context = require.context("./controllers", true, /\.js$/);
application.load(definitionsFromContext(context));
turbolinks.start();
