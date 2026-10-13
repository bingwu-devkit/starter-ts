import { greet, greetNameSchema } from '@scope/core'

const name = greetNameSchema.parse('  Turborepo  ')
console.log(greet(name))

const result = greetNameSchema.safeParse('   ')
if (!result.success) {
  console.log('Invalid greeting name:', result.error.issues)
}
