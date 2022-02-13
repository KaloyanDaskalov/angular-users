import { AstMemoryEfficientTransformer } from "@angular/compiler";

export const links:{name:string, path:string}[] = [
    {name: 'Users', path: '/'},
    {name: 'Create', path: '/create'},
    {name: 'Edit', path: '/edit'},
];

export const ageRange:number [] = new Array(53)
                    .fill(0)
                    .map((x, i) => x + (i + 18));

export const sexOptions:string [] = ['Male', 'Female', 'Other'];

