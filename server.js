import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line

app.get("/api{/:date}", (req, res) => {
  const rawDateString = req.params.date;
  if (!rawDateString) {
    const date = new Date();
    res.json({unix: date.getTime(), utc: date.toUTCString()});
  } else {
    const rawDateNumber = Number(rawDateString);
    if (!isNaN(rawDateNumber)) {
      const date = new Date(rawDateNumber);
      res.json({unix: date.getTime(), utc: date.toUTCString()})
    } else {
      const date = new Date(rawDateString)
      if (date.toString() !== "Invalid Date") {
        res.json({unix: date.getTime(), utc: date.toUTCString()})
      } else {
        res.json({ error: date.toString() })
      }
    }
  }  
})


// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
