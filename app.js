/* MDN WEB DOCS 참고 */
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 900;
canvas.height = 550;

ctx.strokeStyle = "#000000";        //모양 주위의 선에 사용할 색상 또는 스타일 설정
ctx.linewidth = 2.5;                //라인 굵기 설정

let painting = false;

function stopPainting(){
    painting = false;
}
function startPainting(){
    painting = true;
}
function onMouseMove(event){
    const x = event.offsetX;        //수평 거리
    const y = event.offsetY;        //수직 거리
    if(!painting){
        ctx.beginPath();            //하위 경로 목록을 비워 새 경로로 시작, 새로운 경로 생성
        ctx.moveTo(x,y);            //새 하위 경로의 시작점을 x,y좌표로 이동
    }else{
        ctx.lineTo(x,y);            //현재 하위 경로의 마지막 지점을 지정된 x,y좌표에 직선으로 연결
        ctx.stroke();               //현재 획 스타일로 현재 하위 경로 지정
    }
}
function onMouseDown(event){
    painting = true;
}
if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);

}