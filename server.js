import "dotenv/config";
import app from "./app.js";

// Variável para porta
const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Rodando servidor backend na porta ${port}`));