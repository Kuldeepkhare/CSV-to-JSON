const readline = require('readline')
const fs = require('fs')
let myWriteStream = fs.createWriteStream('../json/India.json')	//writestream for first json
let myWriteStream1 = fs.createWriteStream('../json/Seven.json')	//writestream for second json
let myWriteStream2 = fs.createWriteStream('../json/StateWise.json')//writestream for third json
const lineReader = readline.createInterface({
    input: fs.createReadStream('../csv/India2011.csv','utf-8')
});
let i,c1=0,c=0,count=0,lit_male1=0,lit_female1=0,illit_female1=0,illit_male1=0,tot_male1=0,tot_female1=0,lit_male2=0,lit_female2=0,illit_female2=0,illit_male2=0;
let lit_person=[],illit_person=[],index=[],values=[],values1=[],values2=[],values3=[];
let sevenstates=new Array(35).fill(0).map((i)=>((c1++)+1))
.filter((s)=>(s==12||s==13||s==14||s==15||s==16||s==17||s==18));//an array of seven states using filter;
let census=[],census1=[],census2=[];	//creating empty objects
lineReader.on('line', (line) => {			//reading data
    count++;
    if(count!=1)		//ignoring the first line, as it contains only heading
    {
    		line.split('\n')
    		let arr = line.split(',');		//creating an array of data, splitting on basis of comma
        if(arr[4]=="Total"&&arr[5]=="All ages")		//checking for the aggregate value in the columns
        {
            if(sevenstates.includes(parseInt(arr[1])))		//if state is among seven sisters
            {
                lit_male2+=parseInt(arr[13]);		//evaluating total literate males in seven states
                lit_female2+=parseInt(arr[14]);		//evaluating total literate females
                illit_male2+=parseInt(arr[10]);		//evaluating total illiterate males
                illit_female2+=parseInt(arr[11]);		//evaluating total illiterate females
            } 
            lit_male1+=parseInt(arr[13]);		//evaluating total literate males in india
            lit_female1+=parseInt(arr[14]);		//evaluating total literate females in india
            illit_male1+=parseInt(arr[10]);		//evaluating total illiterate males in india
            illit_female1+=parseInt(arr[11]);		//evaluating total illiterate females in india
						tot_male1+=parseInt(arr[7]);		//evaluating total males in india
						tot_female1+=parseInt(arr[8]);		//evaluating total females in india
            index.push(arr[3]);		//pushing each state in index array
						lit_person.push(arr[12]);		//pushing literate person in each state
						illit_person.push(arr[9]);		//pushing literate person in each state
        }
	}
});
lineReader.on('close', ()=>{
    values.push(
    	{"value" : lit_male1,"sex" : "Male"},
    	{"value" : lit_female1,"sex" : "Female"})
    values1.push(
    	{"value" : illit_male1,"sex" : "Male"},
    	{"value" : illit_female1,"sex" : "Female"})
    census.push(
    	{"category": "Literate","values" : values.map((i)=>i)},
    	{"category": "Illiterate","values" : values1.map((i)=>i)})
    values2.push(
    	{"value" : lit_male2,"sex" : "Male"},
    	{"value" : lit_female2,"sex" : "Female"})
    values3.push(
    	{"value" : illit_male2,"sex" : "Male"},
    	{"value" : illit_female2,"sex" : "Female"})
    census1.push(
    	{"category": "Literate","values" : values2.map((i)=>i)},
    	{"category": "Illiterate","values" : values3.map((i)=>i)})    
    index.map((i)=>{		//iterating for each state in index array using map
    							c++;
      						census2.push({		//pushing properties for each state's object(census2)
                 	"StateName" : i,
                 	"LiteratePersons" : parseInt(lit_person[c-1]),
                 	"IlliteratePersons" : parseInt(illit_person[c-1])
    											});
      		});
    myWriteStream.write(JSON.stringify(census,null,3));		//writing contents of census object into myWriteStream object(India json file is being written)
    myWriteStream1.write(JSON.stringify(census1,null,3));		//writing contents of census1 object into myWriteStream1 object(SevenSisters json file is being written)
    myWriteStream2.write(JSON.stringify(census2,null,3));		//writing contents of census2 object into myWriteStream2 object(statewise json file is being written)
});