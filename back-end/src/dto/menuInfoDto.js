class menuInfoDto {
    constructor(menu_id, created_at, valid_from, valid_to, product) {
        this.menu_id = menu_id;
        this.created_at = created_at;
        this.valid_from = valid_from;
        this.valid_to = valid_to;
        this.product = product;
    }
}

export default menuInfoDto;