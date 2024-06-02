const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.DB_URI)
  .then(({ connection: { host } }) => {
    console.log(`Connected to MongoDB: ${host}`);
  })
  .catch((error) => {
    console.log(error);
  });
