class productDetailDto {
    constructor(id, name, image, note, price, created_at, menus) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.note = note;
        this.price = price;
        this.created_at = created_at;
        this.menus = menus;
    }
}

export default productDetailDto;