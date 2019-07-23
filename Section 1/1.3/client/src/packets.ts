namespace Chat {

    export enum RequestType {
        LOGIN = "login",
        CHAT_SEND = "chat_send"
    }

    export enum ResponseType {
        LOGIN_RESULT = "login_result",
        CHAT_RESULT = "chat_result"
    }

    export interface IResponsePacket {
        readonly responseType: string;
    }

    export class ChatResponse implements IResponsePacket {
        public readonly responseType: string;
    
        public constructor( public userData: UserData, public content: string ) {
            this.responseType = ResponseType.CHAT_RESULT;
        }
    }

    export class LoginResponse implements IResponsePacket {
        public readonly responseType: string;

        public constructor( public success: boolean ) {
            this.responseType = ResponseType.LOGIN_RESULT;
        }
    }
}