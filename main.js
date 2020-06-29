const svg = document.querySelector('svg');
const svgShapeSelector = document.querySelector('#svgSelector');
svgShapeSelector.addEventListener('change', changeSvg)
const svgNS = "http://www.w3.org/2000/svg";
var _selectIndex = 0;








function changeSvg() {
  let svgShape = svgShapeSelector.value
  if (svgShape == 'false1') {
    svg.Eve
    svg.removeEventListener('click', svgClick);
    svg.style.cursor = "auto";
  } else {
    svg.style.cursor = "crosshair";
    let forms = document.querySelectorAll("div[class^=form]")
    forms.forEach(el=>{
      el.classList.remove('d-block');
    })
    let form = document.querySelector(`.form-${svgShape}`);
  
    form.classList.add('d-block')
    svg.addEventListener('click', svgClick);


  }

}


class Rectangle {
  element;
  x;
  y;
  height;
  width;
  fill;
  id;
  constructor() {
    this.id = _selectIndex;
    _selectIndex++;
    this.element = document.createElementNS(svgNS, "rect");
    this.element.style.cursor = "grab";
    this.height = document.querySelector('#rectHeight').value;
    this.width = document.querySelector('#rectWidth').value;
    this.fill = $("hex").innerHTML;
    this.element.id = 'rect' + this.id
    this.element.addEventListener('mousedown', this.mouseDown);
    this.element.addEventListener('mouseup', this.mouseUp);
    this.element.addEventListener('mouseout', this.mouseUp);
    this.element.addEventListener('click', function (e) {
      e.stopPropagation();
    });

  }



  click() {
    // console.log(this.dataset.event.clientX);
    this.element.setAttribute("x", this.x);
    this.element.setAttribute("y", this.y);
    this.element.setAttribute("height", this.height);
    this.element.setAttribute("width", this.width);

 
    this.element.setAttribute("fill", this.fill);
    this.element.setAttribute("stroke", "black");
    // let circle = document.createElementNS(svgNS, "circle")
    // circle.setAttribute("cx", this.x);
    // circle.setAttribute("cy", this.y);
    // circle.setAttribute("r", 2);

    // // TODO: better job at coloring white for dark black for light;
    // circle.setAttribute("fill", 'white');

    svg.appendChild(this.element);
    // svg.appendChild(circle);
    this.element = document.querySelector('#rect' + this.id)
  }
  mouseDown = (event) => {
    event.stopPropagation();
    this.element.addEventListener('mousemove', this.mouseMove);
  }
  mouseMove = (event) => {
    let bounds = svg.getBoundingClientRect();
    let x = event.clientX - bounds.left;
    let y = event.clientY - bounds.top;


    console.log(x - this.x);
    console.log(y - this.y);
    this.element.r
  }

  mouseUp = (event) => {
    event.stopPropagation();
    this.element.removeEventListener('mousemove', this.mouseMove);
  }

}





class Circle {
  element;
  cx;
  cy;
  r;
  fill;
  id;
  constructor() {
   
    this.id = _selectIndex;
    _selectIndex++;
    this.element = document.createElementNS(svgNS, "circle");
    this.element.style.cursor = "grab";
    this.r = document.querySelector('#circleRadius').value;
    this.fill = $("hex").innerHTML;
    this.element.id = 'circle' + this.id
    this.element.addEventListener('mousedown', this.mouseDown);
    svg.addEventListener('mouseup', this.mouseUp);
    svg.addEventListener('mouseout', this.mouseUp);
    this.element.addEventListener('click', function (e) {
      e.stopPropagation();
    });

  }



  click() {

    this.element.setAttribute("cx", this.x);
    this.element.setAttribute("cy", this.y);

    this.element.setAttribute("r", this.r);
    this.element.setAttribute("fill", this.fill);
    this.element.setAttribute("stroke", "black");


    svg.appendChild(this.element);
    this.element = document.querySelector('#circle' + this.id)
  }
  mouseDown = (event) => {
    event.stopPropagation();
    svg.addEventListener('mousemove', this.mouseMove);
  }
  mouseMove = (event) => {
    var x = event.clientX - this.x; // absolute distance from center
    if (x < 0) x = x * -1;
    var y = event.clientY - this.y;
    if (y < 0) y = y * -1;
    var scaleX = x / this.x; // proportional distance from center
    var scaleY = y / this.y;
    this.element.setAttribute("cx", this.x / scaleX); // adjust the centers when adjusting scale so that it stays in one place.
    this.element.setAttribute("cy", this.y / scaleY);
    this.element.setAttribute("style", "transform: scale(" + scaleX + ", " + scaleY + ")"); // scale the ellipse
  }

