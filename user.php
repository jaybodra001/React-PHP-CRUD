<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$db_con = mysqli_connect("localhost", "root", "", "ReactPHP");

if ($db_con == false) {
    die("Error: Could not connect" . mysqli_connect_error());
}

$method = $_SERVER['REQUEST_METHOD'];
$path = explode('/', $_SERVER['REQUEST_URI']);

switch ($method) {
    case "GET":
        if (isset($path[4]) && is_numeric($path[4])) {
            $userid = $path[4];
            $getuserrow = mysqli_query($db_con, "SELECT * FROM tbl_user WHERE userid = '$userid'");
            if ($userrow = mysqli_fetch_array($getuserrow)) {
                $json_array = array(
                    'id' => $userrow['userid'],
                    'uname' => $userrow['uname'],
                    'uemail' => $userrow['uemail'],
                    'status' => $userrow['status']
                );
                echo json_encode($json_array);
            } else {
                echo json_encode(["error" => "User not found"]);
            }
        } else {
            $allUser = mysqli_query($db_con, "SELECT * FROM tbl_user");
            $json_array = [];
            while ($row = mysqli_fetch_array($allUser)) {
                $json_array[] = array(
                    "id" => $row['userid'],
                    "uname" => $row['uname'],
                    "uemail" => $row['uemail'],
                    "status" => $row['status'],
                );
            }
            echo json_encode($json_array);
        }
        break;

        case "POST":
            $userpostdata = json_decode(file_get_contents("php://input"), true);
    
            if (isset($userpostdata['username']) && isset($userpostdata['email']) && isset($userpostdata['status'])) {
                $stmt = $db_con->prepare("INSERT INTO tbl_user (uname, uemail, status) VALUES (?, ?, ?)");
                $stmt->bind_param("ssi", $username, $email, $status);
    
                $username = $userpostdata['username'];
                $email = $userpostdata['email'];
                $status = $userpostdata['status'];
    
                if ($stmt->execute()) {
                    echo json_encode(["result" => "User added successfully"]);
                } else {
                    echo json_encode(["result" => "Error adding user: " . $stmt->error]);
                }
    
                $stmt->close();
            } else {
                echo json_encode(["result" => "Invalid input"]);
            }
            break;

        case "PUT":
            $userpostdata = json_decode(file_get_contents("php://input"), true);
            if (isset($userpostdata['id']) && isset($userpostdata['username']) && isset($userpostdata['email']) && isset($userpostdata['status'])) {
                $userid = mysqli_real_escape_string($db_con, $userpostdata['id']);
                $username = mysqli_real_escape_string($db_con, $userpostdata['username']);
                $email = mysqli_real_escape_string($db_con, $userpostdata['email']);
                $status = mysqli_real_escape_string($db_con, $userpostdata['status']);

                $query = "UPDATE tbl_user SET uname='$username', uemail='$email', status='$status' WHERE userid='$userid'";
                if (mysqli_query($db_con, $query)) {
                    echo json_encode(["result" => "User updated successfully"]);
                } else {
                    echo json_encode(["error" => "User update failed"]);
                }
            } else {
                echo json_encode(["error" => "Invalid input"]);
            }
            break;

        case "DELETE":
            $path = explode('/', $_SERVER['REQUEST_URI']);
            //echo "MSG :-------$path[4]"; die;
            
            $result = mysqli_query($db_con,"DELETE FROM tbl_user WHERE userid = '$path[4]' ");
            if($result)
            {
                echo json_encode(["success" => "User Record Deleted Successfully"]);
                return;
            }else{
                echo json_encode(["Please Check the User Data!"]);
                return;
            }

            break;
    
        default:
            echo json_encode(["result" => "Invalid request method"]);
            break;
    }
    
    $db_con->close();
?>
    