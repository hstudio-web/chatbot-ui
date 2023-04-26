import Instance from "@/pages/api/base";
import {UserinfoResponse} from "@/types/user";

export const config = {
    runtime: 'edge',
};

const getUserInfo = async (): Promise<UserinfoResponse> => {
    return Instance.get('/api/user',);
};

export default getUserInfo;
