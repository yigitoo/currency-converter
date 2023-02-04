import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
const app: Express = express();
dotenv.config()

app.set("port", process.env.PORT || 3000)
app.use(express.json())

let baseURL: string = "https://api.exchangerate.host/latest?base=";

app.get("/api", async (req: Request, res: Response) => {
  let base = req.query.base;
  let target = req.query.target;
  let request = await fetch(baseURL+base);
  let response = await request.json();
  res.send(response.rates[target]);
})

app.listen(app.get("port"), function(){
  console.log(`[SERVER_UP] at http://localhost:${app.get("port")}/`);
})
