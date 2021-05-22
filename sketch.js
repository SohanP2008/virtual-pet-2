//Create variables here
var dogLay, dogStand, database, foodS, foodStock;
var dogLayImg, dogStandImg;
var milkBottle, milkBottleImg;

function preload()
{
	//load images here
  dogLayImg = loadImage("dogImg1.png");
  dogStandImg = loadImage("dogImg.png");
  milkBottleImg = loadImage("Milk.png");
}

function setup() {
	createCanvas(1000, 500);
  dogLay = createSprite(750,300,20,20)
  dogLay.addImage(dogLayImg)
  dogLay.scale = 0.3
  database = firebase.database();
  foodStock = database.ref("Food")
  foodStock.on("value",readStock)

  feed = createButton("Feed the Dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add More Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

  milkBottle = createSprite(250, 300, 20, 20);
  milkBottle.addImage(milkBottleImg);
  milkBottle.scale = 0.1;
}


function draw() { 
  background(46,139,87) 
  text(mouseX+","+mouseY,mouseX,mouseY)
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dogLay.addImage(dogStandImg)
  }
  drawSprites();
  //add styles here
  textSize(20)
  fill("black")
  text("Food: " + foodS,150,90)
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  database.ref("/").update({
    Food:x
  })
}

function feedDog(){
  dogLay.addImage(dogStandImg);
  foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}