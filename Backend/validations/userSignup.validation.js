//Backend validations
/*const { z } = require("zod");

const userSignupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  role: z.string().optional(),
  age: z.number().optional(),
  dateOfBirth: z.date().optional(),
});

module.exports = userSignupSchema;

/*const { z } = require("zod");
//
const userSignupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});
//
module.exports = userSignupSchema;
*/