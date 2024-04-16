const { z } = require("zod");
const USER_ROLES = require("../constants/roles");
//
const userSignupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(Object.values(USER_ROLES)),
});
//
module.exports = userSignupSchema;
