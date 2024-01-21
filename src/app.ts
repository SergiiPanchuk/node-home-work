import * as path from "node:path";

import express from "express";
import { engine } from "express-handlebars";

import { configs } from "./configs/config";
import { errorRouter } from "./routers/errors.router";
import { loginRouter } from "./routers/login.router";
import { registerRouter } from "./routers/register.router";
import { userRouter } from "./routers/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/error", errorRouter);

app.use("*", errorRouter);

app.use(express.static(path.join(process.cwd(), "static")));
app.set("view engine", ".hbs");
app.engine(".hbs", engine({ defaultLayout: false }));
app.set("views", path.join(process.cwd(), "static"));

const PORT = configs.PORT;
app.listen(PORT, () => {
  console.log(`Server has started on PORT ${PORT}`);
});
