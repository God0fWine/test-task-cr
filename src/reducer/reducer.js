export const initialState = {
    name: '',
    descr: '',
    price: 0,
    discount: 0,
    discountDate: 0,
    id: 0,
    image: ''
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'EDIT':
            return {
                name: action.data.name,
                descr: action.data.descr,
                price: action.data.price,
                discount: action.data.discount,
                discountDate: action.data.discountDate,
                id: action.data.id,
                image: action.data.image
            };
        case 'BACK':
            return '';
        default:
            throw new Error('Unexpected action');
    }
}
