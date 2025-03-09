export default class AccessToken {
    token!: string;
    expiration?: Date;

    public constructor(token: string, expiration: Date) {
        this.token = token;
        this.expiration = expiration;
    }
}
