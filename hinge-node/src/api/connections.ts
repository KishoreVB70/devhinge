import { Response, Request } from "express";
import { User } from "../model/user.js";
import Connection, {
  ModifyConnectionStatus,
  NewConnectionStatus,
} from "../model/connection.js";
import { errorResponse, successResponse } from "../utils/utils.js";

// API handlers

export async function likeConnection(req: Request, res: Response) {
  try {
    const senderId = req.body.id;
    const targetId = req.body.targetId;

    // Create Connection
    const newConnection = await createNewConnection(senderId, targetId, "like");

    successResponse(res, "Profile Liked", newConnection);
  } catch (error) {
    console.error("Error Liking user: ", error);
    errorResponse(res, 400, "Error Liking user");
  }
}

export async function ignoreConnection(req: Request, res: Response) {
  try {
    const senderId = req.body.id;
    const targetId = req.body.targetId;

    // Create Connection
    const newConnection = await createNewConnection(
      senderId,
      targetId,
      "ignore"
    );

    successResponse(res, "Connection ignored", newConnection);
  } catch (error) {
    console.error("Error ignoring connection: ", error);
    errorResponse(res, 400, "Error ignoring connection");
  }
}

export async function acceptConnection(req: Request, res: Response) {
  try {
    const senderId = req.body.id;
    const targetId = req.body.targetId;

    const connection = await modifyConnection(senderId, targetId, "accepted");
    successResponse(res, "Connection accepted", connection);
  } catch (error) {
    console.error("Error accepting connection: ", error);
    if (error instanceof Error) {
      errorResponse(res, 400, error.message);
      return;
    }
    errorResponse(res, 400, "Error accepting connection");
  }
}

export async function rejectConnection(req: Request, res: Response) {
  try {
    const senderId = req.body.id;
    const targetId = req.body.targetId;

    const connection = await modifyConnection(senderId, targetId, "rejected");
    successResponse(res, "Connection rejected", connection);
  } catch (error) {
    console.error("Error rejecting connection: ", error);
    if (error instanceof Error) {
      errorResponse(res, 400, error.message);
      return;
    }
    errorResponse(res, 400, "Error rejecting connection");
  }
}

// Helper functions
async function userExists(userId: string | null) {
  const user = await User.findById(userId);
  if (!user) throw new Error("user not found");
}
async function newConnectionValidation(
  senderId: string,
  targetId: string | null
) {
  // 1) Make sure targetId is an actual user id
  await userExists(targetId);

  // 2) Check if Connection already Exists
  const connection = await Connection.findOne({ senderId, targetId });

  if (connection) {
    throw new Error("Connection already exists");
  }
}
async function createNewConnection(
  senderId: string,
  targetId: string,
  status: NewConnectionStatus
) {
  await newConnectionValidation(senderId, targetId);
  return await new Connection({
    senderId,
    targetId,
    status,
  }).save();
}
async function modifyConnectionValidation(
  senderId: string,
  targetId: string | null
) {
  // 1) Make sure targetId is an actual user id
  await userExists(targetId);

  // 2) Check whether Connection exists in "like" status
  const connection = await Connection.findOne({
    senderId,
    targetId,
    status: "like",
  });

  if (!connection) {
    throw new Error("Connection not found");
  }
}
async function modifyConnection(
  senderId: string,
  targetId: string,
  status: ModifyConnectionStatus
) {
  await modifyConnectionValidation(senderId, targetId);
  const filter = { senderId, targetId };
  const connection = await Connection.findOneAndUpdate(filter, { status });
  return connection;
}
