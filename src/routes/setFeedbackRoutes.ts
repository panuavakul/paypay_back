import { Express } from "express";
import { Connection } from "typeorm";
import { Request, Response } from "express";
import { PPPerformance } from "../entities/PPPerformance";
import { User } from "../entities/User";
import { Feedback } from "../entities/Feedback";

interface Body {
  points: number;
  comment: string;
  userId: string;
  performanceId: string;
}

/// Set the PPPerformance routes
const setFeedbackRoutes = (app: Express, connection: Connection) => {
  const performanceRepository = connection.getRepository(PPPerformance);
  const userRepository = connection.getRepository(User);
  const feedbackRepository = connection.getRepository(Feedback);

  app.get("/feedbacks", async function (req: Request, res: Response) {
    const feedbacks = await feedbackRepository.find({ relations: ["user"] });
    res.json(feedbacks);
  });

  app.get("/feedbacks/:id", async function (req: Request, res: Response) {
    const result = await feedbackRepository.findOne(req.params.id, {
      relations: ["user"],
    });
    return res.send(result);
  });

  app.post("/feedbacks", async function (req: Request, res: Response) {
    const body: Body = req.body;

    const feedback = new Feedback();
    const points: number = body.points;

    // TODO: Make a validation funtions later
    if (points > 5 || points < 0) {
      return res.status(422).send("Points can only be from 0 to 5");
    }

    const comment: string = body.comment;

    feedback.points = points;
    feedback.comment = comment;

    // Find user who is the owner
    const user = await userRepository.findOne(body.userId);
    feedback.user = user;

    // Find the performance that this belong to
    const performance = await performanceRepository.findOne(body.performanceId);
    feedback.performance = performance;

    const result = await feedbackRepository.save(feedback);

    return res.send(result);
  });

  app.put("/feedbacks/:id", async function (req: Request, res: Response) {
    /// Do not allow change userId and feedbackIds
    const { userId, performanceId, ...body } = req.body;

    const feedback = await feedbackRepository.findOne(req.params.id);

    feedbackRepository.merge(feedback, body);
    const results = await userRepository.save(feedback);
    return res.send(results);
  });

  app.delete("/feedbacks/:id", async function (req: Request, res: Response) {
    const performance = await feedbackRepository.delete(req.params.id);
    return res.send(performance);
  });
};

export default setFeedbackRoutes;
