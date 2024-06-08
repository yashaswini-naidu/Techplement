<?php
class Quote {
    private $conn;
    private $table_name = "quotes";

    public $id;
    public $text;
    public $author;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getRandomQuote() {
        $query = "SELECT * FROM " . $this->table_name . " ORDER BY RAND() LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function getQuotesByAuthor($author) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE author LIKE ?";
        $stmt = $this->conn->prepare($query);
        $author = "%{$author}%";
        $stmt->bindParam(1, $author);
        $stmt->execute();
        return $stmt;
    }
}
?>
