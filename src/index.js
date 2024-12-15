const app = require("./app");
require("dotenv").config();

async function init() {
  try {
    const port = process.env.PORT ?? 3030;
    await app.listen(port);

    console.log(`-> Server start on port ${port}`);

  } catch (error) {
    console.error("Error starting server: ", error);
  }
}

init();
