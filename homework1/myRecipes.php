<?php
$products = [
    1 => ["name" => "Classic lasagna", "ingredients" => "Mussels in shells (and without) - 100g, tomato - 200g, onion - 160g, Lasagne sheets (8-10 pieces), garlic (2 cloves), Tomato paste
60g, cheese - 100g, olive oil -  1 tablse sp., butter - 50 g, milk - 600g, wheat flour - 65g,  allspice - to taste","description" => "Full description of Product 1", "img" => "img/lazanya.jpg"],
    2 => ["name" => "Product 2", "description" => "Full description of Product 2"],
    3 => ["name" => "Product 3", "description" => "Full description of Product 3"],
];

$product_id = isset($_GET['id']) ? (int)$_GET['id'] : 1;

$product = isset($products[$product_id]) ? $products[$product_id] : null;

if ($product):
?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="style.css">
        <title><?php echo $product['name']; ?></title>
    </head>
    <body>
        <div class="navbar">
            <div class="dropdown">
                <button class="dropbtn" onclick="location.href = 'index.html';">Home</button>
            </div>

            <div class="dropdown">
                <button class="dropbtn active" onclick="location.href = 'myRecipes.html';">My List</button>
                <div class="dropdown-content">
                    <a href="http://localhost/homework1/myRecipes.php?id=1">Link 1</a>
                    <a href="http://localhost/homework1/myRecipes.php?id=2">Link 2</a>
                    <a href="http://localhost/homework1/myRecipes.php?id=3">Link 3</a>
                </div>
            </div>
            <div class="dropdown" onclick="location.href = 'about.html';">
                <button class="dropbtn">About</button>
            </div>

        </div>
        <div class="product_full">
            <h1><?php echo $product['name']; ?></h1>
            <img src="<?php echo $product['img']; ?>" alt="<?php echo $product['img']; ?>">

            <h3>INGREDIENTS:</h3>
            <p><?php echo $product['ingredients']; ?></p>
            <br>
            <h3>STEP BY STEP PREPARATION:</h3>
            <p><?php echo $product['description']; ?></p>
        </div>
    </body>
    </html>
<?php
else:
    echo "Product not found.";
endif;
?>
