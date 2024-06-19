import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Task } from "../entity/task";
import { CreateTaskDto, UpdateTaskDto } from "../dto/TaskDto";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { CustomError } from "../middleware/CustomError";

export const createTask = async (req: Request, res: Response) => {
  const taskRepository = AppDataSource.getRepository(Task);

  const taskDto = plainToInstance(CreateTaskDto, req.body);
  const errors = await validate(taskDto);

  if (errors.length > 0) {
    const errorMessages = errors
      .map((error) => Object.values(error.constraints!))
      .flat()
      .join(". ");
    throw new CustomError(400, "VALIDATION_ERROR", errorMessages);
  }

  const task = taskRepository.create(req.body);
  try {
    await taskRepository.save(task);
    res.status(201).json(task);
  } catch (error: any) {
    throw new CustomError(500, "OPERATION_FAILED", error.message);
  }
};

export const getTasks = async (req: Request, res: Response) => {
  const taskRepository = AppDataSource.getRepository(Task);
  try {
    const tasks = await taskRepository.find();
    res.json(tasks);
  } catch (error: any) {
    throw new CustomError(500, "OPERATION_FAILED", error.message);
  }
};

// Get a task by ID
export const getTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const taskRepository = AppDataSource.getRepository(Task);
  const id = parseInt(req.params.id, 10);

  const task = await taskRepository.findOneBy({ id });
  if (!task) {
    throw new CustomError(404, "TASK_NOT_FOUND");
  } else {
    res.json(task);
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const taskRepository = AppDataSource.getRepository(Task);
  const id = parseInt(req.params.id, 10);

  const taskDto = plainToInstance(UpdateTaskDto, req.body);
  const errors = await validate(taskDto);

  if (errors.length > 0) {
    const errorMessages = errors
      .map((error) => Object.values(error.constraints!))
      .flat()
      .join(". ");
    throw new CustomError(400, "VALIDATION_ERROR", errorMessages);
  }

  try {
    const task = await taskRepository.findOneBy({ id });
    if (!task) {
      throw new CustomError(404, "TASK_NOT_FOUND");
    } else {
      taskRepository.merge(task, req.body);
      await taskRepository.save(task);
      res.json(task);
    }
  } catch (error: any) {
    throw new CustomError(500, "OPERATION_FAILED", error.message);
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const taskRepository = AppDataSource.getRepository(Task);
  const id = parseInt(req.params.id, 10);

  const task = await taskRepository.findOneBy({ id });
  if (!task) {
    throw new CustomError(404, "TASK_NOT_FOUND");
  } else {
    try {
      await taskRepository.remove(task);
      res.json({ message: "Task deleted successfully" });
    } catch (error: any) {
      throw new CustomError(500, "OPERATION_FAILED", error.message);
    }
  }
};
