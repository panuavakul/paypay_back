import { Express } from "express";
import { Connection } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entities/User";

interface Body {
  firstName: string;
  lastName: string;
}

/// Set the Users routes
const setUsersRoutes = (app: Express, connection: Connection) => {
  const userRepository = connection.getRepository(User);

  app.get("/users", async function (req: Request, res: Response) {
    const users = await userRepository.find();
    res.json(users);
  });

  app.get("/users/:id", async function (req: Request, res: Response) {
    const result = await userRepository.findOne(req.params.id, {
      relations: ["performances", "feedbacks"],
    });
    return res.send(result);
  });

  app.post("/users", async function (req: Request, res: Response) {
    const body: Body = req.body;
    const user = await userRepository.create(body);
    const result = await userRepository.save(user);
    return res.send(result);
  });

  app.put("/users/:id", async function (req: Request, res: Response) {
    const user = await userRepository.findOne(req.params.id);
    const body: Body = req.body;
    userRepository.merge(user, body);
    const result = await userRepository.save(user);
    return res.send(result);
  });

  app.delete("/users/:id", async function (req: Request, res: Response) {
    const result = await userRepository.delete(req.params.id);
    return res.send(result);
  });
};

export default setUsersRoutes;
