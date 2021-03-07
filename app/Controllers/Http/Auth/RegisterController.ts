import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class RegisterController {
  public async store ({ request }: HttpContextContract) {
    // Create the validation schema
    const userSchema = schema.create({
      firstname: schema.string(),
      email: schema.string({}, [
        rules.email(),
      ]),
      password: schema.string({}, [
        rules.minLength(6),
      ]),
      tos: schema.boolean(),
    })

    // Validate the form request data
    const data = await request.validate({
      schema: userSchema,
      cacheKey: request.url(),
    })

    // Uses the validated form data to create the user
    return data
  }
}
