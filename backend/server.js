require("dotenv").config();

const express = require("express");
const cors = require("cors");

const studentRoutes = require("./routes/students");
const departmentRoutes = require("./routes/departments");
const companyRoutes = require("./routes/companies");
const jobRoleRoutes = require("./routes/jobroles");
const driveRoutes = require("./routes/drives");
const applicationRoutes = require("./routes/applications");
const offerRoutes = require("./routes/offers");
const reportRoutes = require("./routes/reports");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {

    res.send("CareerBridge Backend Running...");

});

app.use("/students", studentRoutes);
app.use("/departments", departmentRoutes);
app.use("/companies", companyRoutes);
app.use("/jobroles", jobRoleRoutes);
app.use("/drives", driveRoutes);
app.use("/applications", applicationRoutes);
app.use("/offers", offerRoutes);
app.use("/reports", reportRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`🚀 Server running on port ${PORT}`);

});