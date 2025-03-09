export default class ProblemDetail{
    type: string = ErrorTypes.General;
    title?: string = "Something went wrong";
    status?: number = 400;
    detail: string = "An error occurred during processing!";
}


export enum ErrorTypes{
    General = "General",
    Validation = "Validation",
    Business = "Business",
    DataAccess = "DataAccess",
    Authentication = "Authentication"
}