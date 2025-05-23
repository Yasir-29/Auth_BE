import { hash, compare } from 'bcryptjs';

const doHash = async (value, saltvalue) => {
    const result = await hash(value, saltvalue);
    return result;
};

const doHashValidation = async (value, hashedvalue) => {
    const result = await compare(value, hashedvalue);
    return result;
};

export { doHash, doHashValidation };