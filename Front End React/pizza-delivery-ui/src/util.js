

    export const formatEuro = num =>
    {
        return '£' + num;
    }

    export const GetDollar = num =>
    {
        const dollar = num * 1.08510;
        return '$' + Number(dollar.toFixed(2)).toLocaleString() + ' ';
    }

    export const url = "https://safe-lake-22225.herokuapp.com/api";

    
