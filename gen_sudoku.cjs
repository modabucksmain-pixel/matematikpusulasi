const fs=require('fs');

function solve(b){for(let r=0;r<9;r++)for(let c=0;c<9;c++){if(b[r][c]===0){for(let n=1;n<=9;n++){if(ok(b,r,c,n)){b[r][c]=n;if(solve(b))return true;b[r][c]=0;}}return false;}}return true;}
function ok(b,r,c,n){for(let i=0;i<9;i++){if(b[r][i]===n||b[i][c]===n)return false;}let br=3*Math.floor(r/3),bc=3*Math.floor(c/3);for(let i=br;i<br+3;i++)for(let j=bc;j<bc+3;j++)if(b[i][j]===n)return false;return true;}
function verify(b){for(let r=0;r<9;r++){let s=new Set(b[r]);if(s.size!==9||s.has(0))return false;}for(let c=0;c<9;c++){let s=new Set();for(let r=0;r<9;r++)s.add(b[r][c]);if(s.size!==9)return false;}return true;}

function genFull(){
  let b=Array.from({length:9},()=>Array(9).fill(0));
  // seed first row randomly
  let nums=[1,2,3,4,5,6,7,8,9];
  for(let i=nums.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[nums[i],nums[j]]=[nums[j],nums[i]];}
  b[0]=nums;
  solve(b);
  return b;
}

function makePuzzle(full, numRemove){
  let puzzle=full.map(r=>[...r]);
  let positions=[];
  for(let r=0;r<9;r++) for(let c=0;c<9;c++) positions.push([r,c]);
  // shuffle
  for(let i=positions.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[positions[i],positions[j]]=[positions[j],positions[i]];}
  let removed=0;
  for(let [r,c] of positions){
    if(removed>=numRemove) break;
    puzzle[r][c]=0;
    removed++;
  }
  return puzzle;
}

// Easy: ~35 blanks, Mid: ~45, Hard: ~50, Expert: ~55
const results = [];
const configs = [
  {name:'Kolay',    blanks:35, seed:42},
  {name:'Orta',     blanks:45, seed:77},
  {name:'Zor',      blanks:50, seed:13},
  {name:'Uzman',    blanks:55, seed:99}
];

for(let cfg of configs){
  // Use deterministic-ish approach
  let full, puzzle;
  let attempts=0;
  do {
    full=genFull();
    puzzle=makePuzzle(full, cfg.blanks);
    attempts++;
  } while(!verify(full) && attempts<10);
  
  console.log(cfg.name+' valid:'+verify(full)+' blanks:'+puzzle.flat().filter(v=>v===0).length);
  console.log('Puzzle: '+JSON.stringify(puzzle));
  console.log('Solution:');
  full.forEach(r=>console.log(r.join(' ')));
  results.push({name:cfg.name, puzzle, solution:full});
}

fs.writeFileSync('all_sudoku.json',JSON.stringify(results,null,2));
console.log('Done → all_sudoku.json');
