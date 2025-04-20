export default function sortProduct(sort) {
    let sortField = 'createdAt';
    let sortOrder = -1;

    switch (sort) {
        case 'price-low':
            sortField = 'sellPrice';
            sortOrder = 1;
            break;
        case 'price-high':
            sortField = 'sellPrice';
            sortOrder = -1;
            break;
        case 'new':
            sortField = 'createdAt';
            sortOrder = -1;
            break;
        case 'rating':
            sortField = 'rating';
            sortOrder = -1;
            break;
        default:
            sortField = 'createdAt';
            sortOrder = -1;
    }

    return { sortField, sortOrder };
}
