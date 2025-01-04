const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());




app.get("/",(req, res) => {
    res.send("Welcome to duah!")
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});