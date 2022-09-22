/* MDN WEB DOCS 참고 */
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
//context로 라인 그리기 
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

//css는 눈에 보이는 사이즈, 여기서는 픽셀사이즈 
canvas.width = 900;
canvas.height = 550;

//내부 사용할 색상, 그라데이션, 패턴 지정
//바탕색의 default 값을 하얀색으로 설정
ctx.fillStyle = "white";

//시작점이 (x,y)이고 너비 및 높이가 지정된 채워진 사각형을 그림
ctx.fillRect(0, 0, canvas.width, canvas.height);   


ctx.strokeStyle = "#2c2c2c";        //모양 주위의 선에 사용할 색상 또는 스타일 설정
ctx.fillStyle = "#2c2c2c";
ctx.lineWidth = 2.5;                //선의 굵기 설정

let painting = false;
let filling = false;

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
//클릭 시 해당 색깔로 변경 
function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const rangeValue = event.target.value;
    ctx.lineWidth = rangeValue;
}   

//버튼 변환 기능 
function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill"
    } else {
        filling = true;
        mode.innerText = "Paint"
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}
//저장기능
function handleSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = image;
    link.download = "Painting🪧";
    link.click();
}
//이벤트 리스너 설정 
if(canvas){
    //마우스가 캔버스에 무브할때
    canvas.addEventListener("mousemove",onMouseMove);
    //마우스가 캔버스에서 클릭될때 ==> 시작
    canvas.addEventListener("mousedown",startPainting);
    //마우스가 캔버스에서 클릭을 끝낼때? ==> 멈춤
    canvas.addEventListener("mouseup",stopPainting);
    //마우스가 캔버스를 벗어날때 ==> 멈춤
    canvas.addEventListener("mouseleave", stopPainting);
    //캔버스에 fill 하는 click.
    canvas.addEventListener("click",handleCanvasClick);
}


//모든 컬러들을 호출
Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)
);

if(range){
    //range이벤트는 input에 반응함
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn) {
    saveBtn.addEventListener("click",handleSaveClick);
}