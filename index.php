<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once 'config/db.php';
include_once 'models/quote.php';

$database = new Database();
$db = $database->getConnection();

$quote = new Quote($db);

if (isset($_GET['random'])) {
    $stmt = $quote->getRandomQuote();
} elseif (isset($_GET['author'])) {
    $author = $_GET['author'];
    $stmt = $quote->getQuotesByAuthor($author);
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Invalid request"));
    exit;
}

$num = $stmt->rowCount();

if ($num > 0) {
    $quotes_arr = array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $quote_item = array(
            "id" => $id,
            "text" => html_entity_decode($text),
            "author" => $author
        );
        array_push($quotes_arr, $quote_item);
    }
    echo json_encode($quotes_arr);
} else {
    echo json_encode(array("message" => "No quotes found."));
}
?>
