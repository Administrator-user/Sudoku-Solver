function solve(){
    var bool = checkInput();
    if(bool){
        var grid = readTopic();
        if(!isValidGrid(grid)){
            alert("Error:Invalid grid");
        }else{
            if(search(grid)){
                showOutput();
            }else{
                alert("Error:No solution");
            }
        }
    }
}

function checkInput(){
    var arr = new Array();
    
    for(var i=0; i<81; i++){
        arr[i] = Number(document.getElementsByTagName("input")[i].value);
        if(isNaN(arr[i])){
            alert('Error:Input shuold be a number between 1~9');
            return false
        }
    }
    
    if(arr.every(function isZero(x){return x == 0})){
        alert('Error:Wrong input');
        return false
    }
    
    return true
}

function readTopic(){
    var arr = new Array();
    
    for(var i=0; i<81; i++){
        arr[i] = Number(document.getElementsByTagName("input")[i].value);
    }
    
    var grid = new Array();
    for(var i=0; i<9; i++){
        grid[i] = new Array();
        for(var j=0; j<9; j++){
            grid[i][j] = 0;
        }    
    }
    
    
    for(var i=0; i<81; i++){
        grid[Math.floor(i/9)][i%9] = arr[i];
    }
    
    return grid
}
function getCellList(grid){
    var freeCellList = new Array();
    index = 0
    
    for(var i=0; i<9; i++){
        for(var j=0; j<9; j++){
            if(grid[i][j] == 0){
                freeCellList[index] = new Array(i,j);
                index++;
            }
        }
    }
                
    return freeCellList
}

function isValid(i,j,grid){
    for(var column=0; column<9; column++){
        if((column != j) && (grid[i][column] == grid[i][j])){
            return false
        }
    }
         
    for(var row=0; row<9; row++){
        if((row != i) && (grid[row][j] == grid[i][j])){
            return false
        }
    }
 
    for(var row=Math.floor(i/3)*3; row < Math.floor(i/3)*3+3; row++){
        for(var col=Math.floor(j/3)*3; col < Math.floor(j/3)*3+3; col++){
            if((row != i) && (col != j) && (grid[row][col] == grid[i][j])){
                return false
            }
        }
    }
             
    return true
}

function isValidGrid(grid){
    for(var i=0; i<9; i++){
        for(var j=0; j<9; j++){
            if((grid[i][j] < 0) || (grid[i][j] > 9) || ((grid[i][j] != 0) && (! isValid(i,j,grid)))){
                return false
            }
        }
    }
    return true
}


function search(grid){
    var freeCellList = getCellList(grid);
    var numberOfFreeCells = freeCellList.length;
    if(numberOfFreeCells == 0){
        return true
    }
    
    var k = 0;
 
    while(true){
        var i = freeCellList[k][0];
        var j = freeCellList[k][1];
        if(grid[i][j] == 0){
            grid[i][j] = 1;
        }
 
        if(isValid(i,j,grid)){
            if(k+1 == numberOfFreeCells){
                return true
            }else{
                k++;
            }
        }else{
            if(grid[i][j] < 9){
                grid[i][j]++;
            }else{
                while(grid[i][j] == 9){
                    if(k == 0){
                        return false
                    }
                    grid[i][j] = 0;
                    k--;
                    i = freeCellList[k][0];
                    j = freeCellList[k][1];
 
                } 

                grid[i][j]++;
            }
        }
    }
 
    return true
}

function showOutput(){
    var grid = readTopic();
    var grid_original = readTopic();
    
    if(search(grid)){
        for(var i=0; i<81; i++){
            if(grid[Math.floor(i/9)][i%9] != grid_original[Math.floor(i/9)][i%9]){
                document.getElementsByTagName("input")[i].value = grid[Math.floor(i/9)][i%9];
                document.getElementsByTagName("input")[i].style.color = '#000000';
            }
        }
    }
    
}
