import { Express } from "express";
import { Connection, In } from "typeorm";
import { Request, Response } from "express";
import { PPPerformance } from "../entities/PPPerformance";
import { User } from "../entities/User";

interface Body {
  achievement: string;
  userId: string;
  date: string;
}

/// Set the PPPerformance routes
const setPPPerformanceRoutes = (app: Express, connection: Connection) => {
  const performanceRepository = connection.getRepository(PPPerformance);
  const userRepository = connection.getRepository(User);

  app.get("/performances", async function (req: Request, res: Response) {
    const performances = await performanceRepository.find({
      relations: ["user", "feedbacks"],
    });
    res.json(performances);
  });

  app.get("/performances/:id", async function (req: Request, res: Response) {
    const result = await performanceRepository.findOne(req.params.id, {
      relations: ["user"],
      // Also return the user associate with the feedback
      join: {
        alias: "performance",
        leftJoinAndSelect: {
          feedbacks: "performance.feedbacks",
          user: "feedbacks.user",
        },
      },
    });

    return res.send(result);
  });

  app.post("/performances", async function (req: Request, res: Response) {
    const body: Body = req.body;
    // repositiory.create does not regonize that body is not array so create manually
    // Bug?
    const performance = new PPPerformance();
    performance.achievement = body.achievement;

    // Find user who is the owner
    const user = await userRepository.findOne(req.body.userId);
    performance.user = user;

    performance.date = body.date;

    const reviewerIds: string[] = req.body.reviewerIds;
    const reviewers = await userRepository.find({
      where: { id: In(reviewerIds) },
    });
    performance.reviewers = reviewers;

    const result = await performanceRepository.save(performance);

    return res.send(result);
  });

  app.put("/performances/:id", async function (req: Request, res: Response) {
    /// Do not allow change userId and feedbackIds
    const { userId, feedbackIds, ...body } = req.body;
    const performance = await performanceRepository.findOne(req.params.id);

    const reviewerIds: string[] = req.body.reviewerIds;
    const reviewers = await userRepository.find({
      where: { id: In(reviewerIds) },
    });
    performance.reviewers = reviewers;

    performanceRepository.merge(performance, body);

    const result = await performanceRepository.save(performance);
    return res.send(result);
  });

  app.delete("/performances/:id", async function (req: Request, res: Response) {
    const performance = await performanceRepository.delete(req.params.id);
    return res.send(performance);
  });
};

export default setPPPerformanceRoutes;
