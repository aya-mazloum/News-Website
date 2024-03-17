<?php
    include('connection.php');

    $request_method = $_SERVER["REQUEST_METHOD"];

    switch ($request_method) {
        case 'GET':
            $response = getAllNews();
            echo json_encode($response);
            break;
        case 'POST':
            if(!empty($_POST["title"]) && !empty($_POST["content"]) && !empty($_POST["author"]) && !empty($_POST["publish_date"])){
                $title= $_POST["title"];
                $content= $_POST["content"];
                $author= $_POST["author"];
                $publish_date= $_POST["publish_date"];
                $response = createNews($title, $content, $author, $publish_date);
                echo json_encode($response);
            }else{
                echo json_encode([
                    "status"=>"All info are requried",
                ]);
            }
            break;
        default:
            echo json_encode([
                "status"=>"Something went wrong",
            ]);
            break;
    }

    function getAllNews() {
        global $mysqli;
        $query = $mysqli->prepare('SELECT * FROM news');
        $query->execute();
        $query->store_result();
        $num_rows = $query->num_rows();
        
        if($num_rows == 0) {
            $response["status"] = "No news";
        } else{
            $news = [];
            $query->bind_result($id, $title, $content, $author, $publish_date);
            while($query->fetch()){
                $newsItem = [
                    'id' => $id,
                    'title' => $title,
                    'content' => $content,
                    'author' => $author,
                    'publish_date' => $publish_date
                ];
                $news[] = $newsItem;
            }
            $response["status"] = "Success";
            $response["news"] = $news;
        }
        return $response;
    }

    function createNews($title, $content, $author, $publish_date) {
        global $mysqli;
        $response;
        $query = $mysqli->prepare("INSERT INTO news (title, content, author, publish_date) VALUES (?, ?, ?, ?)");
        $query->bind_param("ssss", $title, $content, $author, $publish_date);
        if($query->execute()){
            $response["status"] = "Success";
        }else{
            $response["status"] = "Failed";
        }
        return $response;
    }