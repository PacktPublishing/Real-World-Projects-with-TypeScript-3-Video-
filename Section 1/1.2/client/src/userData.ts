namespace Chat {

    export class UserData {

        public constructor( public userId: number, public name: string, public color: string ) {
        }

        public static readonly SERVER: UserData = new UserData( -1, "SERVER", "yellow" );
    }
}