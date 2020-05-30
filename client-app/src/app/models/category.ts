export interface ICategory {
    id: string;
    code: string;
    image: string;
    name: string;
    color: string;
    creationDate: Date;
}

export interface ICategoryForm {
    code: string;
    image: Blob | string;
    name: string;
    color: string;
}

export class ICategoryFormValues implements ICategoryForm {
    name = "";
    code = "";
    image = new Blob();
    color = "";
}