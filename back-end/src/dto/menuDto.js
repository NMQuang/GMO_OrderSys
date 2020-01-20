class menuDto {
    constructor(menu_id, created_at, valid_from, valid_to, users) {
        this.menu_id = menu_id;
        this.created_at = created_at;
        this.valid_from = valid_from;
        this.valid_to = valid_to;
        this.users = users;
    }
}

export default menuDto;