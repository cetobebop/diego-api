import bcrypt from "bcryptjs"

export async function comparePassword(password: string, hashedPassword: string, typeError: new (message?: string) => Error = Error) {
    const compared = await bcrypt.compare(password, hashedPassword)

    if(!compared) throw new typeError('invalid parameters')

    return true
}