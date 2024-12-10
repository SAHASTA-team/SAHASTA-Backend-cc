module.exports = {
    categorizeBMI: (bmi) => {
        bmi = parseFloat(bmi);
        if (bmi < 18.5) return 'Kurang'; 
        if (bmi >= 18.5 && bmi < 24.9) return 'Normal';
        if (bmi >= 25) return 'Tinggi'; 
        return 'Tidak Diketahui';  
    },
};

