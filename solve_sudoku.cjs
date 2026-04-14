const fs=require('fs');
const html=fs.readFileSync('public/pages/sayfa32.html','utf8');

function extractGrid(html, startCard){
  const cardIdx=html.indexOf(startCard);
  const gridStart=html.indexOf('sudoku-grid',cardIdx);
  const gridEnd=html.indexOf('</div>\r\n            </div>',gridStart);
  const chunk=html.substring(gridStart,gridEnd+200);
  const cells=[];
  const re = /sudoku-cell (given|empty)">(.*?)<\/div>/g;
  let m;
  while((m=re.exec(chunk))!==null){
    if(m[1]==='given' && m[2].trim()) cells.push(parseInt(m[2].trim()));
    else cells.push(0);
    if(cells.length>=81) break;
  }
  const grid=[];
  for(let i=0;i<81;i+=9) grid.push(cells.slice(i,i+9));
  return grid;
}

const g1=extractGrid(html,'Başlangıç');
const g2=extractGrid(html,'Zorlu Yol');
const g3=extractGrid(html,'Zihin Jimnastiği');
const g4=extractGrid(html,'Büyük Meydan Okuma');

function solve(b){for(let r=0;r<9;r++)for(let c=0;c<9;c++){if(b[r][c]===0){for(let n=1;n<=9;n++){if(ok(b,r,c,n)){b[r][c]=n;if(solve(b))return true;b[r][c]=0;}}return false;}}return true;}
function ok(b,r,c,n){for(let i=0;i<9;i++){if(b[r][i]===n||b[i][c]===n)return false;}let br=3*Math.floor(r/3),bc=3*Math.floor(c/3);for(let i=br;i<br+3;i++)for(let j=bc;j<bc+3;j++)if(b[i][j]===n)return false;return true;}

function verify(b){
  for(let r=0;r<9;r++){let s=new Set(b[r]);if(s.size!==9||s.has(0))return false;}
  for(let c=0;c<9;c++){let s=new Set();for(let r=0;r<9;r++)s.add(b[r][c]);if(s.size!==9)return false;}
  return true;
}

const results = {};
[['G1',g1],['G2',g2],['G3',g3],['G4',g4]].forEach(([name,g])=>{
  console.log(name+' puzzle:');
  g.forEach(r=>console.log(JSON.stringify(r)));
  const copy=g.map(r=>[...r]);
  const solved=solve(copy);
  console.log(name+' solvable: '+solved);
  if(solved){
    console.log(name+' solution:');
    copy.forEach(r=>console.log(r.join(' ')));
    console.log(name+' valid: '+verify(copy));
    results[name]={puzzle:g,solution:copy};
  }
});

fs.writeFileSync('sudoku_solutions.json',JSON.stringify(results,null,2));
console.log('Written to sudoku_solutions.json');
