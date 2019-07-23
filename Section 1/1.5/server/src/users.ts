export class UserData {
    private static GLOBAL_USER_ID: number = 0;

    public userID: number;

    public constructor( public name: string, public color?: string ) {
        this.userID = UserData.GLOBAL_USER_ID++;
        this.color = color ? color : this.generateRandomColor();
    }

    private generateRandomColor(): string {
        return '#' + ( Math.floor( Math.random() * ( 0xFFFFFF - 0x666666 + 1 ) ) + 0x666666 ).toString( 16 );
    }

    /** The static user data for server communications. */
    public static readonly SERVER: UserData = new UserData( "SERVER", "yellow" );
}

export class UserManager {
    private static _users: { [name: string]: UserData } = {};

    public static getUserDataForId( id: number ): UserData {
        let users = Object.values( UserManager._users ).map( x => x ).filter( x => x.userID === id );
        return users[0] ? users[0] : undefined;
    }

    public static tryAuthenticateUser( request: any ): number {
        let username = request.username.toLowerCase();
        let record = UserManager._users[username];
        if ( record === undefined ) {

            // If not defined, create a new record.
            record = new UserData( username );
            UserManager._users[username] = record;
        }
        return record.userID;
    }
}