interface _HospitalAndUser {
    _id: string;
    nombre: string;
    img: string;
}

export class Medico {
    constructor(
        public _id: string,
        public nombre: string,
        public img?: string,
        public user?: _HospitalAndUser,
        public hospital?: _HospitalAndUser
    ) {}

}