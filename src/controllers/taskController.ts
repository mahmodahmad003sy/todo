import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Task } from "../entity/task";
import { CreateTaskDto } from "../dto/CreateTaskDto";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";

// Create a new task
export const createTask = async (req: Request, res: Response) => {
  const taskRepository = AppDataSource.getRepository(Task);

  const taskDto = plainToInstance(CreateTaskDto, req.body);
  const errors = await validate(taskDto);

  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  const task = taskRepository.create(req.body);
  try {
    await taskRepository.save(task);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
};

// Get all tasks
export const getTasks = async (req: Request, res: Response) => {
  const taskRepository = AppDataSource.getRepository(Task);
  try {
    const tasks = await taskRepository.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

// Get a task by ID
export const getTaskById = async (req: Request, res: Response) => {
  const taskRepository = AppDataSource.getRepository(Task);
  const id = parseInt(req.params.id, 10);
  try {
    const task = await taskRepository.findOneBy({ id });
    if (!task) {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.json(task);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch task" });
  }
};

// Update a task by ID
export const updateTask = async (req: Request, res: Response) => {
  const taskRepository = AppDataSource.getRepository(Task);
  const id = parseInt(req.params.id, 10);
  try {
    const task = await taskRepository.findOneBy({ id });
    if (!task) {
      res.status(404).json({ error: "Task not found" });
    } else {
      taskRepository.merge(task, req.body);
      await taskRepository.save(task);
      res.json(task);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
};

// Delete a task by ID
export const deleteTask = async (req: Request, res: Response) => {
  const taskRepository = AppDataSource.getRepository(Task);
  const id = parseInt(req.params.id, 10);
  try {
    const task = await taskRepository.findOneBy({ id });
    if (!task) {
      res.status(404).json({ error: "Task not found" });
    } else {
      await taskRepository.remove(task);
      res.json({ message: "Task deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
};
