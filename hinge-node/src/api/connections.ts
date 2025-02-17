import { Response, Request } from "express";
import Connection, {
  ModifyConnectionStatus,
  NewConnectionStatus,
} from "../model/connection.js";
import { errorResponse, successResponse, userExists } from "../utils/utils.js";

// API handlers
export async function likeConnection(req: Request, res: Response) {
  try {
    const senderId = req.body.id;
    const targetId = req.params.targedId;

    // Create Connection
    const newConnection = await createNewConnection(
      senderId,
      targetId,
      "interested"
    );

    successResponse(res, "Profile Liked", newConnection);
  } catch (error) {
    console.error("Error Liking user: ", error);
    if (error instanceof Error) {
      errorResponse(res, 400, error.message);
      return;
    }
    errorResponse(res, 400, "Error Liking user");
  }
}

export async function ignoreConnection(req: Request, res: Response) {
  try {
    const senderId = req.body.id;
    const targetId = req.params.targedId;

    // Create Connection
    const newConnection = await createNewConnection(
      senderId,
      targetId,
      "ignore"
    );

    successResponse(res, "Connection ignored", newConnection);
  } catch (error) {
    console.error("Error ignoring connection: ", error);
    if (error instanceof Error) {
      errorResponse(res, 400, error.message);
      return;
    }
    errorResponse(res, 400, "Error ignoring connection");
  }
}

export async function acceptConnection(req: Request, res: Response) {
  try {
    const senderId = req.body.id;
    const targetId = req.params.targetId;

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
    const targetId = req.params.targetId;

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
async function newConnectionValidation(senderId: string, targetId: string) {
  // 1) Make sure targetId is an actual user id
  await userExists(targetId);

  // 2) Check if Connection already Exists
  const connection = await Connection.findOne({
    $or: [
      { senderId, targetId },
      { senderId: targetId, targetId: senderId },
    ],
  });

  if (connection) {
    throw new Error("Connection already exists");
  }

  // 3) Check if user doesn't connect to themselves
  if (senderId === targetId) {
    throw new Error("User cannot connect to themselves");
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
async function modifyConnectionValidation(senderId: string, targetId: string) {
  // 1) Make sure the initial sender is an actual user id
  await userExists(senderId);

  // 2) Check whether Connection exists in "interested" status
  // Here, sender is the initial "interested" sender
  const connection = await Connection.findOne({
    senderId,
    targetId,
    status: "interested",
  });

  if (!connection) {
    throw new Error("Connection not found");
  }
}
async function modifyConnection(
  senderID: string,
  targetID: string,
  status: ModifyConnectionStatus
) {
  // NOTE:  Inverse senderId and targetId for the initial "interested" sender
  const senderId = targetID;
  const targetId = senderID;

  await modifyConnectionValidation(senderId, targetId);
  const filter = { senderId, targetId };
  const connection = await Connection.findOneAndUpdate(filter, { status });
  return connection;
}
