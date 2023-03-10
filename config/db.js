const mongoose = require("mongoose");
const connectionString = process.env.DATABASE_URL;
mongoose
  .connect(
    connectionString,

    // "mongodb+srv://" +
    //   process.env.MDB_USERNAME +
    //   ":" +
    //   process.env.MDB_PASSWORD +
    //   "@" +
    //   process.env.MDB_CLUSTER +
    //   ".mongodb.net/groupomania",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));
