import server from "./src/index.js";
import processEnvVar from "./src/utils/processEnvVariable.js";
import connectToMongoDB from "./src/database/connectToMongoDB.js";

const PORT = processEnvVar.PORT || 5050;

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    connectToMongoDB();
})