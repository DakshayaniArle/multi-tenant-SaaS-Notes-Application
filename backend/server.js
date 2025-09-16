import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js"
import authRoutes from "./routes/auth.js"
import notesRoutes from "./routes/notes.js"
import tenantRoutes from "./routes/tenant.js"
import userRoutes from "./routes/users.js"

// console.log("Starting server...");
dotenv.config();
await connectDB();


const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/notes",notesRoutes);
app.use("/api/tenant",tenantRoutes);
app.use("/api/users", userRoutes);


app.get("/api/health",(req,res)=>{// contains { slug, name }
    res.json({status:"ok"});
})


// const PORT = process.env.PORT || 5000;
// app.listen(PORT,()=>{
//     console.log(`server is running at port ${PORT}.........`);
// })

export default app 