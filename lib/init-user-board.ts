import connectDB from "./db";
import { Board, Column } from "./models";

const DEFAULT_COLUMNS = [
  { name: "Applied", order: 0 },
  { name: "Interview", order: 1 },
  { name: "Offer", order: 2 },
  { name: "Rejected", order: 3 },
];

export async function initializeUserBoard(userId: string) {
  try {
    await connectDB();
    const existingBoard = await Board.findOne({ userId, name: "Job Hunt" });
    if (existingBoard) {
      return existingBoard;
    }
    const newBoard = await Board.create({
      name: "Job Hunt",
      userId,
      columns: [],
    });
    const columns = await Promise.all(
      DEFAULT_COLUMNS.map(async (column) => {
        return await Column.create({
          name: column.name,
          order: column.order,
          boardId: newBoard._id,
          jobApplications: [],
        });
      }),
    );
    newBoard.columns = columns.map((column) => column._id);
    await newBoard.save();
    return newBoard;
  } catch (error) {
    console.error("Error initializing user board:", error);
    throw error;
  }
}
