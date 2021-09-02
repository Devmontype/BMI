const StreamArray = require('stream-json/streamers/StreamArray');
const fs = require('fs');
const jsonStream = StreamArray.withParser();
const { Writable,Readable } = require('stream');
const custom_bmis = require('./custom_bmi_fn');
const process = require('process');
const path = require('path')

let process_file=process.argv[2];

if(fs.existsSync(`./${process_file}`)){
    if(path.extname(process_file)!='.json'){
        console.log('Please provide json file with proper data format')
        process.exit();
    }else{
        
    }
}else{
    console.log('File not exist');
    process.exit();
}

let resultarr = [];
let count_category_people = {
    'Underweight': 0,
    'NormalWeight': 0,
    'Overweight': 0,
    'Moderatelyobese': 0,
    'Severelyobese': 0,
    'Veryseverelyobese': 0
}

const fileStream = fs.createReadStream(`${process_file}`);

const processingStream = new Writable({
    async write({ key, value }, encoding, callback) {
        try{
			let obj1 = {
				...value
			}
			let bmi = await custom_bmis.calculate_bmi(obj1.HeightCm, obj1.WeightKg)
			let health_category = await custom_bmis.category_health_detect(Number(bmi), count_category_people);

			setTimeout(() => {
				obj1.BMI = bmi;
				obj1.BMI_Category = health_category.BMI_Category;
				obj1.Health_Risk = health_category.Health_Risk;
				resultarr.push(obj1);
				callback();
			}, 1000);
		}catch(error){
			console.log('Something wrong');
			 process.exit();
		}
    },

    objectMode: true
});

fileStream.pipe(jsonStream.input);
jsonStream.pipe(processingStream);


processingStream.on('finish', () => { 
    console.log("Specific Categorised People Count:-")
    console.log(count_category_people);
    let newFile=new Date().getTime()+".json";
    let  wstream = fs.createWriteStream(newFile);
    const readable = Readable.from(JSON.stringify(resultarr));
    readable.on('data',function(chunk){
        wstream.write(chunk);
    })
    readable.on('end',function(){
       
        console.log('Updated file saved successfully with name '+newFile);
    })

    
});
