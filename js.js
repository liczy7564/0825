$(document).ready(function(){
	//button文字預設
	let i=0;
	let start=document.querySelector(".start");
	start.innerHTML += "開獎";
	let give_number=document.querySelector(".give_number");
	give_number.innerHTML += "開始選號";
	let times=0;

	//開獎球1~48
	let lottery_number_all = [];
	for (i=1 ; i < 49; i++){
		lottery_number_all.push(i);
	}
	let number_all = [];
	for (i=1 ; i < 49; i++){
		number_all.push(i);
	}

	let lottery_record = [];//開獎紀錄
	let forecast_record = [];//預期紀錄
	let predict_number = [];//預期數字
	let now = [];         //開獎數字
	let give_times = 0;     //確定是否有重新選號

	//選號鈕give_number-----------------------------------
	$(".give_number").on("click",function(){
		predict_number = [];
		give_times = 2;
			for (i = 0 ; i < 6; i++){
				let predict_n=Math.floor(Math.random()*number_all.length);
				predict_number.push(number_all[predict_n]); 
				number_all.splice(predict_n, 1);
				document.getElementById('choose_'+i).textContent = predict_number[i];
			}
			for (i = 0 ; i < 6; i++){
				number_all.push(predict_number[i]);
			}
		give_number.innerHTML = "換一組";
	});
	//開獎鈕start-----------------------------------
	$(".start").on("click",function(){
		// let a=[];//開獎集有 預測紀錄沒有 預測集沒有
		// for (i=0 ; i < 48; i++){
		// 	if (lottery_number_all.indexOf(i)!=-1&&forecast_record.indexOf(i)==-1&&number_all.indexOf(i)==-1){
		// 	a.push(i);
		// 	number_all.push(i);
		// 	}
		// }
		//必須先選號
		if( give_times<2 ){
			alert('請選號');
		}else{
		times++;
		give_times=1;
		now = [];
		//開獎
		for ( i=0 ; i < 6; i++){
			let lottery_n=Math.floor(Math.random()*lottery_number_all.length);
			now.push(lottery_number_all[lottery_n]); 
			lottery_number_all.splice(lottery_n,1);
			document.getElementById('newBall'+i).textContent = now[i];
			lottery_record.push(now[i]);
		}
		// 前三期不重複
		if(lottery_number_all.length<30){//
			for (i=0 ; i < 6; i++){
				lottery_number_all.push(lottery_record[0]);
				lottery_record.shift();
			}
		}		
		for (i=0 ; i < 6; i++){
			forecast_record.push(predict_number[i]);
			number_all.pop();
		}
		if(times>3){
			for (i=0 ; i < 6; i++){
				number_all.push(forecast_record[0]);
				forecast_record.shift();
			}
		}			
		start.innerHTML = "下一期";
		//本期開獎的數字不要選
		// for (i=0 ; i < 6; i++){
		// 	if(number_all.indexOf(now[i])!=-1){
		// 		number_all.splice(number_all.indexOf(now[i]),1);
		// 		console.log(number_all.indexOf(now[i]));
		// 	};
		// }
		//結果
		let n=0;
		let number=[];
		for (i=0 ; i < 6; i++){
			if (predict_number.indexOf(now[i])!= -1){
				n=n+1;
				number.push(now[i]);
			}
		}
		let record;
		let result=document.querySelector(".result");
		if (n<1){
			result.innerHTML = "沒中";
			record='沒中';
		}else if (n==3){
			result.innerHTML = "三獎";
			record='三獎';
		}else if (n==5){
			result.innerHTML = "五獎";
			record='五獎';
		}else if (n==6){
			result.innerHTML = "全中";
			record='全中';
		}else{
			result.innerHTML = "有中"+number;
			record='有中'+number;
		}		
		//紀錄
		let note=document.querySelector(".note");
		note.innerHTML += "<div clsss='note_content overflow-ellipsis'>-----第期 "+times+" 號碼："+record+"----<br>開獎："+now+"<br>預測："+predict_number+"</div>";
	}
	$(".note").scrollTop($(".note")[0].scrollHeight);
	// console.log($(".note")[0].scrollHeight);
	// console.log("a:"+a);
	// console.log('開獎紀錄集'+lottery_record.length+'/'+lottery_record);
	// console.log('開獎集'+lottery_number_all.length+'/'+lottery_number_all);
	// console.log('預測紀錄集'+forecast_record.length+'/'+forecast_record);
	// console.log('預測集'+number_all.length+'/'+number_all);
	});
});







