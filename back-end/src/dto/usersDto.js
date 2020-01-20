class usersDto {
    constructor(id, code, name, role, accesstoken, avatar) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.role = role;
        this.token = accesstoken;
        this.avatar = avatar;
    }

};

export default usersDto;