function calculate_bmi(height, weight) {

    return new Promise((resolve, reject) => {
        let equation_str1 = (height / 100);
        let solve = (weight / (equation_str1 * equation_str1)).toFixed(2);

        if (solve) {
            resolve(solve);
        } else {
            resolve(0);
        }
    })

}

function category_health_detect(bmi,count_category_people) {
    let bmi_result_obj = {};
    return new Promise((resolve,reject)=>{
        switch (bmi != 0) {
            case (bmi<= 18.4): bmi_result_obj.BMI_Category = 'UnderWeight';
                bmi_result_obj.Health_Risk = 'Malnutrition risk';
                count_category_people['Underweight']+=1;
                break;            
            case (bmi >= 18.5 && bmi <= 24.9): bmi_result_obj.BMI_Category = 'Normal Weight';
                bmi_result_obj.Health_Risk = 'Low risk';
                count_category_people['NormalWeight']+=1;
                break;
            case (bmi <= 29.9 && bmi >= 25): bmi_result_obj.BMI_Category = 'OverWeight';
                bmi_result_obj.Health_Risk = 'Enhanced risk';
                count_category_people['Overweight']+=1;
                break;
            case (bmi <= 34.9 && bmi >= 30): bmi_result_obj.BMI_Category = 'Moderately obese';
                bmi_result_obj.Health_Risk = 'Medium risk';
                count_category_people['Moderatelyobese']+=1;
                break;
            case (bmi <= 39.9 && bmi >= 35): bmi_result_obj.BMI_Category = 'Severly obese';
                bmi_result_obj.Health_Risk = 'High risk';
                count_category_people['Severelyobese']+=1;
                break;
            case (bmi >= 40): bmi_result_obj.BMI_Category = 'Very Severly obese';
                bmi_result_obj.Health_Risk = 'Very High risk';
                count_category_people['Veryseverelyobese']+=1;
                break;
            default: bmi_result_obj.BMI_Category = ''; 
                bmi_result_obj.Health_Risk ='';
                break;             
        }
		if(bmi==0){
			bmi_result_obj.BMI_Category = ''; 
            bmi_result_obj.Health_Risk ='';
		}
        resolve(bmi_result_obj);
    })
    
    
}

module.exports = { calculate_bmi,category_health_detect }

