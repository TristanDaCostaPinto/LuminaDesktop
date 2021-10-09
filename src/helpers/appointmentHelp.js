export function AppointmentType(appointmentType) {
    let result = '';
    switch (appointmentType) {
        case 1:
            result = 'Visite';
            break;
        case 2:
            result = 'Renseignement';
            break;
        case 3:
            result = 'Estimation';
            break;
        case 4:
            result = 'Location';
            break;
        case 5:
            result = 'Achat';
            break;
        case 6:
            result = 'Vente';
            break;
        default:
            break;
    }
    return result;
}