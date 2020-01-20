class menuDetailDto {
    constructor(menu_id, valid_form, valid_to, products) {
        this.menu_id = menu_id;
        this.valid_form = valid_form;
        this.valid_to = valid_to;
        this.products = products;
    }
}

export default menuDetailDto;