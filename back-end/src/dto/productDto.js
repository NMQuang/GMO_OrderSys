class productDto {
    constructor(id, name, image, note, price, created_at, count, countAll) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.note = note;
        this.price = price;
        this.created_at = created_at;
        this.count = count;
        this.countAll = countAll;
    }
}

export default productDto;