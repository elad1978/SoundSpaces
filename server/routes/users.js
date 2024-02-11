import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ USER */

router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/*UPDATE USER */

//patch is to update only part of the user object here it's the friends array
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