  mouseUp = (event) => {
    event.stopPropagation();
    svg.removeEventListener('mousemove', this.mouseMove);
  }
}


const classes = {
  Circle,
  Rectangle
}


function svgClick(e) {
  let svgShape = svgShapeSelector.value
  let shape = new classes[svgShape]();
  let bounds = svg.getBoundingClientRect();

  shape.x = e.clientX - bounds.left;
  shape.y = e.clientY - bounds.top;
  shape.click()
}




async function exportSvg(){
  svg.style.removeProperty('cursor')
  let formData = new FormData();
formData.append('svg', svg.outerHTML)
  try{

    let res = await fetch('./export.php',{
      method: 'POST',
      body: formData
    })
    if(res){
      res = await res.text();
      alert('file exported')
      $('link').href = res;
      $('link').click();
    }
  }catch(error){
    alert(error);
  }
  
}

// ----------------- color picker ------------------------


function $(el) {
  return document.getElementById(el);
}
var inp1 = $("inp1");
var inp2 = $("inp2");
var inp3 = $("inp3");
var txt = $("txt");
var view = $("view");
var copy = $("copy");
var root = document.documentElement;
var h, s, l;
h = [];
s = [];
l = [];

function update() {
  h = [];
  s = [];
  l = [];
  for (var i = 0; i < 360; i++) {
    h.push("hsl(" + (i + 1) + ", " + 100 + "%, " + 50 + "%)");
  }
  for (var i = 0; i < 100; i++) {
    s.push("hsl(" + inp1.value + ", " + i + "%, 50%)");
    l.push("hsl(" + inp1.value + ", 100%, " + i + "%)");
  }
  inp1.style.background = "linear-gradient(to right, " + h.join(", ") + ")";
  inp2.style.background = "linear-gradient(to right, " + s.join(", ") + ")";
  inp3.style.background = "linear-gradient(to right, " + l.join(", ") + ")";
  txt.value =
    "hsl(" + inp1.value + ", " + inp2.value + "%, " + inp3.value + "%)";
  view.style.backgroundColor =
    "hsl(" + inp1.value + ", " + inp2.value + "%, " + inp3.value + "%)";
  root.style.setProperty("--color1", "hsl(" + inp1.value + ", 100%, 50%)");
  root.style.setProperty(
    "--color2",
    "hsl(" + inp1.value + ", " + inp2.value + "%, 50%)"
  );
  root.style.setProperty(
    "--color3",
    "hsl(" + inp1.value + ", 100%, " + inp3.value + "%)"
  );
  $("rgb").innerHTML = window.getComputedStyle(view).backgroundColor;
  var str = window.getComputedStyle(view).backgroundColor;
  str = str.replace("rgb", "");
  str = str.replace("(", "");
  str = str.replace(")", "");
  str = str.split(",");
  var hex = [0, 0, 0];
  hex[0] = parseFloat(str[0]).toString(16);
  hex[1] = parseFloat(str[1]).toString(16);
  hex[2] = parseFloat(str[2]).toString(16);

  if (hex[0].length < 2) {
    hex[0] = '0' + hex[0];
  }
  if (hex[1].length < 2) {
    hex[1] = '0' + hex[1];
  }
  if (hex[2].length < 2) {
    hex[2] = '0' + hex[2];
  }

  hex = "#" + hex.join("");
  $("hex").innerHTML = hex;
}
update();
inp1.oninput = update;
inp2.oninput = update;
inp3.oninput = update;
txt.oninput = convert;

copy.onclick = function () {
  txt.select();
  txt.setSelectionRange(0, 99999);
  document.execCommand("copy");
};

function convert() {
  var str = this.value;
  str = str.replace("hsl", "");
  str = str.replace("(", "");
  str = str.replace(")", "");
  str = str.replace("%", "");
  str = str.replace("%", "");
  str = str.split(",");
  inp1.value = parseFloat(str[0]);
  inp2.value = parseFloat(str[1]);
  inp3.value = parseFloat(str[2]);
  update();
  console.log(inp2.value < parseFloat(str[1]));
}