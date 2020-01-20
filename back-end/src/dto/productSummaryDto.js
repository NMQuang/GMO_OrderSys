class productSummaryDto {
    constructor(name, quantity, total, created_at) {
        this.name = name;
        this.quantity = quantity;
        this.total = total;
        this.created_at = created_at;
    }
}

export default productSummaryDto;