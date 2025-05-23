import {hash} from 'bcryptjs';


const doHash= (value,saltvalue)=>{
    const result =hash(value,saltvalue);
    return result;
}

export default doHash;