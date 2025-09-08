export function checkAcronym(value: string) {

    value = value.trim();

    const Acronym_Dictionary: { [key: string]: string } = {
        'O': 'Oral',
        'P': 'Physical',
        'T': 'Therapeutic',
        'R': 'Routine',
        'E': 'Enteral',
        'SPS': 'Specialized Nutrition Supplement',
        'SERVI': 'SERVICE',
        'ADPAY': 'PAY WARD'
    };

    return Acronym_Dictionary[value] ?? null;


}


export function checkEnteralCode(value: string) {

    value = value.trim();

    const Enteral_Dictionary: { [key: string]: string } = {
        '01': 'Continuous',
        '02': 'Intermittent',
        '03': 'Bolus'
    }

    return Enteral_Dictionary[value] ?? 'None';
}

export function checkSNSCode(value: string) {

    value = value.trim();

    const SNS_Dictionary: { [key: string]: string } = {
        '1': 'Oral Supplement',
        '2': 'Tube Feeding',
        '3': 'Both'
    }

    return SNS_Dictionary[value] ?? 'None';
}