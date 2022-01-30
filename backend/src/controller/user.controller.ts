import { Request, Response } from "express";
import { omit } from "lodash";
import { AssignPointUserInput, CreateUserInput, DeleteUserInput, ReadUserInput, UpdateUserInput } from "../schema/user.schema";
import { assignPoints, createUser, deleteUser, findUser, findUsers, updateUser } from "../services/user.service";
import logger from "../utils/logger";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const newUser = {
      ...req.body,
      accumulatedPoints: 0,
      role: 'USER'
    }

    const user = await createUser(newUser);

    return res.status(201).json({
      ok: true,
      user,
    });

  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function createAdminHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const newUser = {
      ...req.body,
      accumulatedPoints: 0,
      role: 'ADMIN'
    }
    
    const user = await createUser(newUser);

    return res.status(201).json({
      ok: true,
      user,
    });

  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function findUsersHandler(req: Request, res: Response){
  try {
      const users = await findUsers();
      return res.status(200).json({
          ok: true,
          users
      });
  } catch (error: any) {
      logger.error(error);
      return res.status(409).json({
          ok: false,
          message: error.message 
      });        
  }
}

export async function findUserHandler(req: Request<ReadUserInput['params']>, res: Response){
  try {
      const userId = req.params.userId;

      const user = await findUser(userId);

      if(!user){
          return res.status(404).json({
              ok: false,
              message: 'User not found'
          });
      }

      return res.status(200).json({
          ok: true,
          user 
      });
  } catch (error: any) {
      logger.error(error);
      return res.status(409).json({
          ok: false,
          message: error.message 
      });        
  }
}

export async function updateUserHandler(
  req: Request<UpdateUserInput['params']>,
  res: Response
){
  try {
      const userId = req.params.userId;
      const user = await findUser(userId);
      
      if(!user){
          return res.status(404).json({
              ok: false,
              message: 'User not found'
          });
      }

      await updateUser(userId, req.body);

      return res.status(200).json({
          ok: true,
          message: 'User updated successfully'
      });

  } catch (error: any) {
      logger.error(error);
      return res.status(409).json({
          ok: false,
          message: error.message 
      }); 
  }
}

export async function deleteUserHandler(
  req: Request<DeleteUserInput['params']>,
  res: Response 
){
  try {
      const userId = req.params.userId;
      const user = await findUser(userId);

      if(!user){
          return res.status(404).json({
              ok: false,
              message: 'User not found'
          });
      }

     await deleteUser(user._id);

      return res.status(200).json({
          ok: true, 
          message: 'User deleted successfully',
          data: user
      });

  } catch (error: any) {
      logger.error(error);
      return res.status(409).json({
          ok: false,
          message: error.message 
      }); 
  }
}

export async function assignPointsUserHandler(
  req: Request<AssignPointUserInput['params']>,
  res: Response
){
  try {
      const userId = req.params.userId;
      const user = await findUser(userId);
      
      if(!user){
          return res.status(404).json({
              ok: false,
              message: 'User not found'
          });
      }
      const { quantityPoints } = req.body;

      let points = user.accumulatedPoints + quantityPoints; 

      const userUpdate = await assignPoints(user._id, points);

      return res.status(200).json({
          ok: true,
          message: 'Assigned Points successfully',
          user: userUpdate
      });

  } catch (error: any) {
      logger.error(error);
      return res.status(409).json({
          ok: false,
          message: error.message 
      }); 
  }
}