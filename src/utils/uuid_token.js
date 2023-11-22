import { v4 as uuidv4 } from 'uuid';
export const getUUID = () => {
    //生成一个随机字符串，且每次执行不能发生变化，游客身份持久储存
    let uuid_token = localStorage.getItem('UUIDTOKEN');
    //没有uuid生成
    if (!uuid_token) {
        uuid_token = uuidv4();
        //本地储存一次
        localStorage.setItem('UUIDTOKEN', uuid_token);
    }
    return uuid_token;
}