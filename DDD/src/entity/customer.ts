class Customer {
    _id: string;
    _name: string;
    _address: string;

    constructor(id: string, name: string, address: string){
        this._id = id;
        this._name = name;
        this._address = name;
    }

    get id(): string{
        return this._id;
    }
    get name(): string{
        return this._name;
    }
    get address(): string{
        return this._address;
    }

    set id(id: string){
        this._id = id;
    }

    // set name(name: string){
    //     this._name = name;
    // }
    changeName(name: string){
        const hasNameAndLastName = name.split(" ").length > 1
        if(!hasNameAndLastName) throw new Error("Name must have name and last name");
        this._name = name;
    }
    set address(address: string){
        this._address = address;
    }
}