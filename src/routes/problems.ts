import { Router, Request, Response } from "express";
import isAuth from "../helpers/isAuth";
import isAdmin from "../helpers/isAdmin";
import Problem from "../models/problem";
import axios from "axios";

const router = Router();

router.post(
  "/new",
  isAuth,
  isAdmin,
  async (
    req: Request<{}, {}, { name: string; description: string }>,
    res: Response
  ) => {
    const problemsUrl = `${process.env.SPHERE_BASE_PROBLEM_URL}/problems?access_token=${process.env.PROBLEMS_API}`;
    console.log(problemsUrl);
    try {
      const problemsRes = await axios.post(problemsUrl, {
        name: req.body.name,
        body: req.body.description,
        masterjudgeId: "1001",
      });
      console.log(problemsRes.data);
      const newProblem = new Problem({
        name: req.body.name,
        description: req.body.description,
        sphere_id: problemsRes.data.id,
      });

      const savedProblem = await newProblem.save();
      return res.json(savedProblem);
    } catch (e: any) {
      console.log("HI?");
      console.log(e.message);
    }
  }
);

router.put(
  "/update",
  isAuth,
  isAdmin,
  async (
    req: Request<
      {},
      {},
      {
        name?: string;
        description?: string;
        activeTestcases?: string;
        id: string;
      }
    >,
    res: Response
  ) => {
    const problemsUrl = `${process.env.SPHERE_BASE_PROBLEM_URL}/problems/${req.body.id}?access_token=${process.env.PROBLEMS_API}`;
    try {
      const { id, ...data } = req.body;
      const updatedData = await Problem.findOneAndUpdate(
        { sphere_id: id },
        {
          ...data,
        }
      );
      const problemsUpdateResponse = await axios.put(problemsUrl, {
        ...data,
      });
      return res.json({
        message: "Updated",
      });
    } catch (e: any) {
      console.log(e.message);
      return res.json({
        error: e.message,
      });
    }
  }
);

router.delete(
  "/delete",
  isAuth,
  isAdmin,
  async (
    req: Request<
      {},
      {},
      {
        id: string;
      }
    >,
    res: Response
  ) => {
    const problemsUrl = `${process.env.SPHERE_BASE_PROBLEM_URL}/problems/${req.body.id}?access_token=${process.env.PROBLEMS_API}`;
    try {
      const deletedProblem = await Problem.findOneAndDelete({
        sphere_id: req.body.id,
      });
      await axios.delete(problemsUrl);
      return res.json(deletedProblem);
    } catch (e: any) {
      console.log(e.message);
      return res.json({
        error: e.message,
      });
    }
  }
);

router.post(
  "/test_case",
  isAuth,
  isAdmin,
  async (
    req: Request<
      {},
      {},
      { id: string; input: string; output: string; timeLimit: Number }
    >,
    res: Response
  ) => {
    const problemsUrl = `${process.env.SPHERE_BASE_PROBLEM_URL}/problems/${req.body.id}/testcases?access_token=${process.env.PROBLEMS_API}`;
    console.log(problemsUrl);
    try {
      const found = await Problem.find({ sphere_id: req.body.id });
      if (!(found.length > 0)) {
        return res.json({
          error: "No such problem found",
        });
      }
      const problemsTestCasesResponse = await axios.post(problemsUrl, {
        input: req.body.input,
        output: req.body.output,
        judgeId: 1,
        timeLimit: req.body.timeLimit,
      });

      const activeTestCases = problemsTestCasesResponse.data;
      return res.json({
        activeTestCases,
      });
    } catch (e: any) {
      console.log(e.message);
      return res.json({
        error: e.message,
      });
    }
  }
);

router.post(
  "/check",
  isAuth,
  async (
    req: Request<
      {},
      {},
      { problemId: Number; source: String; compilerId: Number, wh: string }
    >,
    res: Response,
    next
  ) => {
    const submissionUrl = `${process.env.SPHERE_BASE_PROBLEM_URL}/submissions?access_token=${process.env.PROBLEMS_API}`;
    try {
      const submission = await axios.post(submissionUrl, {
        problemId: req.body.problemId,
        source: req.body.source,
        compilerId: req.body.compilerId
      });
      console.log(submission.data);
      return res.json({
        message: 'Submitted, waiting for checks',
        id: submission.data.id
      });
    } catch (e: any) {
      return res.json({
        error: e.message
      })
    }
  }
);

export default router;
