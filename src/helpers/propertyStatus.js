export default function PropertyStatus(nameStatus) {
    let result = '';
    switch (nameStatus) {
        case 1:
            result = 'A Louer';
            break;
        case 2:
            result = 'En Vente';
            break;
        case 3:
            result = 'Vendu';
            break;
        default:
            break;
    }
    return result;
}