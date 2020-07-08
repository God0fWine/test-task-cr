export const initialState = {
    name: '',
    description: '',
    price: 0,
    discount: 0,
    discountDate: 0
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'EDIT':
            return {
                name: action.data.name,
                description: action.data.desc,
                price: action.data.price,
                discount: action.data.discount,
                discountDate: action.data.discountDate
            };
        case 'BACK':
            return '';
        default:
            throw new Error('Unexpected action');
    }
}
