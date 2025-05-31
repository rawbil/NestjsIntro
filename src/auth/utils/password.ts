import * as bcrypt from 'bcrypt';

//hash password
export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
}

//compare passwords
export const comparePassword = async(password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
}