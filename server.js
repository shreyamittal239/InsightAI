import "dotenv/config";
import app from "./src/app.js"
import connectDB from "./src/config/database.js";
import {testAi} from "./src/services/ai.service.js";
const PORT = process.env.PORT || 8000;

connectDB()
.catch((err) => {
    console.error("MongoDb connection failed:" , err);
    process.exit(1);
});

testAi();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});