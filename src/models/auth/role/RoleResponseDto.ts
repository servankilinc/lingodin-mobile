export default class RoleResponseDto {
    id!: string;
    name!: string;

    public constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
}
    