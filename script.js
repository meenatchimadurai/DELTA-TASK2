var canvas;
     var ctx;
     var x = 350;
     var x1 = 200;var x2=200;var y1=560;var y2=560;
     var bx;
     var by;
     var rat = 40;
     var count = 0;
     var count2 = 0;
     var dx = 2;
     var ddy = 0.03;
     var ox = 500;
     var oy = 100;
     var dy = 0.1;
     var dx1 = 2;
     var ddy1 = 0.02;
     var ox1 = 0;
     var oy1 = 75;
     var dy1 = 0.1;
     var value = 10;
     var value1 = 8;
     var score = 0;
     var pause = true;
     var leaderBoard =[];
    
     var bullet = new Image();
     bullet.src = 'bullet.jpg';
     var stone = new Image();
     stone.src = 'obstacle.jpg';
     var artillery = new Image();
     artillery.src = 'artillery.jpg';
     
     var s = false;
     var game;
     function handleMouseClick(evt){
    if(s){
        count = 0;
      count2 = 0;
      dx = 2;
      ddy = 0.03;
      ox = 500;
      oy = 100;
      dy = 0.1;
      dx1 = 2;
      ddy1 = 0.02;
      ox1 = 0;
      oy1 = 75;
      dy1 = 0.1;
      value = 10;
      value1 = 8;
    score = 0;    
         s = false; 
  }
  }
     window.onload = function(){
        
                    window.addEventListener('keydown',pressKeyArrows,true);
                    window.addEventListener('mousedown',handleMouseClick,true);
                    window.addEventListener('keydown',keyPress,true);
                    canvas = document.getElementById("myCanvas");
                    ctx = canvas.getContext("2d");
                  game =   setInterval(moveAll , 10);
                    
                    
                }
                function keyPress(e){
    if (e.keyCode == 32){
      pauseGame();
    }
    }
    function pauseGame(){
        if(pause){
          game = clearInterval(game);
          ctx.fillStyle = 'white';
          ctx.font = "50 px Arial";
          ctx.fillText("Waiting :|",200,200);
          pause = false;
        }
        else if(!pause){
          game = setInterval(moveAll,10);
          pause = true;
        }
    }
                function pressKeyArrows(event){
                   switch(event.keyCode)
                       {
                          case 39:
                          if(x<460){
                          x+=25;
                          }
                          break;
                          case 37:
                          if(x>0){
                                
                          x-=25;
                          
                          }
                          break;
                          
                       }
                }
                function moveAll(){
                    if(s){
                        ctx.fillStyle='white';
    ctx.font= '20px Arial';
     
    ctx.fillText("We are done:(",100,100);
    ctx.fillText("Click to Start again :)",70,130);
    ctx.fillStyle='pink';
    ctx.font= '20px verdona';
    
    ctx.fillText("Your Score" + score , 20 ,200);
    ctx.fillStyle='Red';
    ctx.font= '20px verdona';
    ctx.fillText("Leader Board", 20,220);
    for(i=0;i<leaderBoard.length;i++){
          ctx.fillStyle='yellow';
          ctx.font ='20px verdona';
          ctx.fillText((i+1) +")" + " "+ leaderBoard[i] , 35 , 260+ 30*i);
        
          
      }
                            return;
                    }
                    console.log(rat); 
                    drawAll();
                        moveBullets(x1,y1);
                    moveBullets(x2,y2); 
                    right();
                        left();
                        
                    count+=1;
                    
                    if(count-rat==0){
                        x1 = x;
                        y1 = 360;
                    }
                    if(count-(2*rat)==0){
                        x2 = x;
                        y2 = 360;
                        count = 0;
                    }
                    if((((ox>x)&&(ox<(x+50))) && ((oy>530) && (oy<600))) ||  (((ox1>x)&&(ox1<(x+50))) && ((oy1>530) && (oy1<600)))) {
                           s = true;
                           leaderBoard.push(score);
                           leaderBoard.sort(function(a, b){return b - a});
                            
                    }
                   
                
                }

                function drawAll(){    
                    ctx.fillStyle = 'black';
                    ctx.fillRect(0,0,canvas.width,canvas.height);
                    ctx.fillStyle='orange';
                    ctx.fillRect(x,530,40,40);
                    ctx.drawImage(artillery,x,530,50,70);
                    
                    ctx.fillStyle = 'blue';
                    ctx.fillText("Score"+score,canvas.width-200,50); 
                    if((score>10)&&(score<20)){
                        rat = 34;
                    }
                    if((score>20)&&(score<40)){
                        rat = 26;
                    }
                    if((score>40)&&(score<80)){
                        rat = 20;
                    }
                    if(score > 80){
                        rat = 15;  
                    }
                    for(i=0;i<leaderBoard.length;i++){
                        localStorage.setItem((i+1), leaderBoard[i]);
                        console.log(localStorage.getItem((i+1)));
                      }
                }
                function moveBullets(bx,by){
                    
                    ctx.fillStyle = 'black';
                    ctx.beginPath();
                    ctx.arc(bx+20,by,8,Math.PI*2,false);
                    ctx.fill();
                    ctx.drawImage(bullet,bx-10,by-10,35,35);
                   
                    y1-=5;
                    y2-=5;
                }
                function right(){
                    
                    if(value<0){
                        score+=10;
                        resetright();
                    }
                    
                 if(( (x1>(ox-30))&&(x1<(ox+30))) && ((y1>(oy-30)) &&(y1<(oy+30)))){
                    
                    if(value>0){
                         value-=1;
                     score+=1;
                     y1 = -100;
                    }
                   else if(value=0){
                         oy = -100;
                         ox = -100;
                     }
                     
                 } 
                 
                 if( ((x2>(ox-30))&&(x2<(ox+30))) && ((y2>(oy-30)) &&(y2<(oy+30))) ) { 
                   
                        value-=1;
                     score+=1;
                     y2 = -100;  
                 } 
                    ctx.fillStyle = 'black';
                    ctx.beginPath();
                    ctx.arc(ox,oy,30,Math.PI*2,false);
                    ctx.fill();
                    ctx.drawImage(stone,ox-30,oy-30,60,60);
                    ctx.fillStyle='black';
                    ctx.font = '50 px veradona';
                    ctx.fillText(value,ox-15,oy+15);
                    ox-=dx;
                    oy+=dy;
                    dy+=ddy;
                    if(oy>600){
                        dy = -dy;
                    }
                    if(ox<0){
                        resetright();
                    }
                }
                function resetright(){
                    ox = canvas.width;
                        oy = Math.random()*150 + 150;
                        dx = Math.random()*1 + 2;
                        ddy = Math.random()*0.05 + 0.02;
                        ctx.fillStyle='black';
                        ctx.font = "30px Arial";
                        value = Math.floor(Math.random()*12) + 4;

                }
                function left(){  
                    if(value1 < 1){
                        score+=10;
                        resetleft();
                    }
                  
                    if(( (x1>(ox1-30))&&(x1<(ox1+30))) && ((y1>(oy1-30)) &&(y1<(oy1+30)))){
                        value1-=1;
                     score+=1;
                     y1 = -100;   
                 }
                 
                 if(( (x2>(ox1-30))&&(x2<(ox1+30))) && ((y2>(oy1-30)) &&(y2<(oy+30)))  ){ 
                   
                    value1-=1;
                     score+=1;
                     y2 = -100;
                     
                     
                     }
                     
              ctx.fillStyle = 'orange';
               ctx.beginPath();
               ctx.arc(ox1,oy1,30,Math.PI*2,false);
                ctx.fill();
                ctx.drawImage(stone,ox1-30,oy1-30,60,60);
                ctx.fillStyle='black';
                ctx.font = "30px Arial";
                ctx.fillText(value1 , ox1-10 ,oy1+10);
                  ox1+=dx1;
                   oy1+=dy1;
                   dy1+=ddy1;
                   if(oy1>600){
                   dy1 = -dy1;
                     }
                     if(ox1>canvas.width){
                       resetleft();
                     }
                
                         }
                         function resetleft(){
                           
                    
                 ox1 = 0;
                oy1 = Math.random()*100 + 150;
                    dx1 = Math.random()*1.5 + 1.5;
                      ddy1  = Math.random()*0.04 + 0.03;
                      value1 = Math.floor(Math.random()*8) + 2; 

                          
                         }

                    