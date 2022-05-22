/*
 * @Author: czx
 * @Date: 2022-05-22 14:35:56
 * @LastEditTime: 2022-05-22 14:57:57
 * @LastEditors: czx
 * @Description: 用于计时格式化的函数
 */
type duration=string|number
const durationFormat=(time:duration)=>{
  const format=(number:number)=>{
    const hours=Math.floor(number/3600);
    const minutes=Math.floor(number/60)-hours*60;
    const millisecond=number-minutes*60-hours*60*60
    const finalTime=
                    `${hours<10 ? `0${hours}` : hours}:${minutes<10 ? `0${minutes}`: minutes}:${millisecond<10 ? `0${millisecond}` : millisecond}`
    return finalTime;
  }
  if(typeof time==="string"){
    const number=+time;
    return format(number);
   
  }else{
    const number=time;
    return format(number);
  }
}

export default durationFormat

/**
 * Test
 */
// let start=0;
// setInterval(()=>{
//   start++;
//   console.log(durationFormat(start));
// },1000)